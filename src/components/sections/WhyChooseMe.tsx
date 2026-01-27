"use client";
import { Fingerprint, Sprout, Cpu } from "lucide-react";
import { motion } from "framer-motion";

interface WhyChooseMeProps {
    dict: any;
    lang: string;
}

export function WhyChooseMe({ dict, lang }: WhyChooseMeProps) {
    const reasons = [
        {
            icon: Fingerprint,
            title: dict.card1_title,
            description: dict.card1_desc
        },
        {
            icon: Sprout,
            title: dict.card2_title,
            description: dict.card2_desc
        },
        {
            icon: Cpu,
            title: dict.card3_title,
            description: dict.card3_desc
        }
    ];

    return (
        <section className="py-24 bg-background relative z-10">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        {dict.title} <span className="text-primary">{dict.title_accent}</span>
                    </h2>
                    <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group p-8 rounded-3xl bg-secondary/50 border border-border hover:bg-secondary hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-secondary border border-border flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300 shadow-lg shadow-black/50">
                                    <reason.icon className="w-8 h-8 text-primary group-hover:text-emerald-400 transition-colors" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                                    {reason.title}
                                </h3>

                                <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                                    {reason.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
