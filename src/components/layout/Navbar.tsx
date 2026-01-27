"use client";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NavbarProps {
    dict: any;
    lang: string;
}

export function Navbar({ dict, lang }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const pathname = usePathname();
    const router = useRouter();

    const switchLanguage = (newLang: string) => {
        if (!pathname) return;
        const segments = pathname.split("/");
        segments[1] = newLang; // replace locale
        const newPath = segments.join("/");
        router.push(newPath);
    };

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
            (scrolled || mobileMenuOpen) ? "bg-background/98 backdrop-blur-md border-border py-4" : "bg-transparent py-6"
        )}>
            <div className="container px-4 mx-auto flex items-center justify-between relative z-50">
                <Link href={`/${lang}`} className="text-2xl font-bold text-white tracking-tighter">
                    Monalisa<span className="text-primary">Biohacking</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {/* Navigation Links */}
                    <div className="flex items-center gap-6">
                        <Link href={`/${lang}/about`} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">{dict.about}</Link>
                        <Link href={`/${lang}/servicii`} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">{dict.services}</Link>
                        <Link href={`/${lang}/blog`} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">{dict.blog}</Link>
                    </div>

                    {/* Actions: Lang Switcher & Contact */}
                    <div className="flex items-center gap-6">
                        {/* Language Switcher */}
                        <div className="relative">
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                className="flex items-center gap-2 bg-zinc-800/80 backdrop-blur-md rounded-full px-4 py-2 border border-zinc-700/50 text-white text-xs font-bold hover:bg-zinc-700 transition-colors"
                            >
                                <span className="uppercase">{lang}</span>
                                <ChevronDown className={cn("w-3 h-3 transition-transform", langOpen && "rotate-180")} />
                            </button>

                            {langOpen && (
                                <div className="absolute top-full mt-2 right-0 bg-secondary/95 backdrop-blur-xl border border-border rounded-xl p-1.5 flex flex-col min-w-[80px] shadow-xl animate-in fade-in slide-in-from-top-2">
                                    {["ro", "en", "de"].map((l) => (
                                        <button
                                            key={l}
                                            onClick={() => {
                                                switchLanguage(l);
                                                setLangOpen(false);
                                            }}
                                            className={cn(
                                                "px-4 py-2 rounded-lg text-xs font-bold transition-all text-left uppercase hover:bg-white/10",
                                                lang === l ? "text-primary bg-primary/10" : "text-zinc-400"
                                            )}
                                        >
                                            {l}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link href={`/${lang}/contact`} className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-all shadow-lg hover:scale-105 active:scale-95">
                            {dict.contact}
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl md:hidden flex flex-col pt-32 px-6 animate-in slide-in-from-right duration-300">
                        <div className="flex flex-col gap-6 text-center">
                            <Link
                                href={`/${lang}/about`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-bold text-white hover:text-primary transition-colors"
                            >
                                {dict.about}
                            </Link>
                            <Link
                                href={`/${lang}/servicii`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-bold text-white hover:text-primary transition-colors"
                            >
                                {dict.services}
                            </Link>
                            <Link
                                href={`/${lang}/blog`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-bold text-white hover:text-primary transition-colors"
                            >
                                {dict.blog}
                            </Link>
                            <Link
                                href={`/${lang}/contact`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-bold text-white hover:text-primary transition-colors"
                            >
                                {dict.contact}
                            </Link>

                            <div className="h-px bg-zinc-800 w-full my-4" />

                            <div className="flex justify-center gap-4">
                                {["ro", "en", "de"].map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => {
                                            switchLanguage(l);
                                            setMobileMenuOpen(false);
                                        }}
                                        className={cn(
                                            "w-12 h-12 rounded-full font-bold transition-all uppercase border",
                                            lang === l
                                                ? "bg-primary text-black border-primary"
                                                : "bg-transparent text-zinc-400 border-zinc-700"
                                        )}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
