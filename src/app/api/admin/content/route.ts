import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { kv } from "@vercel/kv";
import fs from "fs/promises";
import path from "path";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");

async function checkAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) return false;
    try {
        await jwtVerify(token, SECRET);
        return true;
    } catch {
        return false;
    }
}

export async function GET() {
    if (!await checkAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const langs = ["ro", "en", "de"];
    const results: any = {};

    for (const lang of langs) {
        try {
            // Check KV first
            let dict = await kv.get(`dict_${lang}`);
            if (!dict) {
                // Fallback to local files if KV is empty
                const filePath = path.join(process.cwd(), `src/i18n/dictionaries/${lang}.json`);
                dict = JSON.parse(await fs.readFile(filePath, "utf-8"));
            }
            results[lang] = dict;
        } catch (e) {
             console.error(`Error loading ${lang}:`, e);
        }
    }

    return NextResponse.json({
        dictionaries: results
    });
}

export async function POST(request: Request) {
    if (!await checkAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { type, content, lang } = await request.json();

        // 1. Load existing dictionary (either from KV or File)
        let dict: any = await kv.get(`dict_${lang}`);
        if (!dict) {
            const filePath = path.join(process.cwd(), `src/i18n/dictionaries/${lang}.json`);
            dict = JSON.parse(await fs.readFile(filePath, "utf-8"));
        }

        // 2. Modify content
        if (type === "shop") {
            dict.shop.products = content;
        } else if (type === "services") {
            dict.services.items = content;
        }

        // 3. Save to KV (this works on Vercel at runtime!)
        await kv.set(`dict_${lang}`, dict);

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("Save error:", err);
        return NextResponse.json({ error: "Failed to save to KV: " + err.message }, { status: 500 });
    }
}
