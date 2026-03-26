import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { FloatingContact } from "@/components/ui/floating-contact";

import { getDictionary } from "@/i18n/get-dictionary";

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

import { siteConfig } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ lang: "ro" | "en" | "de" }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  // Remove language prefix if present (e.g. /ro/servicii -> /servicii)
  const pathWithoutLang = pathname.replace(/^\/[a-z]{2}/, "") || "";

  const title = dict.metadata?.title || siteConfig.name;
  const description = dict.metadata?.description || siteConfig.description;
  const keywords = dict.metadata?.keywords || siteConfig.keywords;

  const baseUrl = siteConfig.url;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description: description,
    keywords: keywords,
    authors: [
      {
        name: "Monalisa Orendt",
        url: "https://monalisabiohacking.com",
      },
    ],
    creator: "Monalisa Orendt",
    openGraph: {
      type: "website",
      locale: lang === "ro" ? "ro_RO" : lang === "de" ? "de_DE" : "en_US",
      url: `${baseUrl}/${lang}${pathWithoutLang}`,
      title: title,
      description: description,
      siteName: dict.metadata?.og?.siteName || siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [siteConfig.ogImage],
      creator: "@monalisabiohacking",
    },
    alternates: {
      canonical: `${baseUrl}/${lang}${pathWithoutLang}`,
      languages: {
        'ro': `${baseUrl}/ro${pathWithoutLang}`,
        'en': `${baseUrl}/en${pathWithoutLang}`,
        'de': `${baseUrl}/de${pathWithoutLang}`,
      },
      // x-default should point to the default language version or a language selector
      // Generally x-default points to the generic version (e.g. no lang prefix if redirected) or the main language.
      // If root redirects to /ro, then x-default might be /ro or just /
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
}


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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Monalisa Orendt",
    "url": `${siteConfig.url}/${lang}`,
    "image": `${siteConfig.url}/monalisa-v2.png`,
    "description": dict.metadata?.description || siteConfig.description,
    "jobTitle": lang === "ro" ? "Consilier în Nutriție Funcțională & Biohacking" : "Functional Nutrition & Biohacking Counselor",
    "sameAs": [
      siteConfig.links.twitter,
      "https://instagram.com/monalisaorendt", // Example IG if exists, keeping others generic
      siteConfig.links.tiktok
    ],
    "workLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Beilstein",
        "addressCountry": "Germany"
      }
    }
  };

  return (
    <html lang={lang}>
      <body
        className={`antialiased bg-background text-foreground ${outfit.variable}`}
      >
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <FloatingContact dict={dict} lang={lang} />
      </body>
    </html>
  );
}
