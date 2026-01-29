import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
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

    const roPath = path.join(process.cwd(), "src/i18n/dictionaries/ro.json");
    const enPath = path.join(process.cwd(), "src/i18n/dictionaries/en.json");
    const dePath = path.join(process.cwd(), "src/i18n/dictionaries/de.json");

    const [ro, en, de] = await Promise.all([
        fs.readFile(roPath, "utf-8").then(JSON.parse),
        fs.readFile(enPath, "utf-8").then(JSON.parse),
        fs.readFile(dePath, "utf-8").then(JSON.parse)
    ]);

    return NextResponse.json({
        dictionaries: { ro, en, de }
    });
}

export async function POST(request: Request) {
    if (!await checkAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { type, content, lang } = await request.json();
    const filePath = path.join(process.cwd(), `src/i18n/dictionaries/${lang}.json`);

    try {
        const dict = JSON.parse(await fs.readFile(filePath, "utf-8"));

        if (type === "shop") {
            dict.shop.products = content;
        } else if (type === "services") {
            dict.services.items = content;
        }

        await fs.writeFile(filePath, JSON.stringify(dict, null, 4), "utf-8");
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }
}
