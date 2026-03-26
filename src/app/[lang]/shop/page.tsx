import { getDictionary } from "@/i18n/get-dictionary";
import { ShopSection } from "@/components/sections/ShopSection";

import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as "ro" | "en" | "de");

    return {
        title: `${dict.shop.title} | Monalisa Biohacking`,
        description: dict.shop.subtitle,
    };
}

export default async function ShopPage(props: { params: Promise<{ lang: string }> }) {
    const { lang } = await props.params;
    const dict = await getDictionary(lang as "ro" | "en" | "de");

    return (
        <ShopSection dict={dict} lang={lang} />
    );
}
