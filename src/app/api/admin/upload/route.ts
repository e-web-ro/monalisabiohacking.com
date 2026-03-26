import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Use @vercel/blob to store the file
        const blob = await put(file.name, file, {
            access: 'public',
        });

        console.log(`File uploaded successfully to Vercel Blob: ${blob.url}`);

        return NextResponse.json({ success: true, url: blob.url });
    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
    }
}

