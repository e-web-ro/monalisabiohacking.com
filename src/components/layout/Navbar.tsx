"use client";
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
            scrolled ? "bg-background/80 backdrop-blur-md border-border py-4" : "bg-transparent py-6"
        )}>
            <div className="container px-4 mx-auto flex items-center justify-between">
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
                        <div className="flex items-center bg-zinc-800/80 backdrop-blur-md rounded-full p-1.5 border border-zinc-700/50">
                            <button
                                onClick={() => switchLanguage("ro")}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-xs font-bold transition-all min-w-[40px]",
                                    lang === "ro" ? "bg-primary text-black shadow-sm" : "text-zinc-400 hover:text-white"
                                )}
                            >
                                RO
                            </button>
                            <button
                                onClick={() => switchLanguage("en")}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-xs font-bold transition-all min-w-[40px]",
                                    lang === "en" ? "bg-primary text-black shadow-sm" : "text-zinc-400 hover:text-white"
                                )}
                            >
                                EN
                            </button>
                        </div>

                        <Link href={`/${lang}/contact`} className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-all shadow-lg hover:scale-105 active:scale-95">
                            {dict.contact}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
