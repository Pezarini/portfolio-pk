"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium tracking-tight transition-colors duration-300 select-none whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none";

const sizes = {
  md: "h-11 px-5",
  lg: "h-12 px-6 text-[0.95rem]",
} as const;

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_8px_30px_-8px_var(--color-accent)] hover:bg-accent-bright",
  secondary:
    "border border-line-strong bg-white/[0.02] text-ink hover:border-accent/60 hover:bg-white/[0.05]",
  ghost: "text-muted hover:text-ink px-1",
};

/** Explicit prop set — keeps typings clean against framer-motion's element props. */
type ButtonProps = {
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
  /** trailing arrow that nudges on hover */
  arrow?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  arrow,
  href,
  target,
  rel,
  onClick,
  type = "button",
  disabled,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  function handleMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const classes = cn(base, sizes[size], variants[variant], className);

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {arrow && (
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            →
          </span>
        )}
      </span>
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </>
  );

  const shared = {
    className: classes,
    style: { x: sx, y: sy },
    onMouseMove: handleMove,
    onMouseLeave: reset,
    onClick,
    whileTap: reduce ? undefined : { scale: 0.97 },
    "aria-label": ariaLabel,
  } as const;

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        {...shared}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      {...shared}
    >
      {inner}
    </motion.button>
  );
}
