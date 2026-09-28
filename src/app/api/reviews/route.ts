import { NextResponse } from 'next/server';
import {
    getAllReviews,
    getReviewToken,
    markTokenUsed,
    saveReview,
    toPublic,
    escapeHtml,
    Review,
} from '@/lib/reviews';

export const dynamic = 'force-dynamic';

// GET /api/reviews               -> approved reviews grouped by product
// GET /api/reviews?token=...     -> info needed to prefill the review form
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    try {
        if (token) {
            const data = await getReviewToken(token);
            if (!data) return NextResponse.json({ error: 'invalid' }, { status: 404 });
            if (data.used) return NextResponse.json({ error: 'used' }, { status: 409 });
            return NextResponse.json({ productTitle: data.productTitle, name: data.name });
        }

        const reviews = (await getAllReviews()).filter(r => r.status === 'approved');
        const byProduct: Record<string, ReturnType<typeof toPublic>[]> = {};
        for (const r of reviews) {
            (byProduct[r.productId] ||= []).push(toPublic(r));
        }
        return NextResponse.json(byProduct);
    } catch (error) {
        console.error('GET reviews error:', error);
        return NextResponse.json({ error: 'Failed to load reviews' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { token, rating, text, name } = await req.json();

        const data = typeof token === 'string' ? await getReviewToken(token) : null;
        if (!data) return NextResponse.json({ error: 'invalid' }, { status: 404 });
        if (data.used) return NextResponse.json({ error: 'used' }, { status: 409 });

        const stars = Number(rating);
        const body = String(text || '').trim();
        const displayName = String(name || '').trim() || data.name;
        if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
            return NextResponse.json({ error: 'rating' }, { status: 400 });
        }
        if (body.length < 10 || body.length > 2000 || displayName.length > 80) {
            return NextResponse.json({ error: 'text' }, { status: 400 });
        }

        // Mark the token first so a double submit can't create two reviews
        await markTokenUsed(token, data);

        const review: Review = {
            id: `rev_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
            productId: data.productId,
            productTitle: data.productTitle,
            name: displayName,
            email: data.email,
            rating: stars,
            text: body,
            status: 'pending',
            createdAt: new Date().toISOString(),
        };
        await saveReview(review);

        // Notify admin (non-blocking)
        (async () => {
            try {
                const { resend } = await import('@/lib/resend');
                await resend.emails.send({
                    from: 'Monalisa Biohacking <contact@monalisabiohacking.com>',
                    to: ['contact@monalisabiohacking.com'],
                    subject: `Recenzie nouă (${stars}★): ${data.productTitle}`,
                    html: `
                        <div style="font-family: sans-serif; padding: 20px;">
                            <h2>Recenzie nouă în așteptare</h2>
                            <p><strong>Produs:</strong> ${escapeHtml(data.productTitle)}</p>
                            <p><strong>Client:</strong> ${escapeHtml(displayName)} (${escapeHtml(data.email)})</p>
                            <p><strong>Notă:</strong> ${'★'.repeat(stars)}${'☆'.repeat(5 - stars)}</p>
                            <blockquote style="border-left: 4px solid #10b981; padding-left: 12px; color: #444;">${escapeHtml(body)}</blockquote>
                            <p>Aprob-o din panoul de admin: <a href="https://monalisabiohacking.com/admin/reviews">/admin/reviews</a></p>
                        </div>
                    `,
                });
            } catch (emailError) {
                console.error('[Reviews API] Failed to send notification email:', emailError);
            }
        })();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('POST reviews error:', error);
        return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
    }
}
