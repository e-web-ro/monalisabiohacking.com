import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");

export async function POST(request: Request) {
    const { username, password } = await request.json();

    if (
        username === process.env.NEXT_PUBLIC_ADMIN_USER &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const token = await new SignJWT({ username })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("2h")
            .sign(SECRET);

        const cookieStore = await cookies();
        cookieStore.set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_NODE === "production",
            sameSite: "strict",
            maxAge: 7200,
            path: "/",
        });

        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 401 });
}
