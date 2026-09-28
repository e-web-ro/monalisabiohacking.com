"use client";
import { useState } from "react";
import { Quote, Star, CheckCircle2, X, PenLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PublicReview } from "@/lib/reviews";
import { ReviewForm } from "./ReviewForm";

interface Testimonial {
    content: string;
    author: string;
    role: string;
    rating?: number;
    verified?: boolean;
}

interface TestimonialsProps {
    dict: {
        title: string;
        title_accent: string;
        subtitle: string;
        list: Testimonial[];
    };
    lang: string;
    reviews?: PublicReview[];
}

const TEXTS = {
    ro: { leave: "Lasă o recenzie", more: "Vezi mai multe", verified: "Cumpărător verificat" },
    en: { leave: "Leave a review", more: "Show more", verified: "Verified buyer" },
    de: { leave: "Bewertung abgeben", more: "Mehr anzeigen", verified: "Verifizierter Käufer" },
};

const PAGE_SIZE = 6;

export function Testimonials({ dict, lang, reviews = [] }: TestimonialsProps) {
    const t = TEXTS[lang as keyof typeof TEXTS] || TEXTS.ro;
    const [formOpen, setFormOpen] = useState(false);
    const [shown, setShown] = useState(PAGE_SIZE);

    // Approved reviews first (newest first), then the fixed testimonials from the dictionary
    const list: Testimonial[] = [
        ...reviews.map(r => ({
            content: r.text,
            author: r.name,
            role: r.productTitle,
            rating: r.rating,
            verified: r.verified,
        })),
        ...(dict.list || []),
    ];

    return (
        <section className="py-24 bg-secondary/20 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium mb-4">
                        {dict.subtitle}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        {dict.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">{dict.title_accent}</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {list.slice(0, shown).map((item: Testimonial, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: (index % PAGE_SIZE) * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-black/40 backdrop-blur-sm border border-white/5 p-8 rounded-2xl relative group hover:border-primary/30 transition-colors flex flex-col"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <Quote className="w-10 h-10 text-primary/20 group-hover:text-primary/40 transition-colors" />
                                {item.rating && (
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map(n => (
                                            <Star key={n} className={cn("w-4 h-4", n <= item.rating! ? "text-yellow-400 fill-yellow-400" : "text-zinc-700")} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <p className="text-zinc-300 italic mb-8 leading-relaxed whitespace-pre-line">
                                &ldquo;{item.content}&rdquo;
                            </p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white font-bold text-sm">
                                    {item.author.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold">{item.author}</h4>
                                    {item.verified ? (
                                        <p className="text-xs text-primary flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" /> {t.verified}{item.role && ` · ${item.role}`}
                                        </p>
                                    ) : (
                                        item.role && <p className="text-xs text-primary">{item.role}</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-wrap justify-center gap-4 mt-12">
                    {list.length > shown && (
                        <button
                            onClick={() => setShown(s => s + PAGE_SIZE)}
                            className="px-8 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
                        >
                            {t.more}
                        </button>
                    )}
                    <button
                        onClick={() => setFormOpen(true)}
                        className="px-8 py-3 bg-primary text-black font-bold rounded-full hover:bg-emerald-400 transition-colors flex items-center gap-2"
                    >
                        <PenLine className="w-4 h-4" /> {t.leave}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {formOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setFormOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-xl max-h-[90vh] overflow-y-auto relative z-10 bg-secondary rounded-3xl shadow-2xl"
                        >
                            <button
                                onClick={() => setFormOpen(false)}
                                aria-label="Close"
                                className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full transition-colors z-10"
                            >
                                <X className="w-6 h-6 text-zinc-400" />
                            </button>
                            <ReviewForm token="" lang={lang} onClose={() => setFormOpen(false)} />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
