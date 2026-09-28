import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import {
    getApprovedReviews,
    getReviewToken,
    markTokenUsed,
    saveReview,
    escapeHtml,
    PublicReview,
    Review,
} from '@/lib/reviews';

export const dynamic = 'force-dynamic';

const OPEN_LIMIT = 3; // open reviews per IP per hour
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET /api/reviews               -> approved product reviews grouped by product
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

        const byProduct: Record<string, PublicReview[]> = {};
        for (const r of await getApprovedReviews()) {
            if (r.productId) (byProduct[r.productId] ||= []).push(r);
        }
        return NextResponse.json(byProduct);
    } catch (error) {
        console.error('GET reviews error:', error);
        return NextResponse.json({ error: 'Failed to load reviews' }, { status: 500 });
    }
}

// POST { token, rating, text, name }          -> verified buyer review (from the delivery email)
// POST { rating, text, name, email?, website } -> open review from the homepage; `website` is a honeypot
export async function POST(req: Request) {
    try {
        const { token, rating, text, name, email, website } = await req.json();

        const stars = Number(rating);
        const body = String(text || '').trim();
        if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
            return NextResponse.json({ error: 'rating' }, { status: 400 });
        }
        if (body.length < 10 || body.length > 2000) {
            return NextResponse.json({ error: 'text' }, { status: 400 });
        }

        let review: Review;
        const id = `rev_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        const createdAt = new Date().toISOString();

        if (token) {
            const data = typeof token === 'string' ? await getReviewToken(token) : null;
            if (!data) return NextResponse.json({ error: 'invalid' }, { status: 404 });
            if (data.used) return NextResponse.json({ error: 'used' }, { status: 409 });

            const displayName = String(name || '').trim() || data.name;
            if (displayName.length > 80) return NextResponse.json({ error: 'text' }, { status: 400 });

            // Mark the token first so a double submit can't create two reviews
            await markTokenUsed(token, data);

            review = {
                id,
                productId: data.productId,
                productTitle: data.productTitle,
                name: displayName,
                email: data.email,
                verified: true,
                rating: stars,
                text: body,
                status: 'pending',
                createdAt,
            };
        } else {
            // Bots fill every field; pretend success so they don't retry
            if (website) return NextResponse.json({ success: true });

            const displayName = String(name || '').trim();
            const contact = String(email || '').trim();
            if (displayName.length < 2 || displayName.length > 80) {
                return NextResponse.json({ error: 'name' }, { status: 400 });
            }
            if (contact && (contact.length > 200 || !EMAIL_RE.test(contact))) {
                return NextResponse.json({ error: 'email' }, { status: 400 });
            }

            const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
            const rlKey = `review_rl:${ip}`;
            const count = await kv.incr(rlKey);
            if (count === 1) await kv.expire(rlKey, 60 * 60);
            if (count > OPEN_LIMIT) return NextResponse.json({ error: 'rate' }, { status: 429 });

            review = {
                id,
                productId: '',
                productTitle: '',
                name: displayName,
                email: contact,
                verified: false,
                rating: stars,
                text: body,
                status: 'pending',
                createdAt,
            };
        }

        await saveReview(review);

        // Notify admin (non-blocking)
        (async () => {
            try {
                const { resend } = await import('@/lib/resend');
                const subject = review.productTitle || 'recenzie generală (site)';
                await resend.emails.send({
                    from: 'Monalisa Biohacking <contact@monalisabiohacking.com>',
                    to: ['contact@monalisabiohacking.com'],
                    subject: `Recenzie nouă (${stars}★): ${subject}`,
                    html: `
                        <div style="font-family: sans-serif; padding: 20px;">
                            <h2>Recenzie nouă în așteptare</h2>
                            <p><strong>${review.productTitle ? 'Produs' : 'Tip'}:</strong> ${escapeHtml(subject)}</p>
                            <p><strong>${review.verified ? 'Client verificat' : 'Vizitator'}:</strong> ${escapeHtml(review.name)}${review.email ? ` (${escapeHtml(review.email)})` : ''}</p>
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
