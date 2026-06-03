import { cn } from "@/lib/utils";
import { site } from "@/lib/content";

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#inicio"
      aria-label={`${site.name} — início`}
      className={cn(
        "group inline-flex items-baseline text-lg font-semibold tracking-tight text-ink transition-colors",
        className,
      )}
    >
      <span className="transition-colors group-hover:text-accent-bright">
        {site.initials}
      </span>
      <span className="text-accent">.</span>
    </a>
  );
}
