export type IconName =
  | "calendar"
  | "cube"
  | "building"
  | "brain"
  | "ai"
  | "backend"
  | "frontend"
  | "architecture"
  | "cloud"
  | "testing"
  | "document"
  | "sparkle";

export type Dictionary = {
  /** BCP-47 tag for <html lang> and Open Graph. */
  htmlLang: string;
  ogLocale: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogAlt: string;
  };
  nav: { label: string; href: string }[];
  header: {
    resume: string;
    email: string;
    openMenu: string;
    closeMenu: string;
    homeLabel: string;
    langSwitch: { short: string; label: string; langAttr: string };
  };
  hero: {
    eyebrow: string;
    role: string;
    roleAccent: string;
    tagline: string;
    stack: string;
    availability: string;
    ctaEmail: string;
    ctaLinkedin: string;
    ctaResume: string;
    photoAlt: string;
    stats: { title: string; desc: string; icon: IconName }[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    highlights: string[];
    languagesLabel: string;
    languages: string;
  };
  experience: {
    eyebrow: string;
    title: [string, string];
    subtitle: string;
    technologiesLabel: string;
    items: {
      period: string;
      org: string;
      title: string;
      location?: string;
      bullets: string[];
      tech?: string[];
    }[];
  };
  work: {
    eyebrow: string;
    title: [string, string];
    subtitle: string;
    card: {
      category: string;
      name: string;
      problemLabel: string;
      problem: string;
      approachLabel: string;
      approach: string;
      resultLabel: string;
      result: string;
      tags: string[];
    };
  };
  education: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: {
      type: string;
      title: string;
      org: string;
      period: string;
      logo?: string;
    }[];
  };
  skills: {
    eyebrow: string;
    title: string;
    subtitle: string;
    groups: { title: string; icon: IconName; items: string[] }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    availability: string;
    ctaEmail: string;
    ctaLinkedin: string;
    ctaResume: string;
    locationLabel: string;
    location: string;
    emailLabel: string;
    linkedinLabel: string;
    githubLabel: string;
    rights: string;
  };
};
