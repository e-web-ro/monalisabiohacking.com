import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
    try {
        const { items, success_url, cancel_url, customer_email } = await req.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'No items provided' }, { status: 400 });
        }

        const line_items = items.map((item: any) => ({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.title,
                    description: item.description,
                    // images: item.image ? [item.image] : [], // Add images if you have them
                },
                unit_amount: Math.round(parseFloat(item.price.replace(/[^0-9.]/g, '')) * 100), // Convert to cents
            },
            quantity: item.quantity || 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: success_url || `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: cancel_url || `${req.headers.get('origin')}/cancel`,
            customer_email: customer_email,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
