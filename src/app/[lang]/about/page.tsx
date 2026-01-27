import { getDictionary } from "@/i18n/get-dictionary";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { WhyChooseMe } from "@/components/sections/WhyChooseMe";
import Image from "next/image";

export default async function AboutPage({ params }: { params: Promise<{ lang: "ro" | "en" }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className="min-h-screen bg-background">
            <Navbar dict={dict.navbar} lang={lang} />

            {/* Header */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/50 to-background border-b border-border">
                <div className="container px-4 mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Despre <span className="text-primary">Monalisa</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Nu este doar despre nutriție. Este despre a-ți redescoperi potențialul și a trăi viața la capacitate maximă.
                    </p>
                </div>
            </section>

            {/* Main Content reusing components */}
            <About dict={dict.about} lang={lang} />
            <WhyChooseMe dict={dict.why_choose} lang={lang} />

            {/* Additional Biography/Story Section if needed, for now standard components are quite rich */}
            <section className="py-24 bg-background relative overflow-hidden">
                <div className="container px-4 mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">Pasiunea mea pentru Biohacking</h2>
                    <div className="space-y-6 text-lg text-zinc-300 leading-relaxed">
                        <p>
                            Călătoria mea nu a început într-un cabinet, ci prin propria mea experiență de transformare.
                            Am înțeles că medicina convențională tratează simptomele, dar adevărata vindecare vine din adresarea cauzelor profunde.
                        </p>
                        <p>
                            De-a lungul anilor, am studiat intens biochimia, hormonii și impactul stilului de viață asupra longevității.
                            Biohacking-ul nu este despre a deveni un robot, ci despre a folosi știința și tehnologia pentru a fi mai uman, mai prezent și mai energic.
                        </p>
                        <p>
                            Astăzi, misiunea mea este să împărtășesc aceste cunoștințe cu tine. Să te ghidez printr-un proces clar, structurat și empatic,
                            astfel încât să nu mai pierzi timp cu diete care nu funcționează și să începi să trăiești cu adevărat.
                        </p>
                    </div>

                    <div className="mt-12">
                        <Image
                            src="/monalisa.png"
                            alt="Monalisa Biohacking Portrait"
                            width={150}
                            height={150}
                            className="rounded-full mx-auto border-4 border-primary/20 shadow-xl mb-4 object-cover"
                        />
                        <p className="text-white font-serif italic text-xl">Cu drag, Monalisa</p>
                    </div>
                </div>
            </section>

            <Footer dict={dict.footer} lang={lang} />
        </main>
    );
}
