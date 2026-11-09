import { en } from "./en";
import { ptBR } from "./pt-br";
import type { Dictionary } from "./types";

export type { Dictionary, IconName } from "./types";

/** URL segment → dictionary. English is the default and is served at `/`. */
const dictionaries = {
  en,
  "pt-br": ptBR,
} as const satisfies Record<string, Dictionary>;

export type Locale = keyof typeof dictionaries;

export const locales = Object.keys(dictionaries) as Locale[];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale => value in dictionaries;

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

/** Public path for a locale: English lives at `/`, the rest under `/<locale>`. */
export const localePath = (locale: Locale) =>
  locale === defaultLocale ? "/" : `/${locale}`;
