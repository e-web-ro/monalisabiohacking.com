import { getDictionary } from "@/i18n/get-dictionary";
import { BookingSystem } from "@/components/sections/BookingSystem";

export default async function BookingPage({ params }: { params: Promise<{ lang: "ro" | "en" }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <BookingSystem dict={dict} lang={lang} />
    );
}
