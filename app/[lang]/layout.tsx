import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "../globals.css";
import { Providers } from "@/components/providers";
import { BackgroundFX } from "@/components/fx/BackgroundFX";
import { CustomCursor } from "@/components/fx/CustomCursor";
import { site } from "@/lib/site";
import { getDictionary, hasLocale, localePath, locales } from "@/lib/i18n";

type LayoutParams = { params: Promise<{ lang: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDictionary(lang);
  const url = localePath(lang);

  return {
    metadataBase: new URL(site.url),
    title: { default: d.meta.title, template: `%s — ${site.name}` },
    description: d.meta.description,
    keywords: d.meta.keywords,
    authors: [{ name: site.fullName }],
    alternates: {
      canonical: url,
      languages: { en: "/", "pt-BR": "/pt-br", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      locale: d.ogLocale,
      url,
      title: d.meta.title,
      description: d.meta.description,
      siteName: site.name,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: d.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: d.meta.title,
      description: d.meta.description,
      images: [{ url: "/og.png", alt: d.meta.ogAlt }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#06070a",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode } & LayoutParams>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={getDictionary(lang).htmlLang}
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <Providers>
          <BackgroundFX />
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
