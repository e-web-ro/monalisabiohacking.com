import { NextResponse } from "next/server";
import { checkAdminAuth, deleteReview, getAllReviews, getReview, saveReview } from "@/lib/reviews";

export const dynamic = "force-dynamic";

export async function GET() {
    if (!await checkAdminAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        return NextResponse.json(await getAllReviews());
    } catch (err) {
        console.error("GET admin reviews error:", err);
        return NextResponse.json({ error: "Failed to load reviews: " + (err as Error).message }, { status: 500 });
    }
}

// PATCH { id, status } -> approve / unpublish a review
export async function PATCH(request: Request) {
    if (!await checkAdminAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { id, status } = await request.json();
        if (status !== "approved" && status !== "pending") {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }
        const review = await getReview(id);
        if (!review) return NextResponse.json({ error: "Not found" }, { status: 404 });

        await saveReview({ ...review, status });
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("PATCH admin reviews error:", err);
        return NextResponse.json({ error: "Failed to update review: " + (err as Error).message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    if (!await checkAdminAuth()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    try {
        await deleteReview(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("DELETE admin reviews error:", err);
        return NextResponse.json({ error: "Failed to delete review: " + (err as Error).message }, { status: 500 });
    }
}
