import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium tracking-tight transition-colors",
        variant === "accent"
          ? "border-accent/30 bg-accent/10 text-accent-bright"
          : "border-line-strong bg-white/[0.02] text-muted hover:border-accent/30 hover:text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
