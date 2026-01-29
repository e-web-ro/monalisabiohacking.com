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

    const blogPath = path.join(process.cwd(), "src/lib/blog-data.ts");
    const content = await fs.readFile(blogPath, "utf-8");

    // This is a bit hacky since it's a TS file, but for a simple project we can use regex or 
    // better yet, we should have the data in JSON if we want to edit it easily.
    // For now, let's assume we want to read the posts.

    return NextResponse.json({ rawContent: content });
}

export async function POST(request: Request) {
    if (!await checkAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { rawContent } = await request.json();
    const blogPath = path.join(process.cwd(), "src/lib/blog-data.ts");

    try {
        await fs.writeFile(blogPath, rawContent, "utf-8");
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }
}
