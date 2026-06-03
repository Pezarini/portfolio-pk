"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";
import { experiences } from "@/lib/content";

export function Experience() {
  return (
    <section id="experiencia" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Experiência corporativa"
          title="Impacto dentro das empresas."
          subtitle="Sistemas enterprise, plataformas em produção e agentes de IA construídos em times de tecnologia."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {experiences.map((exp) => (
            <motion.div key={exp.company} variants={staggerItem} className="h-full">
              <Card className="h-full">
                <div className="flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold tracking-tight text-ink">
                      {exp.company}
                    </span>
                    <span className="label-mono text-accent-bright">
                      {exp.role}
                    </span>
                  </div>

                  <div className="mt-4 h-px w-full hairline" />

                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {exp.description}
                  </p>

                  <div className="mt-auto pt-6">
                    <span className="label-mono text-faint">Tecnologias</span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
