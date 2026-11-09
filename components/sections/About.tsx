"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/icons";
import { reveal, staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";
import type { Dictionary } from "@/lib/i18n";

export function About({ d: about }: { d: Dictionary["about"] }) {
  return (
    <section id="about" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-5"
          >
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-4xl md:text-[2.75rem]">
              {about.title}
            </h2>

            <ul className="mt-8 flex flex-col gap-3">
              {about.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-sm text-muted">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-accent/30 bg-accent/10 text-accent-bright">
                    <Icon.sparkle width={13} height={13} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-muted">
              <span className="label-mono block text-faint">{about.languagesLabel}</span>
              <span className="mt-1.5 block">{about.languages}</span>
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-col gap-6 lg:col-span-7 lg:pt-2"
          >
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={staggerItem}
                className={
                  i === 0
                    ? "text-balance text-xl leading-relaxed text-ink/90 md:text-2xl"
                    : "max-w-2xl leading-relaxed text-muted"
                }
              >
                {p}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
