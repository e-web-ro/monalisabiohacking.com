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

    try {
        // Try KV first
        let blogData = await kv.get('blog_posts');
        if (!blogData) {
            const blogPath = path.join(process.cwd(), "src/lib/blog-posts.json");
            const content = await fs.readFile(blogPath, "utf-8");
            blogData = JSON.parse(content);
        }
        return NextResponse.json({ blogPosts: blogData });
    } catch (err: any) {
        console.error("GET blog error:", err);
        return NextResponse.json({ error: "Failed to read blog data: " + err.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!await checkAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { blogPosts } = await request.json();
        
        // Save to KV for real-time live updates
        await kv.set('blog_posts', blogPosts);
        
        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("POST blog error:", err);
        return NextResponse.json({ error: "Failed to save to KV: " + err.message }, { status: 500 });
    }
}
