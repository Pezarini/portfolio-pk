"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";
import { journey } from "@/lib/content";

export function Journey() {
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

        <motion.ol
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative mt-16 border-l border-line pl-8 sm:pl-10"
        >
          {/* Glowing rail accent */}
          <span
            aria-hidden
            className="absolute -left-px top-0 h-full w-px bg-gradient-to-b from-accent/70 via-accent/20 to-transparent"
          />
          {journey.map((item, i) => (
            <motion.li
              key={`${item.org}-${i}`}
              variants={staggerItem}
              className="group relative pb-10 last:pb-0"
            >
              {/* Node */}
              <span className="absolute -left-[2.6rem] top-1 inline-flex h-3.5 w-3.5 items-center justify-center sm:-left-[3.1rem]">
                <span className="absolute inline-flex h-3.5 w-3.5 rounded-full border border-accent/40 bg-bg" />
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_var(--color-accent)] transition-transform duration-300 group-hover:scale-150" />
              </span>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="label-mono text-accent-bright">{item.year}</span>
                <span className="text-base font-semibold tracking-tight text-ink">
                  {item.org}
                </span>
                <span className="text-sm text-faint">·</span>
                <span className="text-sm text-muted">{item.title}</span>
              </div>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-faint transition-colors duration-300 group-hover:text-muted">
                {item.desc}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
