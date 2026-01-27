"use client";
import { Check, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ServicesProps {
    dict: any;
    lang: string;
}

export function Services({ dict, lang }: ServicesProps) {
    const services = [
        {
            id: "explorare",
            title: dict.items.explorare.title,
            description: dict.items.explorare.description,
            duration: "1 h",
            price: dict.items.explorare.period === "o singură dată" ? dict.items.explorare.price || "Gratuit" : "Gratuit",
            price_display: "Gratuit",
            period: dict.items.explorare.period,
            highlight: false,
            features: dict.items.explorare.features
        },
        {
            id: "consultatie",
            title: dict.items.consultatie.title,
            description: dict.items.consultatie.description,
            duration: "1 h",
            price: "60 €",
            period: dict.items.consultatie.period,
            highlight: false,
            features: dict.items.consultatie.features
        },
        {
            id: "restart",
            title: dict.items.restart.title,
            description: dict.items.restart.description,
            duration: "1 h",
            price: "120 €",
            period: dict.items.restart.period,
            highlight: false,
            badge: dict.items.restart.badge,
            features: dict.items.restart.features
        },
        {
            id: "reset",
            title: dict.items.reset.title,
            description: dict.items.reset.description,
            duration: "1 h",
            price: "330 €",
            period: dict.items.reset.period,
            highlight: true,
            badge: dict.items.reset.badge,
            features: dict.items.reset.features
        },
        {
            id: "longeviq",
            title: dict.items.longeviq.title,
            description: dict.items.longeviq.description,
            duration: "1 h",
            price: "650 €",
            period: dict.items.longeviq.period,
            highlight: false,
            badge: dict.items.longeviq.badge,
            features: dict.items.longeviq.features
        }
    ];

    return (
        <section id="services" className="py-24 bg-background relative z-10">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-secondary border border-border text-sm text-zinc-400 font-medium mb-4">
                        {dict.badge}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        {dict.title} <span className="text-primary">{dict.title_accent}</span>
                    </h2>
                    <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
                        {dict.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={cn(
                                "relative flex flex-col p-8 rounded-3xl border transition-all duration-500 group",
                                index < 2 ? "lg:col-span-3" : "lg:col-span-2",
                                service.highlight
                                    ? "bg-secondary/40 border-primary shadow-lg shadow-primary/5 z-10"
                                    : "bg-secondary/10 border-border hover:bg-secondary/20 hover:border-zinc-700"
                            )}
                        >
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                                <span className="text-8xl font-black text-white select-none">0{index + 1}</span>
                            </div>

                            {service.highlight && (
                                <div className="absolute -top-3 left-8 bg-primary text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                                    {dict.popular}
                                </div>
                            )}

                            <div className="flex flex-col h-full">
                                <div className="mb-6 flex justify-between items-start">
                                    {service.badge ? (
                                        <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                                            {service.badge}
                                        </span>
                                    ) : <div />}
                                    <div className="flex items-center gap-2 text-zinc-500 text-xs">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{service.duration}</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                                    {service.description}
                                </p>

                                <div className="space-y-4 mb-8">
                                    {service.features.slice(0, 4).map((feature: string, i: number) => (
                                        <div key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                                            <span className="line-clamp-1">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-white/5 mt-auto">
                                    <div className="flex items-end justify-between mb-6">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-bold text-white tracking-tight">{service.price_display || service.price}</span>
                                            <span className="text-zinc-500 text-xs font-semibold uppercase opacity-60">{service.period}</span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/${lang}/programare?service=${service.id}`}
                                        className={cn(
                                            "w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group/btn",
                                            service.highlight
                                                ? "bg-primary text-black hover:bg-emerald-400 hover:shadow-[0_8px_20px_rgba(16,185,129,0.3)]"
                                                : "bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20"
                                        )}>
                                        {dict.cta}
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
