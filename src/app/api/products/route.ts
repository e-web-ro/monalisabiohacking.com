import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { readFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

async function getDictionary(lang: string) {
    let dict: any = await kv.get(`dict_${lang}`);
    if (!dict) {
        const filePath = path.join(process.cwd(), `src/i18n/dictionaries/${lang}.json`);
        dict = JSON.parse(await readFile(filePath, "utf-8"));
    }
    return dict;
}

export async function GET() {
    try {
        // Use 'ro' as default for this specific API route
        const dict = await getDictionary('ro');
        return NextResponse.json(dict.shop.products);
    } catch (error: any) {
        console.error("GET products error:", error);
        return NextResponse.json({ error: 'Failed to load products: ' + error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { id, title, price, description, category, file_url } = body;

        const lang = 'ro';
        const dict = await getDictionary(lang);

        const newId = id || `prod_${Date.now()}`;

        dict.shop.products[newId] = {
            title,
            price,
            description,
            category,
            file_url
        };

        // Save to KV for real-time live updates
        await kv.set(`dict_${lang}`, dict);

        return NextResponse.json({ success: true, id: newId });
    } catch (error: any) {
        console.error("POST products error:", error);
        return NextResponse.json({ error: 'Failed to save product: ' + error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const lang = 'ro';
        const dict = await getDictionary(lang);

        if (dict.shop.products[id]) {
            delete dict.shop.products[id];
            // Save to KV for real-time live updates
            await kv.set(`dict_${lang}`, dict);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("DELETE products error:", error);
        return NextResponse.json({ error: 'Failed to delete product: ' + error.message }, { status: 500 });
    }
}
