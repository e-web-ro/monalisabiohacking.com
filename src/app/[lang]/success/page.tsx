import { stripe } from '@/lib/stripe';
import { resend } from '@/lib/resend';
import Link from 'next/link';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export default async function SuccessPage({
    searchParams
}: {
    searchParams: Promise<{ session_id: string }>
}) {
    const { session_id } = await searchParams;

    if (!session_id) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold">Invalid Request</h1>
                    <Link href="/" className="text-primary hover:underline mt-4 block">Return Home</Link>
                </div>
            </div>
        );
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status === 'paid') {
            // Send email notification to admin
            try {
                await resend.emails.send({
                    from: 'Monalisa Biohacking <onboarding@resend.dev>',
                    to: ['contact@monalisabiohacking.com'],
                    subject: `PAYMENT RECEIVED: ${session.amount_total ? session.amount_total / 100 : '?'} ${(session.currency || 'eur').toUpperCase()}`,
                    html: `
                        <div style="font-family: sans-serif;">
                            <h1 style="color: #10b981;">Payment Confirmed</h1>
                            <p><strong>Amount:</strong> ${session.amount_total ? session.amount_total / 100 : 0} ${(session.currency || 'eur').toUpperCase()}</p>
                            <p><strong>Customer:</strong> ${session.customer_details?.email || session.customer_email || 'Unknown'}</p>
                            <p><strong>Name:</strong> ${session.customer_details?.name || 'Unknown'}</p>
                            <p><strong>Session ID:</strong> ${session.id}</p>
                            <br/>
                            <a href="https://dashboard.stripe.com/payments/${session.payment_intent}" style="padding: 10px 20px; background-color: #635bff; color: white; text-decoration: none; border-radius: 5px;">View in Stripe</a>
                        </div>
                    `
                });
            } catch (emailError) {
                console.error("Failed to send success email:", emailError);
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-4">
                    <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center shadow-2xl">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
                        <p className="text-zinc-400 mb-8">
                            Thank you for your purchase. A confirmation email has been sent to {session.customer_details?.email}.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center w-full py-4 bg-primary text-black font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-lg hover:shadow-primary/20"
                        >
                            Return to Homepage
                        </Link>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="min-h-screen flex items-center justify-center bg-black text-white">
                    <div className="text-center">
                        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold mb-2">Payment Not Completed</h1>
                        <p className="text-zinc-400 mb-6">Status: {session.payment_status}</p>
                        <Link href="/" className="text-primary hover:underline block">Return Home</Link>
                    </div>
                </div>
            );
        }
    } catch (e: any) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-xl font-bold mb-2">Error verifying payment</h1>
                    <p className="text-zinc-500 mb-4 text-sm max-w-md mx-auto">{e.message}</p>
                    <Link href="/" className="text-primary hover:underline block">Return Home</Link>
                </div>
            </div>
        );
    }
}
