import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { About } from "@/components/sections/About";
import { WhyChooseMe } from "@/components/sections/WhyChooseMe";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Footer } from "@/components/layout/Footer";

export default async function Home({ params }: { params: Promise<{ lang: "ro" | "en" | "de" }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <Navbar dict={dict.navbar} lang={lang} />
      <Hero dict={dict.hero} lang={lang} />
      <About dict={dict.about} lang={lang} />
      <WhyChooseMe dict={dict.why_choose} lang={lang} />
      <Services dict={dict.services} lang={lang} />
      <Features dict={dict.features} lang={lang} />
      <Testimonials dict={dict.testimonials} lang={lang} />
      <BlogPreview dict={dict.blog} lang={lang} />
      <Footer dict={dict.footer} lang={lang} />
    </main>
  );
}
