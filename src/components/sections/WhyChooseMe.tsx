"use client";
import { Fingerprint, Sprout, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface WhyChooseMeProps {
    dict: any;
    lang: string;
}

export function WhyChooseMe({ dict, lang }: WhyChooseMeProps) {
    const reasons = [
        {
            icon: Fingerprint,
            title: dict.card1_title,
            description: dict.card1_desc,
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop"
        },
        {
            icon: Sprout,
            title: dict.card2_title,
            description: dict.card2_desc,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop"
        },
        {
            icon: Cpu,
            title: dict.card3_title,
            description: dict.card3_desc,
            image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    return (
        <section className="py-24 bg-background relative z-10 overflow-hidden">
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
                            className="group p-0 rounded-3xl bg-secondary/30 border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden flex flex-col"
                        >
                            {/* Image Section */}
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image
                                    src={reason.image}
                                    alt={reason.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent" />

                                {/* Floating Icon */}
                                <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-background/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-xl group-hover:border-primary/50 transition-all duration-300">
                                    <reason.icon className="w-6 h-6 text-primary" />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8 relative">
                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                                        {reason.title}
                                    </h3>

                                    <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                                        {reason.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
