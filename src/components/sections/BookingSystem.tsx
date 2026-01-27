"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ro } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, Calendar as CalendarIcon, ChevronRight, User, Mail, Phone, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
    { id: "explorare", title: "Apel Gratuit de explorare", duration: 60, price: "Gratuit" },
    { id: "consultatie", title: "Consultație Inițială", duration: 60, price: "60 €" },
    { id: "restart", title: "Restart Nutrițional (1 Lună)", duration: 60, price: "120 €" },
    { id: "reset", title: "RESET COMPLET (3 Luni)", duration: 60, price: "330 €" },
    { id: "longeviq", title: "LongevIQ™ (6 Luni)", duration: 60, price: "650 €" },
];

const timeSlots = [
    "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

interface BookingSystemProps {
    dict: any;
    lang: string;
}

function BookingSystemContent({ dict, lang }: BookingSystemProps) {
    const searchParams = useSearchParams();
    const serviceId = searchParams.get("service");

    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState(serviceId ? services.find(s => s.id === serviceId) || null : null);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [time, setTime] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        notes: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send data to backend/API
        console.log("Booking Data:", { selectedService, date, time, formData });
        setTimeout(() => setIsSubmitted(true), 1500); // Simulate API call
    };

    if (isSubmitted) {
        return (
            <main className="min-h-screen bg-background">
                <Navbar dict={dict.navbar} lang={lang} />
                <div className="container px-4 mx-auto min-h-screen flex items-center justify-center pt-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-secondary/30 p-12 rounded-3xl border border-primary/20 text-center max-w-2xl backdrop-blur-sm"
                    >
                        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Check className="w-12 h-12 text-primary" />
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-4">Rezervare Trimisă!</h2>
                        <p className="text-xl text-zinc-300 mb-8">
                            Mulțumesc, <span className="text-primary font-semibold">{formData.name}</span>! <br />
                            Cererea ta pentru <span className="text-white font-semibold">{selectedService?.title}</span> a fost înregistrată.
                        </p>
                        <p className="text-zinc-400 mb-8">
                            Vei primi o confirmare pe email ({formData.email}) în scurt timp.
                        </p>
                        <a href="/" className="inline-block px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                            Înapoi la Home
                        </a>
                    </motion.div>
                </div>
                <Footer dict={dict.footer} lang={lang} />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar dict={dict.navbar} lang={lang} />

            <section className="pt-32 pb-20">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Summary Sidebar */}
                        <div className="w-full lg:w-1/3 order-2 lg:order-1">
                            <div className="bg-secondary/20 p-8 rounded-2xl border border-border sticky top-32">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" /> Sumar Rezervare
                                </h3>

                                <div className="space-y-6">
                                    <div className="pb-6 border-b border-white/5">
                                        <p className="text-sm text-zinc-500 mb-1">Serviciu</p>
                                        <p className="text-white font-medium text-lg">
                                            {selectedService ? selectedService.title : "Neselectat"}
                                        </p>
                                        {selectedService && (
                                            <p className="text-primary text-sm mt-1">{selectedService.price} • {selectedService.duration} min</p>
                                        )}
                                    </div>

                                    <div className="pb-6 border-b border-white/5">
                                        <p className="text-sm text-zinc-500 mb-1">Data & Ora</p>
                                        <div className="flex items-center gap-2 text-white">
                                            <CalendarIcon className="w-4 h-4 text-zinc-400" />
                                            {date ? format(date, "PPP", { locale: ro }) : "-"}
                                        </div>
                                        <div className="flex items-center gap-2 text-white mt-2">
                                            <Clock className="w-4 h-4 text-zinc-400" />
                                            {time ? time : "-"}
                                        </div>
                                    </div>

                                    {step > 1 && (
                                        <button
                                            onClick={() => setStep(1)}
                                            className="text-xs text-zinc-500 hover:text-white underline"
                                        >
                                            Modifică
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Main Booking Area */}
                        <div className="w-full lg:w-2/3 order-1 lg:order-2">
                            {/* Progress Bar */}
                            <div className="flex items-center justify-between mb-8 relative">
                                <div className="absolute left-0 top-1/2 w-full h-1 bg-secondary -z-10 rounded-full" />
                                <div
                                    className="absolute left-0 top-1/2 h-1 bg-primary transition-all duration-300 rounded-full -z-10"
                                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                                />

                                {[1, 2, 3].map((s) => (
                                    <div
                                        key={s}
                                        className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-all duration-300",
                                            step >= s
                                                ? "bg-primary border-background text-black"
                                                : "bg-secondary border-background text-zinc-500"
                                        )}
                                    >
                                        {s}
                                    </div>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <h2 className="text-3xl font-bold text-white">1. Alege Serviciul</h2>
                                        <div className="grid grid-cols-1 gap-4">
                                            {services.map((service) => (
                                                <div
                                                    key={service.id}
                                                    onClick={() => setSelectedService(service)}
                                                    className={cn(
                                                        "p-6 rounded-xl border cursor-pointer transition-all flex items-center justify-between group",
                                                        selectedService?.id === service.id
                                                            ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                                                            : "bg-secondary/20 border-border hover:border-zinc-600 hover:bg-secondary/40"
                                                    )}
                                                >
                                                    <div>
                                                        <h3 className={cn("font-bold text-lg", selectedService?.id === service.id ? "text-primary" : "text-white")}>
                                                            {service.title}
                                                        </h3>
                                                        <p className="text-zinc-500 text-sm mt-1">{service.duration} minute</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className={cn("font-bold text-xl block", selectedService?.id === service.id ? "text-white" : "text-zinc-300")}>
                                                            {service.price}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-end pt-8">
                                            <button
                                                onClick={handleNext}
                                                disabled={!selectedService}
                                                className="px-8 py-3 bg-white text-black font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors flex items-center gap-2"
                                            >
                                                Pasul Următor <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <h2 className="text-3xl font-bold text-white">2. Alege Data & Ora</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <h4 className="text-zinc-400 mb-4 font-medium">Selectează Ziua</h4>
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    className="rounded-xl border border-border w-full"
                                                    disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6} // Disable weekends/past
                                                />
                                            </div>

                                            <div>
                                                <h4 className="text-zinc-400 mb-4 font-medium">Selectează Ora</h4>
                                                {!date ? (
                                                    <div className="h-full flex items-center justify-center border border-dashed border-zinc-800 rounded-xl p-8 text-zinc-600">
                                                        Alege o dată din calendar mai întâi
                                                    </div>
                                                ) : (
                                                    <div className="grid grid-cols-3 gap-3">
                                                        {timeSlots.map((t) => (
                                                            <button
                                                                key={t}
                                                                onClick={() => setTime(t)}
                                                                className={cn(
                                                                    "py-2 rounded-lg text-sm font-medium transition-all border",
                                                                    time === t
                                                                        ? "bg-primary text-black border-primary"
                                                                        : "bg-secondary/40 text-white border-transparent hover:border-zinc-600"
                                                                )}
                                                            >
                                                                {t}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-between pt-8 border-t border-white/5 mt-8">
                                            <button
                                                onClick={handleBack}
                                                className="text-zinc-400 hover:text-white flex items-center gap-2"
                                            >
                                                <ArrowLeft className="w-5 h-5" /> Înapoi
                                            </button>
                                            <button
                                                onClick={handleNext}
                                                disabled={!date || !time}
                                                className="px-8 py-3 bg-white text-black font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors flex items-center gap-2"
                                            >
                                                Pasul Următor <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <h2 className="text-3xl font-bold text-white">3. Detaliile Tale</h2>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm text-zinc-400 flex items-center gap-2"><User className="w-4 h-4" /> Nume Complet</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
                                                        placeholder="Ex: Maria Popescu"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm text-zinc-400 flex items-center gap-2"><Phone className="w-4 h-4" /> Telefon</label>
                                                    <input
                                                        required
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
                                                        placeholder="Ex: 07xx xxx xxx"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm text-zinc-400 flex items-center gap-2"><Mail className="w-4 h-4" /> Email</label>
                                                <input
                                                    required
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
                                                    placeholder="Ex: maria@email.com"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm text-zinc-400">Note adiționale (opțional)</label>
                                                <textarea
                                                    rows={4}
                                                    value={formData.notes}
                                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                                    className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 resize-none"
                                                    placeholder="Dacă ai întrebări specifice..."
                                                ></textarea>
                                            </div>

                                            <div className="flex justify-between pt-8 border-t border-white/5 mt-8 items-center">
                                                <button
                                                    type="button"
                                                    onClick={handleBack}
                                                    className="text-zinc-400 hover:text-white flex items-center gap-2"
                                                >
                                                    <ArrowLeft className="w-5 h-5" /> Înapoi
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-8 py-3 bg-primary text-black font-bold rounded-full hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105"
                                                >
                                                    Confirmă Rezervarea
                                                </button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export function BookingSystem({ dict, lang }: BookingSystemProps) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-primary">Se încarcă sistemul...</div>}>
            <BookingSystemContent dict={dict} lang={lang} />
        </Suspense>
    );
}
