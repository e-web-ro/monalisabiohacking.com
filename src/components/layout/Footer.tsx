"use client";
import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";

interface FooterProps {
    dict: any;
    lang: string;
}

export function Footer({ dict, lang }: FooterProps) {
    return (
        <footer className="bg-secondary border-t border-border pt-16 pb-8">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href={`/${lang}`} className="text-2xl font-bold text-white tracking-tighter mb-4 block">
                            Monalisa<span className="text-primary">Biohacking</span>
                        </Link>
                        <p className="text-zinc-400 max-w-sm mb-6">
                            {dict.desc}
                        </p>
                        <div className="flex gap-4">
                            <Link href="https://www.instagram.com/monalisa_consilier_nutritie?igsh=MXF1ZjFjejZmOXh1MQ==" target="_blank" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-black transition-all">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-black transition-all">
                                <Facebook className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">{dict.contact}</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-zinc-400">
                                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span>71717 Beilstein, Germany</span>
                            </li>
                            <li className="flex items-center gap-3 text-zinc-400">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <a href="tel:+4915750123117" className="hover:text-white transition-colors">
                                    +49 1575 0123117
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-zinc-400">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <a href="mailto:contact@monalisabiohacking.com" className="hover:text-white transition-colors">
                                    contact@monalisabiohacking.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">{dict.info}</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href={`/${lang}/termeni-si-conditii`} className="text-zinc-400 hover:text-primary transition-colors">
                                    {dict.terms}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/politica-de-confidentialitate`} className="text-zinc-400 hover:text-primary transition-colors">
                                    {dict.privacy}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/politica-cookies`} className="text-zinc-400 hover:text-primary transition-colors">
                                    {dict.cookies}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/blog`} className="text-zinc-400 hover:text-primary transition-colors">
                                    {dict.blog_resources || "Blog & Resurse"}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-sm">
                    <p>© {new Date().getFullYear()} Monalisa Biohacking. {dict.rights}</p>
                    <p>
                        {dict.created_by || "Realizat de"}{" "}
                        <Link href="https://www.e-web.ro/" target="_blank" className="text-zinc-500 hover:text-primary transition-colors font-medium">
                            e-web.ro
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
