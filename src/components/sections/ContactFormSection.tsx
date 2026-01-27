"use client";
import { Mail, Phone, MapPin, Send, Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ContactFormSectionProps {
    dict: any;
}

export function ContactFormSection({ dict }: ContactFormSectionProps) {
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
                            <h3 className="text-2xl font-bold text-white mb-6">{dict.contact_form.title}</h3>
                            <p className="text-zinc-400 mb-8 leading-relaxed">
                                {dict.contact_form.subtitle}
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border hover:border-primary/30 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">{dict.contact_form.location_title}</h4>
                                        <p className="text-zinc-400">{dict.contact_form.location_desc}</p>
                                        <p className="text-zinc-500 text-sm mt-1">{dict.contact_form.location_online}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border hover:border-primary/30 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">{dict.contact_form.phone_title}</h4>
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
                                        <h4 className="text-white font-semibold mb-1">{dict.contact_form.email_title}</h4>
                                        <a href="mailto:contact@monalisabiohacking.com" className="text-zinc-400 hover:text-white transition-colors block">
                                            contact@monalisabiohacking.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-6">{dict.contact_form.social_title}</h3>
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
                        <h3 className="text-2xl font-bold text-white mb-2">{dict.contact_form.form_title}</h3>
                        <p className="text-zinc-400 mb-8 text-sm">
                            {dict.contact_form.form_subtitle}
                        </p>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">{dict.contact_form.label_name}</label>
                                    <input
                                        type="text"
                                        placeholder={dict.contact_form.placeholder_name}
                                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">{dict.contact_form.label_surname}</label>
                                    <input
                                        type="text"
                                        placeholder={dict.contact_form.placeholder_surname}
                                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">{dict.contact_form.label_email}</label>
                                <input
                                    type="email"
                                    placeholder={dict.contact_form.placeholder_email}
                                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">{dict.contact_form.label_subject}</label>
                                <select className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all appearance-none cursor-pointer">
                                    <option value="" disabled selected>{dict.contact_form.option_default}</option>
                                    <option value="conslutation">{dict.services.items.explorare.title}</option>
                                    <option value="restart">{dict.services.items.restart.title}</option>
                                    <option value="reset">{dict.services.items.reset.title}</option>
                                    <option value="longeviq">{dict.services.items.longeviq.title}</option>
                                    <option value="other">{dict.contact_form.option_other}</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">{dict.contact_form.label_message}</label>
                                <textarea
                                    rows={5}
                                    placeholder={dict.contact_form.placeholder_message}
                                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600 resize-none"
                                ></textarea>
                            </div>

                            <button type="submit" className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-emerald-400 transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group cursor-pointer">
                                {dict.contact_form.submit} <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
