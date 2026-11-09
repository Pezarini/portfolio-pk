# Portfolio — Pedro Kelvin

Single-page portfolio for Pedro Kelvin, Full Stack Engineer (backend-focused),
building LLM agents with tool calling in production. English by default, with
a Brazilian Portuguese version.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (tokens via `@theme` in `app/globals.css`)
- **Framer Motion** (scroll reveals, magnetic buttons, custom cursor)
- **Geist** (Sans + Mono), no external fonts

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # production build
npm run start    # serve the build
```

## Internationalization

- English is the default and is served at `/`; Brazilian Portuguese lives at `/pt-br`.
- `proxy.ts` rewrites `/` to the internal `/en` route and redirects `/en` back to `/`.
- Routes live under `app/[lang]/`; `<html lang>`, canonical, `hreflang`, Open Graph
  and JSON-LD are generated per locale in `app/[lang]/layout.tsx` and `page.tsx`.

## Where to edit content

- Copy: `lib/i18n/en.ts` and `lib/i18n/pt-br.ts`. Both implement the `Dictionary`
  type in `lib/i18n/types.ts`, so the compiler flags a missing translation.
- Locale-independent facts (name, email, links, résumé path, site URL): `lib/site.ts`.
- Components are presentation-only and receive their slice of the dictionary as props.

## Assets

| What | Path |
|---|---|
| Hero photo | `public/hero/pedro-kelvin.png` |
| Résumé (PDF) | `public/cv/Pedro-Kelvin-Resume.pdf` |
| Open Graph image (1200×630) | `public/og.png` |
| Education logos | `public/logos/` |

## Content rules

Every claim on the site must match the verified profile. Anything not yet confirmed
is marked `TODO-OWNER` in the code.
