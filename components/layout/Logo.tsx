import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export function Logo({ label, className }: { label: string; className?: string }) {
  return (
    <a
      href="#top"
      aria-label={label}
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
