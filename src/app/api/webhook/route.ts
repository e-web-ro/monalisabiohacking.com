import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { resend } from '@/lib/resend';
import Stripe from 'stripe';

export async function POST(req: Request) {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        console.error(`Webhook signature verification failed: ${error.message}`);
        return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const sessionEvent = event.data.object as Stripe.Checkout.Session;

        if (sessionEvent.payment_status === 'paid') {
            try {
                // Retrieve full session with line items expanded to get product metadata
                const session = await stripe.checkout.sessions.retrieve(sessionEvent.id, {
                    expand: ['line_items', 'line_items.data.price.product'],
                });

                const customerEmail = session.customer_details?.email || session.customer_email;
                const customerName = session.customer_details?.name || 'Customer';

                const lineItems = session.line_items?.data || [];
                const isBooking = lineItems.some(item => !item.price?.product || !(item.price.product as Stripe.Product).metadata?.file_url);

                if (isBooking) {
                    // === BOOKING FLOW ===
                    const bookingDetails = lineItems.map(item => `${item.description} (${item.quantity}x)`).join(', ');

                    // 1. Send Admin Booking Notification
                    await resend.emails.send({
                        from: 'Monalisa Biohacking <onboarding@resend.dev>',
                        to: ['contact@monalisabiohacking.com'],
                        subject: `NEW BOOKING: ${customerName}`,
                        html: `
                            <div style="font-family: sans-serif; padding: 20px;">
                                <h1 style="color: #635bff;">New Appointment Scheduled</h1>
                                <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                                    <p><strong>Customer:</strong> ${customerName}</p>
                                    <p><strong>Email:</strong> ${customerEmail}</p>
                                    <p><strong>Service:</strong> ${bookingDetails}</p>
                                    <p><strong>Amount Paid:</strong> ${session.amount_total ? session.amount_total / 100 : 0} ${(session.currency || 'eur').toUpperCase()}</p>
                                </div>
                                <p>Please contact the client if you need to reschedule.</p>
                            </div>
                        `
                    });

                    // 2. Send Customer Booking Confirmation
                    if (customerEmail) {
                        await resend.emails.send({
                            from: 'Monalisa Biohacking <onboarding@resend.dev>',
                            to: [customerEmail],
                            subject: `Booking Confirmed - Monalisa Biohacking`,
                            html: `
                                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                                    <div style="text-align: center; padding: 30px 0;">
                                        <h1 style="color: #10b981; margin: 0;">Appointment Confirmed</h1>
                                        <p style="color: #666; font-size: 16px;">We look forward to seeing you!</p>
                                    </div>
                                    
                                    <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #eaeaea;">
                                        <p><strong>Hello ${customerName},</strong></p>
                                        <p>Your payment was successful and your appointment has been secured.</p>
                                        <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #10b981; margin: 20px 0;">
                                            <p style="margin: 0;"><strong>Service:</strong> ${bookingDetails}</p>
                                        </div>
                                        <p>If you need to change your appointment, please reply to this email.</p>
                                    </div>

                                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eaeaea; text-align: center; color: #999; font-size: 12px;">
                                        <p>&copy; ${new Date().getFullYear()} Monalisa Biohacking</p>
                                    </div>
                                </div>
                            `
                        });
                    }

                } else {
                    // === DIGITAL PRODUCT FLOW ===

                    // 1. Send Admin Sale Notification
                    await resend.emails.send({
                        from: 'Monalisa Biohacking <onboarding@resend.dev>',
                        to: ['contact@monalisabiohacking.com'],
                        subject: `DIGITAL SALE: ${customerName}`,
                        html: `
                            <div style="font-family: sans-serif; padding: 20px;">
                                <h1 style="color: #10b981;">New Digital Product Sale</h1>
                                <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                                    <p><strong>Amount:</strong> ${session.amount_total ? session.amount_total / 100 : 0} ${(session.currency || 'eur').toUpperCase()}</p>
                                    <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
                                    <p><strong>Items:</strong></p>
                                    <ul>
                                        ${lineItems.map(item => `<li>${item.description || 'Product'}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        `
                    });

                    // 2. Send Customer Delivery Email
                    if (customerEmail) {
                        // Generate HTML for purchased items
                        const itemsHtml = lineItems.map((item) => {
                            const product = item.price?.product as Stripe.Product;
                            const productName = product?.name || item.description || 'Digital Product';
                            const fileUrl = product?.metadata?.file_url;

                            let actionButton = '';
                            if (fileUrl) {
                                actionButton = `
                                    <a href="${fileUrl}" style="display: inline-block; padding: 10px 20px; background-color: #10b981; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px; font-weight: bold;">
                                        DOWNLOAD NOW
                                    </a>
                                `;
                            } else {
                                actionButton = `<p style="color: #666; font-style: italic;">Delivery: Check your account or contact support.</p>`;
                            }

                            return `
                                <div style="border-bottom: 1px solid #eaeaea; padding: 20px 0;">
                                    <h3 style="margin: 0 0 10px 0; color: #333;">${productName}</h3>
                                    ${actionButton}
                                </div>
                            `;
                        }).join('');

                        await resend.emails.send({
                            from: 'Monalisa Biohacking <onboarding@resend.dev>',
                            to: [customerEmail],
                            subject: `Your Order Confirmation & Downloads - Monalisa Biohacking`,
                            html: `
                                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                                    <div style="text-align: center; padding: 30px 0;">
                                        <h1 style="color: #10b981; margin: 0;">Thank You for Your Order!</h1>
                                        <p style="color: #666; font-size: 16px;">Here are your digital products.</p>
                                    </div>
                                    
                                    <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #eaeaea;">
                                        ${itemsHtml}
                                    </div>

                                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eaeaea; text-align: center; color: #999; font-size: 12px;">
                                        <p>If you have any issues accessing your files, please reply to this email.</p>
                                        <p>&copy; ${new Date().getFullYear()} Monalisa Biohacking</p>
                                    </div>
                                </div>
                            `
                        });
                        console.log(`Delivery email sent to ${customerEmail}`);
                    }
                }

            } catch (error) {
                console.error('Error processing webhook logic:', error);
                // Don't fail the webhook response to Stripe, as we don't want retries if it's just an email error
            }
        }
    }

    return NextResponse.json({ received: true });
}
