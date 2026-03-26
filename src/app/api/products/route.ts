import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const DICT_PATH = path.join(process.cwd(), 'src/i18n/dictionaries/ro.json');

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const fileContent = await readFile(DICT_PATH, 'utf-8');
        const json = JSON.parse(fileContent);
        return NextResponse.json(json.shop.products);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { id, title, price, description, category, file_url } = body;

        const fileContent = await readFile(DICT_PATH, 'utf-8');
        const json = JSON.parse(fileContent);

        const newId = id || `prod_${Date.now()}`;

        json.shop.products[newId] = {
            title,
            price,
            description,
            category,
            file_url
        };

        await writeFile(DICT_PATH, JSON.stringify(json, null, 4));

        return NextResponse.json({ success: true, id: newId });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save product' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const fileContent = await readFile(DICT_PATH, 'utf-8');
        const json = JSON.parse(fileContent);

        if (json.shop.products[id]) {
            delete json.shop.products[id];
            await writeFile(DICT_PATH, JSON.stringify(json, null, 4));
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
