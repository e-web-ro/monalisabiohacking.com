import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";
import { FloatingContact } from "@/components/ui/floating-contact";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

// ... imports

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ro" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body
        className={`antialiased bg-background text-foreground ${outfit.variable}`}
      >
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
