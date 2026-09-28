import { kv } from "@vercel/kv";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

// KV layout:
//   review_token:{token} -> ReviewToken (one per purchased product, single use)
//   reviews               -> hash { [reviewId]: Review }
//   review_rl:{ip}        -> counter limiting open (non-buyer) submissions

export interface ReviewToken {
    productId: string;
    productTitle: string;
    email: string;
    name: string;
    sessionId: string;
    used: boolean;
}

export interface Review {
    id: string;
    productId: string; // "" for a general review left on the homepage
    productTitle: string;
    name: string;
    email: string; // may be "" for open reviews
    verified?: boolean; // false for open reviews; older buyer reviews have no flag
    rating: number;
    text: string;
    status: "pending" | "approved";
    createdAt: string;
}

export type PublicReview = Omit<Review, "email" | "status" | "verified"> & { verified: boolean };

const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 365; // links stay valid for a year

export const SITE_URL = "https://monalisabiohacking.com";

export async function createReviewToken(data: Omit<ReviewToken, "used">): Promise<string> {
    const token = crypto.randomUUID().replace(/-/g, "");
    await kv.set(`review_token:${token}`, { ...data, used: false }, { ex: TOKEN_TTL_SECONDS });
    return token;
}

export async function getReviewToken(token: string): Promise<ReviewToken | null> {
    if (!/^[a-f0-9]{32}$/.test(token)) return null;
    return kv.get<ReviewToken>(`review_token:${token}`);
}

export async function markTokenUsed(token: string, data: ReviewToken) {
    await kv.set(`review_token:${token}`, { ...data, used: true }, { ex: TOKEN_TTL_SECONDS });
}

export async function getAllReviews(): Promise<Review[]> {
    const all = (await kv.hgetall<Record<string, Review>>("reviews")) || {};
    return Object.values(all).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getApprovedReviews(): Promise<PublicReview[]> {
    return (await getAllReviews()).filter(r => r.status === "approved").map(toPublic);
}

export async function getReview(id: string): Promise<Review | null> {
    return kv.hget<Review>("reviews", id);
}

export async function saveReview(review: Review) {
    await kv.hset("reviews", { [review.id]: review });
}

export async function deleteReview(id: string) {
    await kv.hdel("reviews", id);
}

export function toPublic(review: Review): PublicReview {
    const { id, productId, productTitle, name, rating, text, createdAt } = review;
    return { id, productId, productTitle, name, rating, text, createdAt, verified: review.verified !== false };
}

export function escapeHtml(s: string) {
    return s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");

export async function checkAdminAuth() {
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
