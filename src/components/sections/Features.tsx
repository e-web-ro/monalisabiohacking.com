"use client";
import { Zap, Activity, Brain } from "lucide-react";
import { motion } from "framer-motion";

interface FeaturesProps {
    dict: any;
    lang: string;
}

export function Features({ dict, lang }: FeaturesProps) {
    const features = [
        {
            title: dict.card1_title,
            description: dict.card1_desc,
            icon: Zap,
            delay: 0.1
        },
        {
            title: dict.card2_title,
            description: dict.card2_desc,
            icon: Brain,
            delay: 0.2
        },
        {
            title: dict.card3_title,
            description: dict.card3_desc,
            icon: Activity,
            delay: 0.3
        }
    ];

    return (
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        {dict.title}
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: feature.delay, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-secondary border border-border hover:border-primary/50 transition-colors group cursor-default"
                        >
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                <feature.icon className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
