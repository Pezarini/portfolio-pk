import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Providers } from "@/components/providers";
import { BackgroundFX } from "@/components/fx/BackgroundFX";
import { CustomCursor } from "@/components/fx/CustomCursor";
import { site } from "@/lib/content";

const siteUrl = "https://pedrokelvin.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Engenheiro de Software & Construtor de Produtos de IA`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    "Pedro Kelvin",
    "Engenheiro de Software",
    "AI Engineer",
    "AI Agents",
    "LLM",
    "Full Stack Developer",
    "Node.js",
    "TypeScript",
    "React",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    title: `${site.name} — Engenheiro de Software & Construtor de Produtos de IA`,
    description: site.tagline,
    siteName: site.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Engenheiro de Software & Construtor de Produtos de IA`,
    description: site.tagline,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#06070a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
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
