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
    Globe,
    FileText,
    Image as ImageIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("shop");
    const [activeLang, setActiveLang] = useState("ro");
    const [data, setData] = useState<any>(null);
    const [blogPosts, setBlogPosts] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editModes, setEditModes] = useState<any>({});

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
                setBlogPosts(blogData.blogPosts);
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
                body: JSON.stringify({ blogPosts })
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

    const updateBlogPost = (index: number, field: string, value: string) => {
        setBlogPosts((prev: any) => {
            const newData = { ...prev };
            newData[activeLang][index][field] = value;
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
                        <BookOpen className="w-5 h-5" /> Blog
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
                        <div className="space-y-6">
                            <button
                                onClick={() => {
                                    const newId = `prod_${Date.now()}`;
                                    setData((prev: any) => {
                                        const newData = { ...prev };
                                        ["ro", "en", "de"].forEach(lang => {
                                            if (!newData[lang].shop.products) newData[lang].shop.products = {};
                                            newData[lang].shop.products = {
                                                [newId]: {
                                                    title: "Produs Nou",
                                                    price: "0 €",
                                                    description: "...",
                                                    category: "ebooks"
                                                },
                                                ...newData[lang].shop.products
                                            };
                                        });
                                        return newData;
                                    });
                                }}
                                className="w-full py-3 bg-secondary/30 hover:bg-secondary/50 border border-dashed border-zinc-700 hover:border-zinc-500 rounded-xl flex items-center justify-center gap-2 text-zinc-400 hover:text-white transition-all"
                            >
                                <Plus className="w-5 h-5" /> Adaugă Produs Nou
                            </button>

                            <div className="grid grid-cols-1 gap-6">
                                {Object.entries(data[activeLang].shop.products).map(([id, product]: [string, any]) => (
                                    <div key={id} className="bg-secondary/20 p-6 rounded-2xl border border-white/5 space-y-4 relative group">
                                        <button
                                            onClick={() => {
                                                if (!confirm("Sigur ștergeți acest produs?")) return;
                                                setData((prev: any) => {
                                                    const newData = { ...prev };
                                                    ["ro", "en", "de"].forEach(lang => {
                                                        if (newData[lang]?.shop?.products?.[id]) {
                                                            delete newData[lang].shop.products[id];
                                                        }
                                                    });
                                                    return newData;
                                                });
                                            }}
                                            className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                            title="Șterge Produs"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>

                                        <div className="flex items-center justify-between pr-12">
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
                                            <label className="text-[10px] text-zinc-600 font-bold uppercase">Categorie</label>
                                            <select
                                                value={product.category}
                                                onChange={(e) => updateProduct(id, "category", e.target.value)}
                                                className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                            >
                                                {Object.keys(data[activeLang].shop.filters)
                                                    .filter(k => k !== 'all')
                                                    .map(key => (
                                                        <option key={key} value={key} className="bg-zinc-900">
                                                            {data[activeLang].shop.filters[key]}
                                                        </option>
                                                    ))}
                                            </select>
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
                        </div>
                    )}

                    {activeTab === "blog" && blogPosts && (
                        <div className="space-y-6">
                            <button
                                onClick={() => {
                                    setBlogPosts((prev: any) => {
                                        const newData = { ...prev };
                                        ["ro", "en", "de"].forEach(lang => {
                                            if (!newData[lang]) newData[lang] = [];
                                            newData[lang].unshift({
                                                slug: `nou-articol-${Date.now()}`,
                                                title: "Titlu Articol Nou",
                                                excerpt: "Scurtă descriere...",
                                                date: new Date().toLocaleDateString('ro-RO'),
                                                readTime: "3 min de citit",
                                                image: "/cell-abstract.png",
                                                author: "Monalisa Orendt",
                                                authorImage: "/monalisa.png",
                                                category: "General",
                                                content: "<p>Conținutul articolului...</p>"
                                            });
                                        });
                                        return newData;
                                    });
                                }}
                                className="w-full py-3 bg-secondary/30 hover:bg-secondary/50 border border-dashed border-zinc-700 hover:border-zinc-500 rounded-xl flex items-center justify-center gap-2 text-zinc-400 hover:text-white transition-all"
                            >
                                <Plus className="w-5 h-5" /> Adaugă Articol Nou
                            </button>

                            <div className="flex flex-col gap-6">
                                {blogPosts[activeLang].map((post: any, index: number) => (
                                    <div key={index} className="bg-secondary/20 p-6 rounded-2xl border border-white/5 space-y-6 relative group">
                                        <button
                                            onClick={() => {
                                                if (!confirm("Sigur ștergeți acest articol?")) return;
                                                setBlogPosts((prev: any) => {
                                                    const newData = { ...prev };
                                                    ["ro", "en", "de"].forEach(lang => {
                                                        if (newData[lang]) {
                                                            // Try to find matching index or slug in other langs if synchronized, but here we just remove by index for simplicity across langs if they are synced order, 
                                                            // BUT they might not be. For safety, we only delete from current lang or try to delete matching slugs?
                                                            // The user added structure implies we might want to delete across all languages if it's the "same" post.
                                                            // For now, let's just delete from the CURRENT language. Use strict index.
                                                            if (lang === activeLang) {
                                                                newData[lang] = newData[lang].filter((_: any, i: number) => i !== index);
                                                            }
                                                        }
                                                    });
                                                    return newData;
                                                });
                                            }}
                                            className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
                                            title="Șterge Articol"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>

                                        {/* Header Inputs */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-zinc-600 font-bold uppercase">Titlu</label>
                                                <input
                                                    type="text"
                                                    value={post.title}
                                                    onChange={(e) => updateBlogPost(index, "title", e.target.value)}
                                                    className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-white font-bold focus:outline-none focus:border-primary"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-zinc-600 font-bold uppercase">Categorie</label>
                                                <input
                                                    type="text"
                                                    value={post.category}
                                                    onChange={(e) => updateBlogPost(index, "category", e.target.value)}
                                                    className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                                                />
                                            </div>
                                        </div>

                                        {/* Meta Inputs */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-zinc-600 font-bold uppercase">Slug (URL)</label>
                                                <input
                                                    type="text"
                                                    value={post.slug}
                                                    onChange={(e) => updateBlogPost(index, "slug", e.target.value)}
                                                    className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-zinc-400 text-xs font-mono focus:outline-none focus:border-primary"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-zinc-600 font-bold uppercase">Data</label>
                                                <input
                                                    type="text"
                                                    value={post.date}
                                                    onChange={(e) => updateBlogPost(index, "date", e.target.value)}
                                                    className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-white text-xs focus:outline-none focus:border-primary"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-zinc-600 font-bold uppercase">Timp Citire</label>
                                                <input
                                                    type="text"
                                                    value={post.readTime}
                                                    onChange={(e) => updateBlogPost(index, "readTime", e.target.value)}
                                                    className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-white text-xs focus:outline-none focus:border-primary"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] text-zinc-600 font-bold uppercase">Imagine (cale)</label>
                                                <input
                                                    type="text"
                                                    value={post.image}
                                                    onChange={(e) => updateBlogPost(index, "image", e.target.value)}
                                                    className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-zinc-400 text-xs focus:outline-none focus:border-primary"
                                                />
                                            </div>
                                        </div>

                                        {/* Content Inputs */}
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-zinc-600 font-bold uppercase">Rezumat (apare în listă)</label>
                                            <textarea
                                                rows={2}
                                                value={post.excerpt}
                                                onChange={(e) => updateBlogPost(index, "excerpt", e.target.value)}
                                                className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-zinc-300 focus:outline-none focus:border-primary resize-none"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] text-zinc-600 font-bold uppercase">
                                                    Conținut Articol
                                                </label>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            const newModes = { ...editModes };
                                                            newModes[index] = newModes[index] === "text" ? "html" : "text";
                                                            setEditModes(newModes);
                                                        }}
                                                        className={cn(
                                                            "px-2 py-1 text-[10px] rounded border transition-all",
                                                            editModes[index] === "text"
                                                                ? "bg-primary text-black border-primary font-bold"
                                                                : "bg-transparent text-zinc-500 border-zinc-700 hover:text-white"
                                                        )}
                                                    >
                                                        {editModes[index] === "text" ? "📝 Text Simplu" : "🧑‍💻 HTML"}
                                                    </button>
                                                </div>
                                            </div>

                                            {editModes[index] === "text" ? (
                                                <div className="space-y-2">
                                                    <div className="text-[10px] text-zinc-500 italic">
                                                        * În acest mod, fiecare linie nouă devine un paragraf automat.
                                                    </div>
                                                    <textarea
                                                        rows={15}
                                                        value={(() => {
                                                            // Convert HTML to simple text for display
                                                            // This is a basic conversion for convenience
                                                            return post.content
                                                                .replaceAll("</p>", "\n")
                                                                .replaceAll("<br>", "\n")
                                                                .replaceAll("<br/>", "\n")
                                                                .replace(/<[^>]+>/g, "") // Strip other tags
                                                                .split("\n")
                                                                .filter((l: string) => l.trim())
                                                                .join("\n\n");
                                                        })()}
                                                        onChange={(e) => {
                                                            // Convert text back to HTML paragraphs
                                                            const html = e.target.value
                                                                .split(/\n\s*\n/) // Split by double newlines for paragraphs
                                                                .map((p: string) => p.trim())
                                                                .filter((p: string) => p)
                                                                .map((p: string) => `<p>${p}</p>`)
                                                                .join("");
                                                            updateBlogPost(index, "content", html);
                                                        }}
                                                        className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-4 text-zinc-300 font-mono text-sm focus:outline-none focus:border-primary"
                                                        placeholder="Scrieți textul aici. Lăsați un rând liber între paragrafe."
                                                    />
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    <div className="text-[10px] text-zinc-500 italic">
                                                        * Editați codul HTML direct. Folosiți &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt; etc.
                                                    </div>
                                                    <textarea
                                                        rows={15}
                                                        value={post.content}
                                                        onChange={(e) => updateBlogPost(index, "content", e.target.value)}
                                                        className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-4 text-zinc-300 font-mono text-sm focus:outline-none focus:border-primary"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "services" && (
                        <div className="space-y-6">
                            <button
                                onClick={() => {
                                    const newId = `service_${Date.now()}`;
                                    setData((prev: any) => {
                                        const newData = { ...prev };
                                        ["ro", "en", "de"].forEach(lang => {
                                            if (!newData[lang].services.items) newData[lang].services.items = {};
                                            newData[lang].services.items = {
                                                [newId]: {
                                                    title: "Serviciu Nou",
                                                    price: "0 €",
                                                    period: "1h",
                                                    description: "..."
                                                },
                                                ...newData[lang].services.items
                                            };
                                        });
                                        return newData;
                                    });
                                }}
                                className="w-full py-3 bg-secondary/30 hover:bg-secondary/50 border border-dashed border-zinc-700 hover:border-zinc-500 rounded-xl flex items-center justify-center gap-2 text-zinc-400 hover:text-white transition-all"
                            >
                                <Plus className="w-5 h-5" /> Adaugă Serviciu Nou
                            </button>

                            <div className="grid grid-cols-1 gap-6">
                                {Object.entries(data[activeLang].services.items).map(([id, service]: [string, any]) => (
                                    <div key={id} className="bg-secondary/20 p-6 rounded-2xl border border-white/5 space-y-4 relative group">
                                        <button
                                            onClick={() => {
                                                if (!confirm("Sigur ștergeți acest serviciu?")) return;
                                                setData((prev: any) => {
                                                    const newData = { ...prev };
                                                    ["ro", "en", "de"].forEach(lang => {
                                                        if (newData[lang]?.services?.items?.[id]) {
                                                            delete newData[lang].services.items[id];
                                                        }
                                                    });
                                                    return newData;
                                                });
                                            }}
                                            className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                            title="Șterge Serviciu"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>

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
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-zinc-600 font-bold uppercase">Caracteristici (separate prin virgulă)</label>
                                            <textarea
                                                rows={2}
                                                value={service.features ? service.features.join(", ") : ""}
                                                onChange={(e) => {
                                                    const newData = { ...data };
                                                    newData[activeLang].services.items[id].features = e.target.value.split(",").map((s: string) => s.trim()).filter((s: string) => s);
                                                    setData(newData);
                                                }}
                                                placeholder="Ex: Evaluare sumară, Identificare obiective, Q&A"
                                                className="w-full bg-black/20 border border-white/5 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary resize-none"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
