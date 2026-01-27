import { getDictionary } from "@/i18n/get-dictionary";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ContactFormSection } from "@/components/sections/ContactFormSection";

export default async function ContactPage({ params }: { params: Promise<{ lang: "ro" | "en" }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className="min-h-screen bg-background">
            <Navbar dict={dict.navbar} lang={lang} />

            {/* Header */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/50 to-background border-b border-border">
                <div className="container px-4 mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Contactează <span className="text-primary">Monalisa</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Ești gata să începi transformarea? Scrie-mi și hai să construim împreună cel mai bun plan pentru sănătatea ta.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <ContactFormSection />

            <Footer dict={dict.footer} lang={lang} />
        </main>
    );
}
