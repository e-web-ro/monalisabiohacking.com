import { getDictionary } from "@/i18n/get-dictionary";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";

export default async function ServicesPage({ params }: { params: Promise<{ lang: "ro" | "en" }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className="min-h-screen bg-background">
            <Navbar dict={dict.navbar} lang={lang} />

            {/* Header */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/50 to-background border-b border-border">
                <div className="container px-4 mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Serviciile <span className="text-primary">Noastre</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Alege pachetul care se potrivește cel mai bine nevoilor tale actuale. Indiferent de alegere, primești expertiză 100% dedicată.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <ServicesGrid />

            <Footer dict={dict.footer} lang={lang} />
        </main>
    );
}
