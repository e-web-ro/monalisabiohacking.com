import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";
import { FloatingContact } from "@/components/ui/floating-contact";

import { getDictionary } from "@/i18n/get-dictionary";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export async function generateStaticParams() {
  return [{ lang: "ro" }, { lang: "en" }, { lang: "de" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);

  return (
    <html lang={lang}>
      <body
        className={`antialiased bg-background text-foreground ${outfit.variable}`}
      >
        {children}
        <FloatingContact dict={dict} lang={lang} />
      </body>
    </html>
  );
}
