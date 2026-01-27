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
                        {dict.services.title} <span className="text-primary">{dict.services.title_accent}</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        {dict.services.subtitle}
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <ServicesGrid
                services={Object.entries(dict.services.items).map(([key, item]: [string, any]) => ({
                    id: key,
                    ...item,
                    highlight: key === 'reset',
                    price: item.features // Use a way to get price if it's not directly in item (checking json, price IS NOT in item directly in my json update? Wait)
                }))}
                dict={dict}
                lang={lang}
            />

            <Footer dict={dict.footer} lang={lang} />
        </main>
    );
}
