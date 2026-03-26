"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                router.push("/admin/dashboard");
            } else {
                setError("Credențiale invalide");
            }
        } catch (err) {
            setError("Eroare la conectare");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-secondary/30 p-8 rounded-3xl border border-white/10 backdrop-blur-xl"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Lock className="text-primary w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Admin Login</h1>
                    <p className="text-zinc-500 text-sm mt-2">Monalisa Biohacking Management</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm text-zinc-400 flex items-center gap-2">
                            <User className="w-4 h-4" /> Utilizator
                        </label>
                        <input
                            required
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-zinc-400 flex items-center gap-2">
                            <Lock className="w-4 h-4" /> Parolă
                        </label>
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full py-4 bg-primary text-black font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                    >
                        {loading ? "Se conectează..." : "Autentificare"}
                    </button>
                </form>
            </motion.div>
        </main>
    );
}
