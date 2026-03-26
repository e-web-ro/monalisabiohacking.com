import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

export async function GET() {
    try {
        const data = await resend.emails.send({
            from: 'Monalisa Biohacking <contact@monalisabiohacking.com>',
            to: ['contact@monalisabiohacking.com'],
            subject: 'Test Email Integration',
            html: '<p>If you receive this, Resend is working correctly!</p>'
        });

        return NextResponse.json({
            status: 'Attempted',
            data: data,
            env_key_start: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 5) : 'MISSING'
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 'Failed',
            error: error.message,
            full_error: error
        }, { status: 500 });
    }
}
