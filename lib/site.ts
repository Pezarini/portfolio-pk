/**
 * Locale-independent facts. Everything here must match the verified profile;
 * localized copy lives in `lib/i18n/*`.
 */

export const site = {
  name: "Pedro Kelvin",
  fullName: "Pedro Kelvin Pezarini do Valle",
  initials: "PK",
  /** Deployed URL. TODO-OWNER: switch if/when pedrokelvin.dev is confirmed as yours. */
  url: "https://portfolio-pk-mauve.vercel.app",
  email: "pedrokelvin08601@gmail.com",
  linkedin: { label: "linkedin.com/in/pedro-kelvin", href: "https://linkedin.com/in/pedro-kelvin/" },
  github: { label: "github.com/Pezarini", href: "https://github.com/Pezarini" },
  cvHref: "/cv/Pedro-Kelvin-Resume.pdf",
  city: "Campinas",
  region: "SP",
  country: "Brazil",
  countryCode: "BR",
} as const;

export const mailto = `mailto:${site.email}`;
