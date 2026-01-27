"use client";
import { Check, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const services = [
    {
        title: "Apel Gratuit de explorare",
        description: "Discuție inițială pentru a ne cunoaște și a stabili obiectivele.",
        duration: "1 h",
        price: "Gratuit",
        period: "o singură dată",
        highlight: false,
        features: ["Evaluare sumară", "Identificare obiective", "Q&A Scurt"]
    },
    {
        title: "Consultație Inițială",
        description: "Analiză detaliată a stilului de viață și a istoricului nutrițional.",
        duration: "1 h",
        price: "60 €",
        period: "/ ședință",
        highlight: false,
        features: ["Anamneză completă", "Analiză jurnal alimentar", "Recomandări primare"]
    },
    {
        title: "Restart Nutrițional",
        description: "Program de 1 lună pentru resetarea obiceiurilor alimentare.",
        duration: "1 h",
        price: "120 €",
        period: "/ program",
        highlight: false,
        badge: "Program 1 Lună",
        features: ["Plan personalizat", "4 Ședințe săptămânale", "Monitorizare constantă"]
    },
    {
        title: "RESET COMPLET",
        description: "Transformare profundă pe parcursul a 3 luni.",
        duration: "1 h",
        price: "330 €",
        period: "/ program",
        highlight: true,
        badge: "Program 3 Luni",
        features: ["Tot ce include Restart", "Protocol Biohacking", "Suport prioritar", "Ajustări dinamice"]
    },
    {
        title: "LongevIQ™ – Optimizare",
        description: "Program premium de 6 luni pentru performanță totală și longevitate.",
        duration: "1 h",
        price: "650 €",
        period: "/ program",
        highlight: false,
        badge: "Program 6 Luni",
        features: ["Biohacking Avansat", "Analiză analize sânge", "Plan suplimente", "Acces nelimitat WhatsApp"]
    }
];

export function ServicesGrid() {
    return (
        <section className="py-20">
            <div className="container px-4 mx-auto">
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
                                    Cel mai popular
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
                                <span className="text-3xl font-bold text-white">{service.price}</span>
                                <span className="text-zinc-500 text-sm font-medium">{service.period}</span>
                            </div>

                            <div className="flex items-center gap-2 text-zinc-500 text-sm mb-8">
                                <Clock className="w-4 h-4" />
                                <span>Sesiuni de {service.duration}</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={cn(
                                "w-full py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer",
                                service.highlight
                                    ? "bg-primary text-black hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                                    : "bg-zinc-800 text-white hover:bg-zinc-700 border border-transparent hover:border-zinc-600"
                            )}>
                                Rezervă Acum
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
