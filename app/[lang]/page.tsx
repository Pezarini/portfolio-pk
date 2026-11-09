import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Journey } from "@/components/sections/Journey";
import { Products } from "@/components/sections/Products";
import { Education } from "@/components/sections/Education";
import { Expertise } from "@/components/sections/Expertise";
import { Contact } from "@/components/sections/Contact";
import { getDictionary, hasLocale, localePath } from "@/lib/i18n";
import { mailto, site } from "@/lib/site";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.fullName,
    alternateName: site.name,
    url: `${site.url}${localePath(lang) === "/" ? "" : localePath(lang)}`,
    jobTitle: "Full Stack Engineer (backend-focused)",
    description: d.meta.description,
    email: mailto,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.countryCode,
    },
    sameAs: [site.linkedin.href, site.github.href],
    knowsAbout: [
      "Node.js",
      "TypeScript",
      "React",
      "NestJS",
      "LLM agents",
      "Tool calling",
      "OpenAI API",
      "Gemini API",
    ],
    knowsLanguage: ["pt", "en", "es"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Static, server-generated JSON; "<" is escaped to keep it inert inside the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Header lang={lang} nav={d.nav} d={d.header} />
      <main>
        <Hero d={d.hero} />
        <About d={d.about} />
        <Journey d={d.experience} />
        <Products d={d.work} />
        <Education d={d.education} />
        <Expertise d={d.skills} />
      </main>
      <Contact d={d.contact} homeLabel={d.header.homeLabel} />
    </>
  );
}
