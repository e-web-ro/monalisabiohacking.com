"use client";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

interface TestimonialsProps {
    dict: any;
    lang: string;
}

const testimonials = [
    {
        content: "I never thought eating healthy could be this flavorful and satisfying. Monalisa's approach has changed my life for the better.",
        author: "Jessica M.",
        role: "Client Transformat"
    },
    {
        content: "The guidance provided by Monalisa Orendt has not only improved my eating habits but has also positively impacted my overall well-being.",
        author: "Carlos L.",
        role: "Biohacker Începător"
    },
    {
        content: "Monalisa's expertise and support have made me realize the importance of nutrition in leading a healthy lifestyle.",
        author: "Sophie B.",
        role: "Lifestyle Enthusiast"
    }
];

export function Testimonials({ dict, lang }: TestimonialsProps) {
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
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-black/40 backdrop-blur-sm border border-white/5 p-8 rounded-2xl relative group hover:border-primary/30 transition-colors"
                        >
                            <Quote className="w-10 h-10 text-primary/20 mb-6 group-hover:text-primary/40 transition-colors" />

                            <p className="text-zinc-300 italic mb-8 leading-relaxed">
                                "{t.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white font-bold text-sm">
                                    {t.author.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold">{t.author}</h4>
                                    <p className="text-xs text-primary">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
