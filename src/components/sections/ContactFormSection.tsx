"use client";
import { Mail, Phone, MapPin, Send, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface ContactFormSectionProps {
    dict: any;
}

export function ContactFormSection({ dict }: ContactFormSectionProps) {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: "", surname: "", email: "", subject: "", message: "" });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

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
                                <Link href="https://www.tiktok.com/@lisaorendt.nutritie" target="_blank" className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-black hover:border-primary transition-all">
                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13 3.26-.11 6.52-.13 9.78-.04 1.21-.4 2.48-1.2 3.44-1.12 1.48-3.05 2.15-4.83 2.02-1.8-.08-3.52-1.07-4.43-2.63-1.01-1.63-1.01-3.8-.07-5.46.75-1.39 2.15-2.4 3.73-2.6v4.08c-.76.15-1.51.52-1.95 1.16-.54.7-.56 1.73-.13 2.45.4.73 1.25 1.18 2.08 1.09 1.13-.03 2.05-1.08 2.09-2.21.05-3.87.02-7.75.04-11.63.14-.04.28-.08.43-.12V.02z" />
                                    </svg>
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

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">{dict.contact_form.label_name}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder={dict.contact_form.placeholder_name}
                                        required
                                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">{dict.contact_form.label_surname}</label>
                                    <input
                                        type="text"
                                        name="surname"
                                        value={formData.surname}
                                        onChange={handleChange}
                                        placeholder={dict.contact_form.placeholder_surname}
                                        required
                                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">{dict.contact_form.label_email}</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={dict.contact_form.placeholder_email}
                                    required
                                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">{dict.contact_form.label_subject}</label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>{dict.contact_form.option_default}</option>
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
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder={dict.contact_form.placeholder_message}
                                    required
                                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600 resize-none"
                                ></textarea>
                            </div>

                            {status === 'success' && (
                                <p className="text-green-500 font-medium">Message sent successfully!</p>
                            )}
                            {status === 'error' && (
                                <p className="text-red-500 font-medium">Failed to send message. Please try again.</p>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-emerald-400 transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? 'Sending...' : dict.contact_form.submit}
                                {!status.includes('loading') && <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
