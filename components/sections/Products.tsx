"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { reveal, viewportOnce } from "@/lib/motion";
import type { Dictionary } from "@/lib/i18n";

/**
 * Single case study, described in general terms on purpose: no client names,
 * screenshots, product links or product URLs.
 * TODO-OWNER: Sensetek has not yet authorized a public description of this
 * case. Confirm before keeping it live; remove this section if denied.
 */
export function Products({ d }: { d: Dictionary["work"] }) {
  const c = d.card;
  const blocks = [
    { label: c.problemLabel, text: c.problem },
    { label: c.approachLabel, text: c.approach },
    { label: c.resultLabel, text: c.result },
  ];

  return (
    <section id="work" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={d.eyebrow}
          title={
            <>
              {d.title[0]}
              <br className="hidden md:block" /> {d.title[1]}
            </>
          }
          subtitle={d.subtitle}
        />

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14"
        >
          <Card>
            <div className="flex flex-col gap-8 p-6 md:p-8">
              <div>
                <span className="label-mono text-faint">{c.category}</span>
                <h3 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                  {c.name}
                </h3>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {blocks.map((b) => (
                  <div key={b.label}>
                    <span className="label-mono text-accent-bright">{b.label}</span>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{b.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <Tag key={t} variant="accent">
                    {t}
                  </Tag>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
