"use client";

import { motion } from "framer-motion";
import { reveal, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center gap-2.5 text-accent-bright",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_2px_var(--color-accent)]" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-4xl md:text-[2.75rem]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </motion.div>
  );
}
