"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  className?: string;
  children: React.ReactNode;
  /** cursor-following radial spotlight on the border/surface */
  spotlight?: boolean;
  /** subtle hover lift */
  interactive?: boolean;
};

export function Card({
  className,
  children,
  spotlight = true,
  interactive = true,
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent) {
    if (!spotlight || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-line bg-bg-elev/70 backdrop-blur-sm transition-all duration-500 [--mx:50%] [--my:0%]",
        interactive &&
          "hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_60px_-30px_var(--color-accent)]",
        className,
      )}
    >
      {spotlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(380px circle at var(--mx) var(--my), color-mix(in oklab, var(--color-accent) 14%, transparent), transparent 60%)",
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
