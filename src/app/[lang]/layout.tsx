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

import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: "Monalisa Orendt",
      url: "https://monalisabiohacking.com",
    },
  ],
  creator: "Monalisa Orendt",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@monalisabiohacking",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


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
