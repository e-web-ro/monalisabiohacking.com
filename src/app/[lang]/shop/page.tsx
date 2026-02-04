import { getDictionary } from "@/i18n/get-dictionary";
import { ShopSection } from "@/components/sections/ShopSection";

export const dynamic = 'force-dynamic';

export default async function ShopPage(props: { params: Promise<{ lang: string }> }) {
    const { lang } = await props.params;
    const dict = await getDictionary(lang as "ro" | "en" | "de");

    return (
        <ShopSection dict={dict} lang={lang} />
    );
}
