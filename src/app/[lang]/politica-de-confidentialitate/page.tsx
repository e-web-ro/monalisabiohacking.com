import { getDictionary } from "@/i18n/get-dictionary";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default async function PrivacyPage({ params }: { params: Promise<{ lang: "ro" | "en" }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className="min-h-screen bg-background">
            <Navbar dict={dict.navbar} lang={lang} />
            <div className="container px-4 mx-auto py-32 text-zinc-300 max-w-4xl">
                <h1 className="text-4xl font-bold text-white mb-8">Politica de Confidențialitate</h1>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">1. Colectarea Datelor</h2>
                        <p>
                            Respectăm confidențialitatea vizitatorilor noștri. Colectăm date personale (nume, email, telefon) doar atunci când sunt oferite voluntar prin formularele de contact sau programare.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">2. Utilizarea Datelor</h2>
                        <p>
                            Datele colectate sunt utilizate exclusiv pentru:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Comunicarea cu dumneavoastră referitor la serviciile solicitate.</li>
                            <li>Programarea sesiunilor de consultanță.</li>
                            <li>Trimiterea de informații relevante (dacă v-ați abonat la newsletter).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">3. Protecția Datelor</h2>
                        <p>
                            Nu vindem, nu închiriem și nu divulgăm datele dumneavoastră personale către terți, cu excepția cazurilor prevăzute de lege sau necesare pentru prestarea serviciilor.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">4. Drepturile Dumneavoastră</h2>
                        <p>
                            Conform GDPR, aveți dreptul de a solicita accesul, rectificarea sau ștergerea datelor dumneavoastră personale. Pentru exercitarea acestor drepturi, vă rugăm să ne contactați la contact@monalisabiohacking.com.
                        </p>
                    </section>
                </div>
            </div>
            <Footer dict={dict.footer} lang={lang} />
        </main>
    );
}
