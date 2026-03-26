"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Upload, Save, X } from "lucide-react";

export default function ProductsPage() {
    const [products, setProducts] = useState<Record<string, any>>({});
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [newProduct, setNewProduct] = useState({
        id: "",
        title: "",
        price: "19 €",
        description: "",
        category: "ebooks",
        file_url: ""
    });

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);

        try {
            const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
                method: "POST",
                body: file
            });
            
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Upload failed");
            }

            const data = await res.json();
            if (data.url) {
                setNewProduct(prev => ({ ...prev, file_url: data.url }));
                alert("Fișier încărcat cu succes în Vercel Blob!");
            }
        } catch (e: any) {
            console.error("Upload failed", e);
            alert("Eroare la încărcare: " + e.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/products', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct)
            });

            if (res.ok) {
                // Refresh list
                const refreshed = await (await fetch('/api/products')).json();
                setProducts(refreshed);
                // Reset form
                setNewProduct({
                    id: "",
                    title: "",
                    price: "19 €",
                    description: "",
                    category: "ebooks",
                    file_url: ""
                });
                setFile(null);
            }
        } catch (e) {
            console.error("Save failed", e);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await fetch(`/api/products?id=${id}`, { method: "DELETE" });
            const newProducts = { ...products };
            delete newProducts[id];
            setProducts(newProducts);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-white mb-8">Manage Products</h1>

            <div className="bg-secondary/20 p-6 rounded-2xl border border-white/5">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-primary" /> Add New Product
                </h2>

                <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <input
                            placeholder="Product Title"
                            value={newProduct.title}
                            onChange={e => setNewProduct({ ...newProduct, title: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white"
                            required
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                placeholder="Price (e.g. 19 €)"
                                value={newProduct.price}
                                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white"
                                required
                            />
                            <select
                                value={newProduct.category}
                                onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white"
                            >
                                <option value="ebooks">Ebook</option>
                                <option value="guides">Guide</option>
                                <option value="protocols">Protocol</option>
                            </select>
                        </div>
                        <textarea
                            placeholder="Description"
                            rows={3}
                            value={newProduct.description}
                            onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="bg-black/20 border border-dashed border-white/20 rounded-xl p-6 text-center">
                            <label className="cursor-pointer block">
                                <Upload className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                                <span className="text-sm text-zinc-400">
                                    {file ? file.name : "Select PDF File"}
                                </span>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={e => {
                                        if (e.target.files?.[0]) {
                                            setFile(e.target.files[0]);
                                            // Auto upload on select for simplicity in this demo
                                        }
                                    }}
                                    className="hidden"
                                />
                            </label>
                            {file && !newProduct.file_url && (
                                <button
                                    type="button"
                                    onClick={handleUpload}
                                    disabled={uploading}
                                    className="mt-4 px-4 py-2 bg-primary/10 text-primary text-sm rounded-lg hover:bg-primary/20"
                                >
                                    {uploading ? "Uploading..." : "Upload File"}
                                </button>
                            )}
                            {newProduct.file_url && (
                                <p className="text-green-500 text-sm mt-4 break-all">{newProduct.file_url}</p>
                            )}
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={uploading || !newProduct.file_url}
                                className="px-8 py-3 bg-primary text-black font-bold rounded-full hover:bg-emerald-400 transition-colors disabled:opacity-50"
                            >
                                Save Product
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="bg-secondary/20 p-6 rounded-2xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="text-zinc-500 border-b border-white/5">
                        <tr>
                            <th className="pb-4 pl-4">Title</th>
                            <th className="pb-4">Price</th>
                            <th className="pb-4">Category</th>
                            <th className="pb-4 text-right pr-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {Object.entries(products).map(([id, p]: [string, any]) => (
                            <tr key={id} className="hover:bg-white/5 transition-colors">
                                <td className="py-4 pl-4 text-white font-medium">
                                    {p.title}
                                    <div className="text-xs text-zinc-500 truncate max-w-[200px]">{p.file_url}</div>
                                </td>
                                <td className="py-4 text-zinc-300">{p.price}</td>
                                <td className="py-4 text-zinc-400 uppercase text-xs">{p.category}</td>
                                <td className="py-4 text-right pr-4">
                                    <button
                                        onClick={() => handleDelete(id)}
                                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
