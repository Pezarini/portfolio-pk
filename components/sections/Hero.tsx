"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { lineReveal, staggerContainer, staggerItem } from "@/lib/motion";
import { mailto, site } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";

export function Hero({ d }: { d: Dictionary["hero"] }) {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh scroll-mt-24 items-center overflow-hidden pb-16 pt-28 md:pt-32"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:items-stretch lg:gap-x-14">
          {/* ---- A: headline ---- */}
          <motion.div
            variants={staggerContainer(0.12, 0.05)}
            initial="hidden"
            animate="show"
            className="order-1 lg:col-start-1 lg:row-start-1"
          >
            <motion.span
              variants={staggerItem}
              className="label-mono inline-flex items-center gap-2.5 text-accent-bright"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_2px_var(--color-accent)]" />
              {d.eyebrow}
            </motion.span>

            <h1 className="mt-5 overflow-hidden text-balance text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl">
              <motion.span variants={lineReveal} className="block text-ink">
                {site.name}
                <span className="text-accent">.</span>
              </motion.span>
            </h1>

            <motion.h2
              variants={staggerItem}
              className="mt-6 max-w-xl text-balance text-xl font-medium leading-snug text-ink/90 sm:text-2xl"
            >
              {d.role} <span className="text-accent-gradient">{d.roleAccent}</span>
            </motion.h2>

            <motion.p
              variants={staggerItem}
              className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg"
            >
              {d.tagline}
            </motion.p>

            <motion.p variants={staggerItem} className="label-mono mt-4 max-w-md text-faint">
              {d.stack}
            </motion.p>

            <motion.p
              variants={staggerItem}
              className="mt-5 flex max-w-md items-start gap-2.5 text-sm leading-snug text-ink/80"
            >
              <Icon.pin width={16} height={16} className="mt-0.5 shrink-0 text-accent-bright" />
              {d.availability}
            </motion.p>
          </motion.div>

          {/* ---- B: photo (dominant, frameless) ---- */}
          <div className="order-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-stretch">
            <HeroPhoto alt={d.photoAlt} />
          </div>

          {/* ---- C: CTAs + stats strip ---- */}
          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            animate="show"
            className="order-3 lg:col-start-1 lg:row-start-2 lg:self-end"
          >
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap items-center gap-3"
            >
              <Button href={mailto} variant="primary" size="lg" arrow>
                {d.ctaEmail}
              </Button>
              <Button
                href={site.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
              >
                {d.ctaLinkedin}
              </Button>
              <Button
                href={site.cvHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="lg"
              >
                {d.ctaResume}
              </Button>
            </motion.div>

            <motion.div variants={staggerItem} className="mt-8 h-px w-full hairline" />

            <StatsStrip stats={d.stats} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

const PHOTO_MASK =
  "radial-gradient(72% 82% at 58% 38%, #000 56%, transparent 92%)";

function HeroPhoto({ alt }: { alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="relative mx-auto h-[56vh] min-h-[400px] w-full max-w-lg lg:h-full lg:min-h-[34rem] lg:max-w-none"
    >
      {/* Glow behind the subject */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 scale-110 blur-3xl [animation:glow-pulse_6s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(70% 70% at 58% 40%, color-mix(in oklab, var(--color-accent) 55%, transparent), transparent 70%)",
        }}
      />
      <Image
        src="/hero/pedro-kelvin.png"
        alt={alt}
        fill
        priority
        sizes="(max-width: 1024px) 90vw, 620px"
        className="object-cover"
        style={{
          objectPosition: "center 18%",
          WebkitMaskImage: PHOTO_MASK,
          maskImage: PHOTO_MASK,
        }}
      />
      {/* Blend the base into the dark / stats strip */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />
    </motion.div>
  );
}

/** Verifiable, text-only facts (no counters: the SSR HTML must never show a zero). */
function StatsStrip({ stats }: { stats: Dictionary["hero"]["stats"] }) {
  return (
    <motion.ul
      variants={staggerContainer(0.08, 0.1)}
      initial="hidden"
      animate="show"
      className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 min-[420px]:grid-cols-2"
    >
      {stats.map((s) => {
        const I = Icon[s.icon];
        return (
          <motion.li key={s.title} variants={staggerItem}>
            <div className="flex items-start gap-2 text-base font-semibold leading-tight tracking-tight text-ink">
              <I width={16} height={16} className="mt-0.5 shrink-0 text-accent-bright" />
              <span>{s.title}</span>
            </div>
            <p className="mt-1.5 text-xs leading-tight text-faint">{s.desc}</p>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
