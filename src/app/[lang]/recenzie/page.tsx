import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReviewForm } from "@/components/sections/ReviewForm";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Recenzie | Monalisa Biohacking",
    robots: { index: false, follow: false },
};

export default async function ReviewPage(props: {
    params: Promise<{ lang: string }>;
    searchParams: Promise<{ token?: string }>;
}) {
    const { lang } = await props.params;
    const { token } = await props.searchParams;
    const dict = await getDictionary(lang as "ro" | "en" | "de");

    return (
        <main className="min-h-screen bg-background">
            <Navbar dict={dict.navbar} lang={lang} />
            <section className="pt-32 pb-32">
                <div className="container px-4 mx-auto max-w-xl">
                    <ReviewForm token={token || ""} lang={lang} />
                </div>
            </section>
            <Footer dict={dict.footer} lang={lang} />
        </main>
    );
}
