"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";
import type { Dictionary } from "@/lib/i18n";

type Item = Dictionary["experience"]["items"][number];

const DETAIL_TRANSITION = { duration: 0.2, ease: "easeOut" } as const;

/**
 * Desktop shows a split panel (timeline nav + detail); mobile shows an
 * accordion. Both render the same data. Only one is visible at a time (the
 * other is `display:none`), so the DOM repeats the text but users and screen
 * readers see it once.
 */
export function Journey({ d }: { d: Dictionary["experience"] }) {
  const [active, setActive] = useState(0);
  // -1 = everything collapsed in the mobile accordion
  const [openMobile, setOpenMobile] = useState(0);

  return (
    <section id="experience" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={d.eyebrow}
          title={
            <>
              {d.title[0]}
              <br className="hidden sm:block" /> {d.title[1]}
            </>
          }
          subtitle={d.subtitle}
        />

        {/* Desktop: split-panel */}
        <div className="mt-16 hidden lg:grid lg:grid-cols-[280px_1fr] lg:items-start lg:gap-16 xl:gap-20">
          <motion.ol
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative border-l border-line pl-8"
          >
            <span
              aria-hidden
              className="absolute -left-px top-0 h-full w-px bg-gradient-to-b from-accent/70 via-accent/20 to-transparent"
            />

            {d.items.map((item, i) => {
              const isActive = active === i;
              return (
                <motion.li key={`${item.org}-${item.period}`} variants={staggerItem} className="relative pb-8 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className="group w-full text-left"
                  >
                    <NodeDot active={isActive} />
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className={`label-mono ${isActive ? "text-accent-bright" : "text-accent-bright/70"}`}>
                        {item.period}
                      </span>
                    </div>
                    <span className={`mt-1 block text-sm font-semibold tracking-tight transition-colors duration-200 ${isActive ? "text-ink" : "text-muted group-hover:text-ink"}`}>
                      {item.org}
                    </span>
                    <p className={`mt-0.5 text-xs transition-colors duration-200 ${isActive ? "text-muted" : "text-faint group-hover:text-muted"}`}>
                      {item.title}
                    </p>
                  </button>
                </motion.li>
              );
            })}
          </motion.ol>

          <div className="sticky top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={DETAIL_TRANSITION}
              >
                <Detail item={d.items[active]} techLabel={d.technologiesLabel} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: accordion */}
        <motion.ol
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative mt-16 border-l border-line pl-8 lg:hidden"
        >
          <span
            aria-hidden
            className="absolute -left-px top-0 h-full w-px bg-gradient-to-b from-accent/70 via-accent/20 to-transparent"
          />
          {d.items.map((item, i) => {
            const opened = openMobile === i;
            return (
              <motion.li key={`m-${item.org}-${item.period}`} variants={staggerItem} className="relative pb-8 last:pb-0">
                <button
                  type="button"
                  onClick={() => setOpenMobile(opened ? -1 : i)}
                  aria-expanded={opened}
                  className="group w-full text-left"
                >
                  <NodeDot active={opened} />
                  <span className="label-mono block text-accent-bright/70">{item.period}</span>
                  <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className={`text-sm font-semibold tracking-tight transition-colors duration-200 ${opened ? "text-ink" : "text-muted group-hover:text-ink"}`}>
                      {item.org}
                    </span>
                    <span className="text-xs text-faint">·</span>
                    <span className="text-xs text-faint">{item.title}</span>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {opened && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="mt-4">
                        <Detail item={item} techLabel={d.technologiesLabel} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ol>
      </Container>
    </section>
  );
}

function NodeDot({ active }: { active: boolean }) {
  return (
    <span className="absolute -left-[2.6rem] top-1 inline-flex h-3.5 w-3.5 items-center justify-center">
      <span className="absolute inline-flex h-3.5 w-3.5 rounded-full border border-accent/40 bg-bg transition-colors duration-200" />
      <span
        className={`inline-flex h-1.5 w-1.5 rounded-full transition-all duration-200 ${
          active
            ? "bg-accent shadow-[0_0_10px_3px_var(--color-accent)] scale-125"
            : "bg-accent/40 shadow-[0_0_6px_1px_var(--color-accent)] group-hover:bg-accent group-hover:scale-125"
        }`}
      />
    </span>
  );
}

function Detail({ item, techLabel }: { item: Item; techLabel: string }) {
  return (
    <Card>
      <div className="flex flex-col gap-5 p-6 md:p-8">
        <div>
          <span className="label-mono text-accent-bright">{item.period}</span>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">{item.org}</h3>
          <p className="mt-1 text-sm text-muted">
            {item.title}
            {item.location ? ` · ${item.location}` : ""}
          </p>
        </div>
        <div className="hairline" />
        <ul className="flex flex-col gap-3">
          {item.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        {item.tech && item.tech.length > 0 && (
          <div>
            <span className="label-mono text-faint">{techLabel}</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tech.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
