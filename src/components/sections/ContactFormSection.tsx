"use client";
import { Mail, Phone, MapPin, Send, Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function ContactFormSection() {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Contact Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-12"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6">Informații de Contact</h3>
                            <p className="text-zinc-400 mb-8 leading-relaxed">
                                Răspund personal la toate mesajele în termen de 24-48 de ore.
                                Pentru urgențe sau programări rapide, îmi puteți scrie pe WhatsApp.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border hover:border-primary/30 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Locație</h4>
                                        <p className="text-zinc-400">71717 Beilstein, Germany</p>
                                        <p className="text-zinc-500 text-sm mt-1">Disponibilă și online, internațional</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border hover:border-primary/30 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Telefon / WhatsApp</h4>
                                        <a href="tel:+4915750123117" className="text-zinc-400 hover:text-white transition-colors block">
                                            +49 1575 0123117
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border hover:border-primary/30 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Email</h4>
                                        <a href="mailto:contact@monalisabiohacking.com" className="text-zinc-400 hover:text-white transition-colors block">
                                            contact@monalisabiohacking.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-6">Social Media</h3>
                            <div className="flex gap-4">
                                <Link href="https://www.instagram.com/monalisa_consilier_nutritie?igsh=MXF1ZjFjejZmOXh1MQ==" target="_blank" className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-black hover:border-primary transition-all">
                                    <Instagram className="w-6 h-6" />
                                </Link>
                                <Link href="#" className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-black hover:border-primary transition-all">
                                    <Facebook className="w-6 h-6" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-secondary/20 p-8 rounded-2xl border border-border"
                    >
                        <h3 className="text-2xl font-bold text-white mb-2">Trimite un Mesaj</h3>
                        <p className="text-zinc-400 mb-8 text-sm">
                            Completează formularul și te voi contacta pentru a programa Apelul Gratuit de Explorare.
                        </p>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Nume</label>
                                    <input
                                        type="text"
                                        placeholder="Numele tău"
                                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Prenume</label>
                                    <input
                                        type="text"
                                        placeholder="Prenumele tău"
                                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Email</label>
                                <input
                                    type="email"
                                    placeholder="adresa@email.com"
                                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Subiect / Serviciu Dorit</label>
                                <select className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all appearance-none cursor-pointer">
                                    <option value="" disabled selected>Alege o opțiune...</option>
                                    <option value="conslutation">Apel Gratuit de Explorare</option>
                                    <option value="restart">Restart Nutrițional (1 Lună)</option>
                                    <option value="reset">RESET COMPLET (3 Luni)</option>
                                    <option value="longeviq">LongevIQ™ (6 Luni)</option>
                                    <option value="other">Altceva</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Mesaj</label>
                                <textarea
                                    rows={5}
                                    placeholder="Povestește-mi puțin despre obiectivele tale..."
                                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600 resize-none"
                                ></textarea>
                            </div>

                            <button type="submit" className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-emerald-400 transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group cursor-pointer">
                                Trimite Mesajul <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
