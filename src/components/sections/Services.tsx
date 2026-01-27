"use client";
import { Check, Clock } from "lucide-react";
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={cn(
                                "rounded-2xl p-8 border flex flex-col relative transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10",
                                service.highlight
                                    ? "bg-secondary/40 border-primary shadow-lg shadow-primary/5 scale-100 md:scale-105 z-10"
                                    : "bg-secondary/20 border-border hover:border-zinc-700"
                            )}
                        >
                            {service.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {dict.popular}
                                </div>
                            )}

                            {service.badge && (
                                <div className="mb-4 inline-flex">
                                    <span className="text-xs font-medium text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded">
                                        {service.badge}
                                    </span>
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                            <p className="text-zinc-400 text-sm mb-6 flex-grow">{service.description}</p>

                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-3xl font-bold text-white">{service.price_display || service.price}</span>
                                <span className="text-zinc-500 text-sm font-medium">{service.period}</span>
                            </div>

                            <div className="flex items-center gap-2 text-zinc-500 text-sm mb-8">
                                <Clock className="w-4 h-4" />
                                <span>{dict.common?.sessions || "Sesiuni de"} {service.duration}</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {service.features.map((feature: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={`/${lang}/programare?service=${service.id}`}
                                className={cn(
                                    "w-full py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer block text-center",
                                    service.highlight
                                        ? "bg-primary text-black hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                                        : "bg-zinc-800 text-white hover:bg-zinc-700 border border-transparent hover:border-zinc-600"
                                )}>
                                {dict.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
