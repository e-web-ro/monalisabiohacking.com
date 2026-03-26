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

    const blogPath = path.join(process.cwd(), "src/lib/blog-posts.json");
    try {
        const content = await fs.readFile(blogPath, "utf-8");
        return NextResponse.json({ blogPosts: JSON.parse(content) });
    } catch (err) {
        return NextResponse.json({ error: "Failed to read blog data" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!await checkAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { blogPosts } = await request.json();
    const blogPath = path.join(process.cwd(), "src/lib/blog-posts.json");

    try {
        await fs.writeFile(blogPath, JSON.stringify(blogPosts, null, 2), "utf-8");
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }
}
