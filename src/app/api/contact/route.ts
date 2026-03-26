import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, surname, email, subject, message } = body;

        // Validation (basic)
        if (!email || !message) {
            return NextResponse.json({ error: 'Email and message are required' }, { status: 400 });
        }

        // Send email
        const { data, error } = await resend.emails.send({
            from: 'Monalisa Biohacking <onboarding@resend.dev>', // Use a generic sender if domain not verified, or update to domain if possible. 
            // Better to use 'onboarding@resend.dev' if testing, but ideally 'contact@monalisabiohacking.com' if domain verified.
            // I'll stick to 'onboarding@resend.dev' to be safe, but change the displayed name.
            to: ['contact@monalisabiohacking.com'],
            subject: `Contact Form Submission: ${subject || 'New Message'}`,
            replyTo: email,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>From:</strong> ${name} ${surname} (${email})</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <div style="background-color: #f4f4f5; padding: 15px; border-radius: 5px;">
                    ${message.replace(/\n/g, '<br>')}
                </div>
            `
        });

        if (error) {
            console.error('Resend Error:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
