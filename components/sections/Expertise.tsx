"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/icons";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";
import type { Dictionary } from "@/lib/i18n";

export function Expertise({ d }: { d: Dictionary["skills"] }) {
  return (
    <section id="skills" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={d.eyebrow}
          title={d.title}
          subtitle={d.subtitle}
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {d.groups.map((group) => {
            const I = Icon[group.icon];
            return (
              <motion.div key={group.title} variants={staggerItem} className="h-full">
                <Card className="h-full" spotlight>
                  <div className="flex h-full flex-col p-6">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white/[0.02] text-accent-bright transition-colors group-hover:border-accent/40">
                        <I width={18} height={18} />
                      </span>
                      <h3 className="text-base font-semibold tracking-tight text-ink">
                        {group.title}
                      </h3>
                    </div>

                    <ul className="mt-5 flex flex-col gap-2.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-ink"
                        >
                          <span className="h-1 w-1 rounded-full bg-accent/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
