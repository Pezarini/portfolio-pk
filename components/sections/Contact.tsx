"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/icons";
import { reveal, staggerContainer, staggerItem, viewportOnce } from "@/lib/motion";
import { contact, site } from "@/lib/content";

const channels = [
  { icon: Icon.pin, label: "Localização", value: site.location, href: undefined },
  { icon: Icon.mail, label: "E-mail", value: site.email, href: `mailto:${site.email}` },
  { icon: Icon.linkedin, label: "LinkedIn", value: site.linkedin.label, href: site.linkedin.href },
  { icon: Icon.github, label: "GitHub", value: site.github.label, href: site.github.href },
] as const;

export function Contact() {
  const year = new Date().getFullYear();
  return (
    <footer id="contato" className="relative scroll-mt-24 pt-24 md:pt-32">
      {/* Glow accent above the contact block */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-px hairline"
      />
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <Eyebrow>{contact.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-5xl md:text-6xl">
              {contact.title}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              {contact.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href={`https://wa.me/${site.whatsappNumber}?text=Olá!%20Gostaria%20de%20agendar%20uma%20conversa.`}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                arrow
              >
                Agendar conversa
              </Button>
              <Button
                href={site.cvHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
              >
                Ver currículo
              </Button>
            </div>
          </motion.div>

          <motion.ul
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-1 gap-3 self-center sm:grid-cols-2"
          >
            {channels.map((c) => {
              const I = c.icon;
              const content = (
                <div className="flex items-start gap-3.5">
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.02] text-accent-bright transition-colors group-hover:border-accent/40">
                    <I />
                  </span>
                  <span className="min-w-0">
                    <span className="label-mono block text-faint">{c.label}</span>
                    <span className="mt-1 block truncate text-[0.95rem] text-ink">
                      {c.value}
                    </span>
                  </span>
                </div>
              );
              return (
                <motion.li key={c.label} variants={staggerItem}>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group block rounded-2xl border border-line bg-bg-elev/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-bg-elev/70"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="rounded-2xl border border-line bg-bg-elev/40 p-4">
                      {content}
                    </div>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-line py-8 sm:flex-row">
          <Logo />
          <p className="text-sm text-faint">
            © {year} {site.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2">
            {[
              { href: site.linkedin.href, I: Icon.linkedin, label: "LinkedIn" },
              { href: site.github.href, I: Icon.github, label: "GitHub" },
              { href: `mailto:${site.email}`, I: Icon.mail, label: "E-mail" },
            ].map(({ href, I, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-ink"
              >
                <I />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
