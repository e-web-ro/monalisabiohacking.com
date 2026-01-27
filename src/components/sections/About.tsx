"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface AboutProps {
    dict: any;
    lang: string;
}

export function About({ dict, lang }: AboutProps) {
    return (
        <section id="about" className="py-24 bg-secondary/30 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

            <div className="container px-4 mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border shadow-2xl">
                            <Image
                                src="/monalisa.png"
                                alt="Monalisa Biohacking"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                                    <p className="text-white font-medium">"{dict.quote_img}"</p>
                                </div>
                            </div>
                        </div>
                        {/* Decorative box behind */}
                        <div className="absolute -z-10 -bottom-6 -left-6 w-full h-full border border-primary/20 rounded-2xl" />
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2"
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium mb-6">
                            {dict.badge}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                            {dict.title} <br />
                            <span className="text-primary">{dict.subtitle}</span>
                        </h2>

                        <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
                            <p>
                                <strong className="text-white">{dict.desc1.split(" – ")[0]}</strong> – {dict.desc1.split(" – ")[1] || dict.desc1}
                            </p>
                            <p>
                                {dict.desc2}
                            </p>

                            {/* Shortened/Generalized text, assuming manual content was specific. 
                                Ideally, we should add these to dictionary too if we want full translation.
                                For now, I'll use the dict structure I defined. */}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                {[
                                    "Nutriție Funcțională",
                                    "Biohacking Personalizat",
                                    "Echilibru Hormonal",
                                    "Longevitate Conștientă"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-white font-medium">
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                        {item}
                                    </div>
                                ))}
                            </div>

                            <p className="pt-4 italic border-l-4 border-primary pl-4 text-zinc-300">
                                "{dict.quote_text}"
                            </p>
                        </div>

                        <div className="mt-10">
                            <button className="cursor-pointer px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all shadow-lg hover:scale-105">
                                {dict.cta}
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
