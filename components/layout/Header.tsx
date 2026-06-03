"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto mt-3 flex h-14 max-w-6xl items-center justify-between rounded-full px-4 transition-all duration-500 md:mt-4 md:px-5",
          scrolled
            ? "border border-line bg-bg/70 shadow-[0_8px_40px_-20px_#000] backdrop-blur-xl"
            : "border border-transparent",
        )}
        style={{ width: "calc(100% - 1.5rem)" }}
      >
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            href={site.cvHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="h-10 px-4"
          >
            Currículo
          </Button>
          <Button href="#contato" variant="primary" arrow className="h-10 px-4">
            Vamos conversar
          </Button>
        </div>

        {/* Mobile / tablet toggle */}
        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent/50 lg:hidden"
        >
          <Icon.menu />
        </button>
      </div>

      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-bg/95 backdrop-blur-xl" />
          <div className="relative flex h-dvh flex-col p-6">
            <div className="flex h-14 items-center justify-between">
              <Logo />
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
              >
                <Icon.close />
              </button>
            </div>

            <nav className="mt-8 flex flex-col">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="flex items-center justify-between border-b border-line py-4 text-2xl font-medium tracking-tight text-ink"
                >
                  {item.label}
                  <span className="label-mono text-faint">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3 pt-8">
              <Button
                href={site.cvHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={onClose}
              >
                Ver currículo
              </Button>
              <Button
                href="#contato"
                variant="primary"
                size="lg"
                arrow
                className="w-full"
                onClick={onClose}
              >
                Vamos conversar
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
