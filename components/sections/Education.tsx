"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Icon } from "@/components/ui/icons";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";
import type { Dictionary } from "@/lib/i18n";

export function Education({ d }: { d: Dictionary["education"] }) {
  return (
    <section id="education" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={d.eyebrow}
          title={d.title}
          subtitle={d.subtitle}
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {d.items.map((c) => (
            <motion.div key={`${c.org}-${c.title}`} variants={staggerItem} className="h-full">
              <Card className="h-full" spotlight={false}>
                <div className="flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    {c.logo ? (
                      <div className="flex h-10 w-10 items-center justify-center opacity-80 transition-opacity duration-200 hover:opacity-100">
                        <Image src={c.logo} alt={c.org} width={40} height={40} className="object-contain" />
                      </div>
                    ) : (
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white/[0.02] text-accent-bright">
                        <Icon.document width={18} height={18} />
                      </span>
                    )}
                    <span className="label-mono text-faint">{c.period}</span>
                  </div>
                  <Tag variant="accent" className="mt-5 w-fit">
                    {c.type}
                  </Tag>
                  <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{c.org}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
