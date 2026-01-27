"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import { motion } from "framer-motion";

interface BlogPreviewProps {
    dict: any;
    lang: string;
}

export function BlogPreview({ dict, lang }: BlogPreviewProps) {
    // Sortează articolele descrescător după dată (aproximativ, folosind indexul sau o logică simplă) 
    // și ia primele 3
    const recentPosts = blogPosts.slice(0, 3);

    return (
        <section id="blog" className="py-24 bg-background border-t border-border relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />

            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <span className="inline-block py-1 px-3 rounded-full bg-secondary border border-border text-sm text-primary font-medium mb-4">
                            {dict.badge}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            {dict.title} <span className="text-primary">{dict.title_accent}</span>
                        </h2>
                        <p className="text-zinc-400">
                            {dict.subtitle}
                        </p>
                    </div>

                    <Link href={`/${lang}/blog`} className="hidden md:flex items-center gap-2 text-white font-semibold hover:text-primary transition-colors group">
                        {dict.cta_view_all} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recentPosts.map((post, index) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group flex flex-col h-full bg-secondary/20 border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all hover:bg-secondary/40"
                        >
                            <Link href={`/${lang}/blog/${post.slug}`} className="block relative aspect-video overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-medium border border-white/10">
                                    {post.category}
                                </div>
                            </Link>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        {post.readTime}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    <Link href={`/${lang}/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h3>

                                <p className="text-zinc-400 text-sm line-clamp-3 mb-6 flex-grow">
                                    {post.excerpt}
                                </p>

                                <Link href={`/${lang}/blog/${post.slug}`} className="inline-flex items-center text-sm font-semibold text-primary hover:text-emerald-300 transition-colors mt-auto">
                                    {dict.cta_read}
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href={`/${lang}/blog`} className="inline-flex items-center gap-2 text-white font-semibold hover:text-primary transition-colors group">
                        {dict.cta_view_all} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
