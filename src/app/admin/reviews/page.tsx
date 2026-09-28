"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, EyeOff, Star, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
    id: string;
    productId: string;
    productTitle: string;
    name: string;
    email: string;
    verified?: boolean;
    rating: number;
    text: string;
    status: "pending" | "approved";
    createdAt: string;
}

export default function ReviewsAdminPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [filter, setFilter] = useState<"pending" | "approved" | "all">("pending");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/reviews", { cache: "no-store" }).then(async res => {
            if (res.status === 401) {
                window.location.href = "/admin/login";
                return;
            }
            setReviews(await res.json());
            setLoading(false);
        });
    }, []);

    const setStatus = async (id: string, status: Review["status"]) => {
        const res = await fetch("/api/admin/reviews", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status }),
        });
        if (res.ok) setReviews(prev => prev.map(r => (r.id === id ? { ...r, status } : r)));
        else alert("Eroare la actualizare.");
    };

    const remove = async (id: string) => {
        if (!confirm("Ștergi definitiv această recenzie?")) return;
        const res = await fetch(`/api/admin/reviews?id=${encodeURIComponent(id)}`, { method: "DELETE" });
        if (res.ok) setReviews(prev => prev.filter(r => r.id !== id));
        else alert("Eroare la ștergere.");
    };

    const visible = filter === "all" ? reviews : reviews.filter(r => r.status === filter);
    const pendingCount = reviews.filter(r => r.status === "pending").length;

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm">
                <ArrowLeft className="w-4 h-4" /> Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-white">Recenzii</h1>

            <div className="flex gap-2">
                {([
                    ["pending", `În așteptare (${pendingCount})`],
                    ["approved", "Publicate"],
                    ["all", "Toate"],
                ] as const).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setFilter(key)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-all",
                            filter === key ? "bg-primary text-black" : "bg-white/5 text-zinc-400 hover:text-white"
                        )}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {loading ? (
                <p className="text-zinc-500">Se încarcă...</p>
            ) : visible.length === 0 ? (
                <p className="text-zinc-500">Nicio recenzie aici.</p>
            ) : (
                <div className="space-y-4">
                    {visible.map(r => (
                        <div key={r.id} className="bg-secondary/20 p-6 rounded-2xl border border-white/5 space-y-3">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <p className="text-primary text-xs uppercase tracking-widest font-bold">
                                        {r.productTitle || "Recenzie generală (prima pagină)"}
                                    </p>
                                    <p className="text-white font-bold mt-1">
                                        {r.name} {r.email && <span className="text-zinc-500 font-normal text-sm">· {r.email}</span>}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map(n => (
                                                <Star key={n} className={cn("w-4 h-4", n <= r.rating ? "text-yellow-400 fill-yellow-400" : "text-zinc-700")} />
                                            ))}
                                        </div>
                                        <span className="text-xs text-zinc-500">{new Date(r.createdAt).toLocaleDateString("ro-RO")}</span>
                                        {r.verified === false ? (
                                            <span className="text-[10px] uppercase tracking-widest bg-white/5 text-zinc-400 px-2 py-0.5 rounded-full">Vizitator</span>
                                        ) : (
                                            <span className="text-[10px] uppercase tracking-widest bg-primary/10 text-primary px-2 py-0.5 rounded-full">Cumpărător verificat</span>
                                        )}
                                        {r.status === "pending" && (
                                            <span className="text-[10px] uppercase tracking-widest bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full">În așteptare</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {r.status === "pending" ? (
                                        <button
                                            onClick={() => setStatus(r.id, "approved")}
                                            className="px-4 py-2 bg-primary text-black text-sm font-bold rounded-lg hover:bg-emerald-400 flex items-center gap-1"
                                        >
                                            <Check className="w-4 h-4" /> Aprobă
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setStatus(r.id, "pending")}
                                            className="px-4 py-2 bg-white/5 text-zinc-300 text-sm rounded-lg hover:bg-white/10 flex items-center gap-1"
                                        >
                                            <EyeOff className="w-4 h-4" /> Ascunde
                                        </button>
                                    )}
                                    <button
                                        onClick={() => remove(r.id)}
                                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-zinc-300 whitespace-pre-line">{r.text}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
