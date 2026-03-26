import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    const logPath = path.join(process.cwd(), 'public', 'booking_log.txt');
    const log = (msg: string) => {
        const timestamp = new Date().toISOString();
        const line = `[${timestamp}] ${msg}\n`;
        console.log(line);
        try {
            fs.appendFileSync(logPath, line);
        } catch (e) {
            // ignore fs errors
        }
    };

    try {
        log('--- NEW BOOKING REQUEST STARTED ---');
        const body = await req.json();
        const { name, email, phone, service, date, time, notes } = body;

        log(`Payload: Name=${name}, Email=${email}, Service=${service}`);

        // 1. Send Admin Notification
        log('Attempting to send Admin Email...');
        const adminResponse = await resend.emails.send({
            from: 'Monalisa Biohacking <contact@monalisabiohacking.com>',
            to: ['contact@monalisabiohacking.com'],
            subject: `NEW FREE BOOKING: ${name}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h1>New Booking</h1>
                    <p><strong>Customer:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Service:</strong> ${service}</p>
                    <p><strong>Date:</strong> ${date} at ${time}</p>
                </div>
            `
        });

        if (adminResponse.error) {
            log(`Admin Email ERROR: ${adminResponse.error.message}`);
            return NextResponse.json({ error: adminResponse.error.message }, { status: 500 });
        } else {
            log(`Admin Email SUCCESS. ID: ${adminResponse.data?.id}`);
        }

        // 2. Send Customer Confirmation
        let customerEmailId = 'skipped';
        if (email) {
            log(`Attempting to send Customer Email to ${email}...`);
            const customerResponse = await resend.emails.send({
                from: 'Monalisa Biohacking <contact@monalisabiohacking.com>',
                to: [email],
                subject: `Booking Confirmed - Monalisa Biohacking`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px;">
                        <h1>Booking Confirmed</h1>
                        <p>Hello ${name},</p>
                        <p>Your appointment for <strong>${service}</strong> is confirmed.</p>
                        <p>Date: ${date} at ${time}</p>
                    </div>
                `
            });

            if (customerResponse.error) {
                log(`Customer Email ERROR: ${customerResponse.error.message}`);
            } else {
                log(`Customer Email SUCCESS. ID: ${customerResponse.data?.id}`);
                customerEmailId = customerResponse.data?.id || 'unknown';
            }
        } else {
            log('No customer email provided, skipping.');
        }

        log('--- REQUEST COMPLETED SUCCESSFULLY ---');

        return NextResponse.json({
            success: true,
            adminEmailId: adminResponse.data?.id,
            customerEmailId: customerEmailId
        });

    } catch (error: any) {
        log(`CRITICAL ERROR: ${error.message}`);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
