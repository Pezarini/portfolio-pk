"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Icon } from "@/components/ui/icons";
import { reveal, staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";
import { education, udemyTopics } from "@/lib/content";

export function Education() {
  return (
    <section id="formacao" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Formação & Cursos"
          title="Credenciais e aprendizado contínuo."
          subtitle="Base acadêmica formal somada a uma rotina constante de estudo em tecnologias modernas."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {education.map((c) => (
            <motion.div key={c.title} variants={staggerItem} className="h-full">
              <Card className="h-full" spotlight={false}>
                <div className="flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white/[0.02] text-accent-bright">
                      <Icon.document width={18} height={18} />
                    </span>
                    <span className="label-mono text-faint">{c.year}</span>
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

        {/* Udemy / complementary courses */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-5 rounded-2xl border border-line bg-bg-elev/40 p-6 md:p-8"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <span className="label-mono text-accent-bright">
                Cursos complementares · Udemy
              </span>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Estudo contínuo em desenvolvimento, backend, frontend, IA,
                arquitetura e cloud para acompanhar a evolução do mercado.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:max-w-md md:justify-end">
              {udemyTopics.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
