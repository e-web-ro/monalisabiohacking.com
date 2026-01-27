import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="container px-4 mx-auto py-32 text-zinc-300 max-w-4xl">
                <h1 className="text-4xl font-bold text-white mb-8">Termeni și Condiții</h1>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">1. Introducere</h2>
                        <p>
                            Prezenții Termeni și Condiții definesc condițiile de utilizare a site-ului monalisabiohacking.com.
                            Prin accesarea sau utilizarea acestui site, acceptați acești termeni în totalitate.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">2. Serviciile Oferite</h2>
                        <p>
                            Monalisa Biohacking oferă servicii de consultanță în nutriție și biohacking.
                            Informațiile prezente pe site au scop informativ și educațional și nu înlocuiesc sfatul medical de specialitate.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">3. Proprietate Intelectuală</h2>
                        <p>
                            Conținutul acestui site (texte, imagini, logo-uri) este proprietatea Monalisa Biohacking și este protejat de legea drepturilor de autor.
                            Reproducerea, distribuirea sau utilizarea neautorizată este interzisă.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">4. Limitarea Răspunderii</h2>
                        <p>
                            Monalisa Biohacking nu își asumă răspunderea pentru daune directe sau indirecte rezultate din utilizarea informațiilor de pe acest site.
                            Rezultatele programelor pot varia de la o persoană la alta.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">5. Date de Contact</h2>
                        <p>
                            Pentru orice întrebări sau clarificări, ne puteți contacta la adresa de email contact@monalisabiohacking.com sau la adresa fizică: 71717 Beilstein, Germany.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
