"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface HeroProps {
    dict: any;
    lang: string;
}

export function Hero({ dict, lang }: HeroProps) {
    return (
        <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-background">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container px-4 mx-auto relative z-10 text-center pt-20 md:pt-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-secondary border border-border text-sm text-primary font-medium mb-6">
                        {dict.badge}
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500 mb-6 leading-tight">
                        {dict.title1} <br />
                        <span className="text-primary">{dict.title2}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 mb-8 leading-relaxed max-w-2xl mx-auto">
                        {dict.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
                        <Link href={`/${lang}/programare`} className="w-full sm:w-auto px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all text-center">
                            {dict.cta_primary}
                        </Link>
                        <Link href={`/${lang}/servicii`} className="w-full sm:w-auto px-8 py-3 bg-secondary text-white font-bold rounded-full border border-border hover:bg-zinc-800 transition-all text-center">
                            {dict.cta_secondary}
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
