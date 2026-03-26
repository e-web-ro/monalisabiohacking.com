import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
    try {
        const { items, success_url, cancel_url, customer_email } = await req.json();

        console.log('[Checkout API] Received items:', JSON.stringify(items));

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'No items provided' }, { status: 400 });
        }

        const line_items = items.map((item: any) => {
            // Clean price string: remove everything except digits and dots
            // Handle cases like "60 €" -> "60", "1.200 €" -> "1200" if formatted that way? 
            // Standardizing on removing non-numeric/non-dot chars.
            // CAUTION: If "1.200" means 1200, this regex keeps dot. parseFloat("1.200") = 1.2
            // If "1,200" means 1200, regex removes comma -> "1200".
            // Let's assume standard simple format for now.
            // Better approach: remove incompatible chars, but check for parsing NaN.

            const priceString = String(item.price || "0").replace(/[^0-9.]/g, '');
            let unitAmount = Math.round(parseFloat(priceString) * 100);

            if (isNaN(unitAmount)) {
                console.warn(`[Checkout API] Invalid price for item ${item.title}: ${item.price}`);
                unitAmount = 0;
            }

            console.log(`[Checkout API] Item: ${item.title}, Price String: ${item.price}, Parsed Amount (cents): ${unitAmount}`);

            return {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.title,
                        description: item.description ? item.description.substring(0, 500) : undefined, // Truncate description if too long
                        metadata: {
                            file_url: item.file_url || '',
                        },
                    },
                    unit_amount: unitAmount,
                },
                quantity: item.quantity || 1,
            };
        });

        const origin = req.headers.get('origin') || 'https://monalisabiohacking.com';
        const callbackUrl = `${origin}/api/payment-callback?session_id={CHECKOUT_SESSION_ID}&return_url=${encodeURIComponent(success_url || `${origin}/success`)}`;

        console.log('[Checkout API] Creating Stripe Session...');

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: callbackUrl,
            cancel_url: cancel_url || `${origin}/cancel`,
            customer_email: customer_email,
        });

        console.log('[Checkout API] Session created:', session.id);

        // Send notification email (Non-blocking)
        (async () => {
            try {
                const { resend } = await import('@/lib/resend');
                await resend.emails.send({
                    from: 'Monalisa Biohacking <contact@monalisabiohacking.com>', // UPDATED SENDER
                    to: ['contact@monalisabiohacking.com'],
                    subject: `Checkout Initiated: ${customer_email || 'Guest'}`,
                    html: `
                        <div style="font-family: sans-serif; padding: 20px;">
                            <h2>New Checkout Session Started</h2>
                            <p><strong>Customer:</strong> ${customer_email || 'Guest'}</p>
                            <p><strong>Session ID:</strong> ${session.id}</p>
                            <p><strong>Items:</strong></p>
                            <ul>
                                ${items.map((item: any) => `<li>${item.title} (${item.price})</li>`).join('')}
                            </ul>
                        </div>
                    `
                });
            } catch (emailError) {
                console.error('[Checkout API] Failed to send notification email:', emailError);
            }
        })();

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('[Checkout API] Stripe Checkout Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
