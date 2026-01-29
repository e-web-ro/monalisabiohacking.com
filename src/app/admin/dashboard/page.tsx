"use client";
import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    BookOpen,
    ShoppingBag,
    Stethoscope,
    Save,
    Plus,
    Trash2,
    LogOut,
    ChevronRight,
    Search,
    Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("shop");
    const [activeLang, setActiveLang] = useState("ro");
    const [data, setData] = useState<any>(null);
    const [blogContent, setBlogContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [contentRes, blogRes] = await Promise.all([
                fetch("/api/admin/content"),
                fetch("/api/admin/blog")
            ]);

            if (contentRes.ok && blogRes.ok) {
                const contentData = await contentRes.json();
                const blogData = await blogRes.json();
                setData(contentData.dictionaries);
                setBlogContent(blogData.rawContent);
            } else {
                window.location.href = "/admin/login";
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveShop = async () => {
        setSaving(true);
        try {
            await Promise.all(["ro", "en", "de"].map(lang =>
                fetch("/api/admin/content", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        type: "shop",
                        lang,
                        content: data[lang].shop.products
                    })
                })
            ));
            alert("Salvat cu succes!");
        } catch (err) {
            alert("Eroare la salvare");
        } finally {
            setSaving(false);
        }
    };

    const handleSaveServices = async () => {
        setSaving(true);
        try {
            await Promise.all(["ro", "en", "de"].map(lang =>
                fetch("/api/admin/content", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        type: "services",
                        lang,
                        content: data[lang].services.items
                    })
                })
            ));
            alert("Salvat cu succes!");
        } catch (err) {
            alert("Eroare la salvare");
        } finally {
            setSaving(false);
        }
    };

    const handleSaveBlog = async () => {
        setSaving(true);
        try {
            await fetch("/api/admin/blog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rawContent: blogContent })
            });
            alert("Blog salvat cu succes!");
        } catch (err) {
            alert("Eroare la salvare");
        } finally {
            setSaving(false);
        }
    };

    const updateProduct = (id: string, field: string, value: string) => {
        setData((prev: any) => {
            const newData = { ...prev };
            newData[activeLang].shop.products[id][field] = value;
            return newData;
        });
    };

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-primary">Se încarcă...</div>;

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 bg-secondary/20 border-r border-white/5 p-6 flex flex-col">
                <div className="mb-10">
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        Monalisa<span className="text-primary italic">Bio</span> Admin
                    </h1>
                </div>

                <nav className="space-y-2 flex-1">
                    <button
                        onClick={() => setActiveTab("shop")}
                        className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all", activeTab === "shop" ? "bg-primary text-black font-bold" : "text-zinc-500 hover:text-white hover:bg-white/5")}
                    >
                        <ShoppingBag className="w-5 h-5" /> Magazin
                    </button>
                    <button
                        onClick={() => setActiveTab("services")}
                        className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all", activeTab === "services" ? "bg-primary text-black font-bold" : "text-zinc-500 hover:text-white hover:bg-white/5")}
                    >
                        <Stethoscope className="w-5 h-5" /> Servicii
                    </button>
                    <button
                        onClick={() => setActiveTab("blog")}
                        className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all", activeTab === "blog" ? "bg-primary text-black font-bold" : "text-zinc-500 hover:text-white hover:bg-white/5")}
                    >
                        <BookOpen className="w-5 h-5" /> Blog (Code)
                    </button>
                </nav>

                <button
                    onClick={() => {
                        document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                        window.location.href = "/admin/login";
                    }}
                    className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-medium"
                >
                    <LogOut className="w-5 h-5" /> Ieșire
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="p-8 border-b border-white/5 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-white capitalize">{activeTab} Management</h2>
                        {activeTab !== "blog" && (
                            <div className="flex bg-black/40 rounded-full p-1 border border-white/5">
                                {["ro", "en", "de"].map(l => (
                                    <button
                                        key={l}
                                        onClick={() => setActiveLang(l)}
                                        className={cn("px-4 py-1 text-xs rounded-full font-bold uppercase transition-all", activeLang === l ? "bg-white text-black" : "text-zinc-500 hover:text-zinc-300")}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={activeTab === "shop" ? handleSaveShop : activeTab === "services" ? handleSaveServices : handleSaveBlog}
                        disabled={saving}
                        className="px-6 py-2.5 bg-primary text-black font-bold rounded-full hover:bg-emerald-400 transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" /> {saving ? "Se salvează..." : "Salvează Modificări"}
                    </button>
                </header>

                <section className="p-8">
                    {activeTab === "shop" && (
                        <div className="grid grid-cols-1 gap-6">
                            {Object.entries(data[activeLang].shop.products).map(([id, product]: [string, any]) => (
                                <div key={id} className="bg-secondary/20 p-6 rounded-2xl border border-white/5 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{id}</h3>
                                        <span className="bg-primary/10 text-primary text-[10px] px-2 py-1 rounded-full font-bold uppercase">{product.category}</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-zinc-600 font-bold uppercase">Titlu Produs</label>
                                            <input
                                                type="text"
                                                value={product.title}
                                                onChange={(e) => updateProduct(id, "title", e.target.value)}
                                                className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-zinc-600 font-bold uppercase">Preț</label>
                                            <input
                                                type="text"
                                                value={product.price}
                                                onChange={(e) => updateProduct(id, "price", e.target.value)}
                                                className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-zinc-600 font-bold uppercase">Descriere</label>
                                        <textarea
                                            rows={2}
                                            value={product.description}
                                            onChange={(e) => updateProduct(id, "description", e.target.value)}
                                            className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary resize-none"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "blog" && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between bg-primary/5 p-4 rounded-xl border border-primary/20 text-primary text-sm">
                                <p>Modul expert: Editați codul sursă al bazei de date blog (src/lib/blog-data.ts)</p>
                            </div>
                            <textarea
                                value={blogContent}
                                onChange={(e) => setBlogContent(e.target.value)}
                                className="w-full h-[600px] bg-black/40 border border-white/5 rounded-2xl p-6 text-zinc-400 font-mono text-xs focus:outline-none focus:border-primary"
                                spellCheck={false}
                            />
                        </div>
                    )}

                    {activeTab === "services" && (
                        <div className="grid grid-cols-1 gap-6">
                            {Object.entries(data[activeLang].services.items).map(([id, service]: [string, any]) => (
                                <div key={id} className="bg-secondary/20 p-6 rounded-2xl border border-white/5 space-y-4">
                                    <h3 className="text-zinc-500 text-xs font-bold uppercase">{id}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-zinc-600 font-bold uppercase">Titlu Serviciu</label>
                                            <input
                                                type="text"
                                                value={service.title}
                                                onChange={(e) => {
                                                    const newData = { ...data };
                                                    newData[activeLang].services.items[id].title = e.target.value;
                                                    setData(newData);
                                                }}
                                                className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-zinc-600 font-bold uppercase">Preț</label>
                                            <input
                                                type="text"
                                                value={service.price}
                                                onChange={(e) => {
                                                    const newData = { ...data };
                                                    newData[activeLang].services.items[id].price = e.target.value;
                                                    setData(newData);
                                                }}
                                                className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-zinc-600 font-bold uppercase">Perioadă</label>
                                            <input
                                                type="text"
                                                value={service.period}
                                                onChange={(e) => {
                                                    const newData = { ...data };
                                                    newData[activeLang].services.items[id].period = e.target.value;
                                                    setData(newData);
                                                }}
                                                className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] text-zinc-600 font-bold uppercase">Descriere</label>
                                        <textarea
                                            rows={2}
                                            value={service.description}
                                            onChange={(e) => {
                                                const newData = { ...data };
                                                newData[activeLang].services.items[id].description = e.target.value;
                                                setData(newData);
                                            }}
                                            className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary resize-none"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
