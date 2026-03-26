import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get('session_id');
    const return_url = searchParams.get('return_url');

    // If missing params, redirect home
    if (!session_id || !return_url) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status === 'paid') {
            // Email sending is now handled by the Stripe Webhook (src/app/api/webhook/route.ts)
            // ensuring reliability even if the user closes the browser before this callback completes.
            console.log(`Payment successful for session ${session_id}. Redirecting to success page.`);
        }
    } catch (e) {
        console.error("Payment callback verification failed:", e);
        // We continue to redirect even if verification fails, 
        // as we don't want to block the user from seeing the success page.
    }

    return NextResponse.redirect(return_url);
}
