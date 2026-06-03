"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/icons";
import { lineReveal, staggerContainer, staggerItem } from "@/lib/motion";
import { authorityStats, site } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-dvh scroll-mt-24 items-center overflow-hidden pb-16 pt-28 md:pt-32"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* ---- Left: copy ---- */}
          <motion.div
            variants={staggerContainer(0.12, 0.05)}
            initial="hidden"
            animate="show"
          >
            <motion.span
              variants={staggerItem}
              className="label-mono inline-flex items-center gap-2.5 text-accent-bright"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_2px_var(--color-accent)]" />
              Olá, eu sou
            </motion.span>

            <h1 className="mt-5 overflow-hidden text-balance text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl">
              <motion.span variants={lineReveal} className="block text-ink">
                {site.name}
                <span className="text-accent">.</span>
              </motion.span>
            </h1>

            <motion.h2
              variants={staggerItem}
              className="mt-6 max-w-xl text-balance text-xl font-medium leading-snug text-ink/90 sm:text-2xl"
            >
              Engenheiro de Software, Especialista em{" "}
              <span className="text-accent-gradient">IA</span> e Construtor de
              Produtos.
            </motion.h2>

            <motion.p
              variants={staggerItem}
              className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg"
            >
              {site.tagline}
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button href="#produtos" variant="primary" size="lg" arrow>
                Ver produtos &amp; cases
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
              <Button href="#contato" variant="ghost" size="lg" arrow>
                Vamos conversar
              </Button>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="mt-12 hidden items-center gap-2.5 text-faint sm:flex"
            >
              <span className="inline-flex h-7 w-5 items-start justify-center rounded-full border border-line-strong pt-1.5">
                <motion.span
                  className="h-1.5 w-0.5 rounded-full bg-accent-bright"
                  animate={{ y: [0, 5, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
              <span className="label-mono">Scroll para explorar</span>
            </motion.div>
          </motion.div>

          {/* ---- Right: photo + authority cards ---- */}
          <div className="flex flex-col items-stretch gap-5 sm:flex-row sm:items-center lg:gap-6">
            <HeroPhoto />
            <AuthorityCards />
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroPhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="relative mx-auto w-full max-w-md sm:flex-1"
    >
      {/* Glow behind — centrado atrás do rosto/torso */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 translate-y-6 scale-110 rounded-[2rem] blur-3xl [animation:glow-pulse_6s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(65% 65% at 50% 35%, color-mix(in oklab, var(--color-accent) 55%, transparent), transparent 70%)",
        }}
      />
      <div className="relative aspect-[2/3] overflow-hidden rounded-[1.75rem] border border-line-strong bg-bg-elev">
        <Image
          src="/hero/pedro-kelvin.png"
          alt={`${site.name}, Engenheiro de Software e construtor de produtos de IA`}
          fill
          priority
          sizes="(max-width: 1024px) 80vw, 448px"
          className="object-cover"
          style={{ objectPosition: "center 15%" }}
        />
        {/* Blend suave das bordas no tema dark */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/5" />
      </div>
    </motion.div>
  );
}

function AuthorityCards() {
  const icons = {
    calendar: Icon.calendar,
    cube: Icon.cube,
    building: Icon.building,
    brain: Icon.brain,
  };
  return (
    <motion.ul
      variants={staggerContainer(0.1, 0.5)}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-3 sm:flex sm:w-[15rem] sm:flex-col lg:w-[16.5rem]"
    >
      {authorityStats.map((s) => {
        const I = icons[s.icon];
        return (
          <motion.li
            key={s.title}
            variants={staggerItem}
            className="group rounded-2xl border border-line bg-bg-elev/60 p-3.5 backdrop-blur-sm transition-colors duration-300 hover:border-accent/40"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white/[0.02] text-accent-bright transition-colors group-hover:border-accent/40">
              <I width={18} height={18} />
            </span>
            <p className="mt-3 text-lg font-semibold leading-none tracking-tight text-ink">
              {s.value !== null ? (
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              ) : (
                s.title
              )}
            </p>
            <p className="mt-1.5 text-[0.8rem] leading-tight text-muted">
              {s.value !== null ? s.title : s.desc}
            </p>
            {s.value !== null && (
              <p className="text-[0.8rem] leading-tight text-faint">{s.desc}</p>
            )}
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
