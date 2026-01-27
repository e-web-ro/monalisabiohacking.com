import { getDictionary } from "@/i18n/get-dictionary";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default async function CookiesPage({ params }: { params: Promise<{ lang: "ro" | "en" }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className="min-h-screen bg-background">
            <Navbar dict={dict.navbar} lang={lang} />
            <div className="container px-4 mx-auto py-32 text-zinc-300 max-w-4xl">
                <h1 className="text-4xl font-bold text-white mb-8">Politica de Cookies</h1>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">Ce sunt cookie-urile?</h2>
                        <p>
                            Cookie-urile sunt fișiere mici de text stocate pe dispozitivul dumneavoastră când vizitați site-ul nostru. Acestea ne ajută să îmbunătățim experiența de navigare.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">Tipuri de Cookies folosite</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li><strong>Esențiale:</strong> Necesare pentru funcționarea corectă a site-ului.</li>
                            <li><strong>Analitice:</strong> Ne ajută să înțelegem cum vizitatorii interacționează cu site-ul (ex. Google Analytics).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">Controlul Cookies</h2>
                        <p>
                            Puteți controla sau șterge cookie-urile prin setările browserului dumneavoastră. Vă rugăm să rețineți că dezactivarea cookie-urilor esențiale poate afecta funcționalitatea site-ului.
                        </p>
                    </section>
                </div>
            </div>
            <Footer dict={dict.footer} lang={lang} />
        </main>
    );
}
