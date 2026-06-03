"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Icon } from "@/components/ui/icons";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";
import { journey, productJourney, type JourneyItem, type ProductJourneyItem } from "@/lib/content";

type ActiveItem =
  | { kind: "corporate"; index: number }
  | { kind: "product"; index: number };

const DETAIL_TRANSITION = { duration: 0.2, ease: "easeOut" } as const;

export function Journey() {
  const [active, setActive] = useState<ActiveItem>({ kind: "corporate", index: journey.length - 1 });

  const activeItem =
    active.kind === "corporate" ? journey[active.index] : productJourney[active.index];

  return (
    <section id="jornada" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Minha jornada"
          title={
            <>
              Evolução constante.
              <br className="hidden sm:block" /> Aprendizado diário.
            </>
          }
          subtitle="Uma trajetória construída com foco em resolver problemas reais, criando soluções escaláveis e causando impacto."
        />

        {/* Desktop: split-panel */}
        <div className="mt-16 hidden lg:grid lg:grid-cols-[260px_1fr] lg:items-start lg:gap-16 xl:gap-20">
          {/* Left: timeline nav */}
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

            {journey.map((item, i) => {
              const isActive = active.kind === "corporate" && active.index === i;
              return (
                <motion.li key={`corp-${i}`} variants={staggerItem} className="relative pb-8 last:pb-0">
                  <button
                    onClick={() => setActive({ kind: "corporate", index: i })}
                    className="group w-full text-left"
                  >
                    <NodeDot active={isActive} />
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className={`label-mono ${isActive ? "text-accent-bright" : "text-accent-bright/60"}`}>
                        {item.year}
                      </span>
                      <span className={`text-sm font-semibold tracking-tight transition-colors duration-200 ${isActive ? "text-ink" : "text-muted group-hover:text-ink"}`}>
                        {item.org}
                      </span>
                    </div>
                    <p className={`mt-0.5 text-xs transition-colors duration-200 ${isActive ? "text-muted" : "text-faint group-hover:text-muted"}`}>
                      {item.title}
                    </p>
                  </button>
                </motion.li>
              );
            })}

            {/* Section divider */}
            <motion.li variants={staggerItem} className="relative py-6">
              <span
                aria-hidden
                className="absolute -left-[2.45rem] top-1/2 flex h-3.5 w-3.5 -translate-y-1/2 items-center justify-center"
              >
                <span className="h-3 w-3 rounded-sm border border-accent/50 bg-bg" />
              </span>
              <div className="flex items-center gap-3">
                <span className="label-mono text-accent-bright tracking-widest">Produtos próprios</span>
                <span className="h-px flex-1 bg-gradient-to-r from-accent/25 to-transparent" />
              </div>
            </motion.li>

            {productJourney.map((item, i) => {
              const isActive = active.kind === "product" && active.index === i;
              return (
                <motion.li key={`prod-${i}`} variants={staggerItem} className="relative pb-8 last:pb-0">
                  <button
                    onClick={() => setActive({ kind: "product", index: i })}
                    className="group w-full text-left"
                  >
                    <NodeDot active={isActive} />
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className={`label-mono ${isActive ? "text-accent-bright" : "text-accent-bright/60"}`}>
                        {item.year}
                      </span>
                      <span className={`text-sm font-semibold tracking-tight transition-colors duration-200 ${isActive ? "text-ink" : "text-muted group-hover:text-ink"}`}>
                        {item.name}
                      </span>
                    </div>
                    <p className={`mt-0.5 text-xs transition-colors duration-200 ${isActive ? "text-muted" : "text-faint group-hover:text-muted"}`}>
                      {item.category}
                    </p>
                  </button>
                </motion.li>
              );
            })}
          </motion.ol>

          {/* Right: detail panel */}
          <div className="sticky top-32">
            <AnimatePresence mode="wait">
              {active.kind === "corporate" ? (
                <motion.div
                  key={`c-${active.index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={DETAIL_TRANSITION}
                >
                  <CorporateDetail item={journey[active.index]} />
                </motion.div>
              ) : (
                <motion.div
                  key={`p-${active.index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={DETAIL_TRANSITION}
                >
                  <ProductDetail item={productJourney[active.index]} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: accordion */}
        <MobileAccordion defaultActive={active} onSelect={setActive} />
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

function CorporateDetail({ item }: { item: JourneyItem }) {
  return (
    <Card>
      <div className="flex flex-col gap-5 p-6 md:p-8">
        <div>
          <span className="label-mono text-accent-bright">{item.year}</span>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">{item.org}</h3>
          <p className="mt-1 text-sm text-muted">{item.title}</p>
        </div>
        <div className="hairline" />
        <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
        {item.tech && item.tech.length > 0 && (
          <div>
            <span className="label-mono text-faint">Tecnologias</span>
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

function ProductDetail({ item }: { item: ProductJourneyItem }) {
  return (
    <Card>
      <div className="flex flex-col gap-5 p-6 md:p-8">
        <div>
          <span className="label-mono text-accent-bright">{item.year}</span>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">{item.name}</h3>
          <p className="mt-1 label-mono text-faint">{item.category}</p>
        </div>
        <div className="hairline" />
        <div className="flex flex-col gap-4">
          <div>
            <span className="label-mono text-faint">Problema</span>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.problem}</p>
          </div>
          <div>
            <span className="label-mono text-faint">Solução</span>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.solution}</p>
          </div>
        </div>
        <div>
          <span className="label-mono text-faint">Stack</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.stack.map((t) => (
              <Tag key={t} variant="accent">{t}</Tag>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_2px_var(--color-accent)]" />
            <span className="text-xs text-muted">{item.status}</span>
          </div>
          {item.localUrl && (
            <a
              href={item.localUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-xs text-accent-bright transition-colors hover:text-ink"
            >
              Abrir projeto
              <Icon.arrowUpRight
                width={14}
                height={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}

function MobileAccordion({
  defaultActive,
  onSelect,
}: {
  defaultActive: ActiveItem;
  onSelect: (item: ActiveItem) => void;
}) {
  const [open, setOpen] = useState<ActiveItem>(defaultActive);

  const toggle = (item: ActiveItem) => {
    const isSame =
      open.kind === item.kind && open.index === item.index;
    const next = isSame ? { kind: "corporate" as const, index: -1 } : item;
    setOpen(next);
    if (!isSame) onSelect(item);
  };

  const isOpen = (item: ActiveItem) =>
    open.kind === item.kind && open.index === item.index;

  return (
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

      {journey.map((item, i) => {
        const key: ActiveItem = { kind: "corporate", index: i };
        const opened = isOpen(key);
        return (
          <motion.li key={`m-corp-${i}`} variants={staggerItem} className="relative pb-8">
            <button onClick={() => toggle(key)} className="group w-full text-left">
              <NodeDot active={opened} />
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="label-mono text-accent-bright/60">{item.year}</span>
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
                    <CorporateDetail item={item} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}

      {/* Divider */}
      <motion.li variants={staggerItem} className="relative py-4">
        <span
          aria-hidden
          className="absolute -left-[2.45rem] top-1/2 flex h-3.5 w-3.5 -translate-y-1/2 items-center justify-center"
        >
          <span className="h-3 w-3 rounded-sm border border-accent/50 bg-bg" />
        </span>
        <div className="flex items-center gap-3">
          <span className="label-mono text-accent-bright tracking-widest">Produtos próprios</span>
          <span className="h-px flex-1 bg-gradient-to-r from-accent/25 to-transparent" />
        </div>
      </motion.li>

      {productJourney.map((item, i) => {
        const key: ActiveItem = { kind: "product", index: i };
        const opened = isOpen(key);
        return (
          <motion.li key={`m-prod-${i}`} variants={staggerItem} className="relative pb-8 last:pb-0">
            <button onClick={() => toggle(key)} className="group w-full text-left">
              <NodeDot active={opened} />
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="label-mono text-accent-bright/60">{item.year}</span>
                <span className={`text-sm font-semibold tracking-tight transition-colors duration-200 ${opened ? "text-ink" : "text-muted group-hover:text-ink"}`}>
                  {item.name}
                </span>
                <span className="text-xs text-faint">·</span>
                <span className="text-xs text-faint">{item.category}</span>
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
                    <ProductDetail item={item} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </motion.ol>
  );
}
