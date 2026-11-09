import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${site.url}/`, "pt-BR": `${site.url}/pt-br` };
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${site.url}/pt-br`, changeFrequency: "monthly", priority: 0.8, alternates: { languages } },
  ];
}
