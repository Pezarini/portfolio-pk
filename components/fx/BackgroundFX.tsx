/**
 * Atmospheric backdrop: slow-drifting electric-blue mesh blobs,
 * a fine grain overlay, and a top vignette. Pure CSS animations
 * (transform/opacity only) — pauses under prefers-reduced-motion.
 */
export function BackgroundFX() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg"
    >
      {/* Mesh blob — top */}
      <div
        className="absolute -top-[20%] left-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full opacity-70 blur-[120px] [animation:mesh-drift-a_22s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 38%, transparent), transparent 60%)",
        }}
      />
      {/* Mesh blob — right */}
      <div
        className="absolute top-[30%] -right-[10%] h-[42vmax] w-[42vmax] rounded-full opacity-50 blur-[120px] [animation:mesh-drift-b_26s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, #1ea0ff 32%, transparent), transparent 62%)",
        }}
      />
      {/* Mesh blob — bottom left */}
      <div
        className="absolute bottom-[-10%] left-[-8%] h-[40vmax] w-[40vmax] rounded-full opacity-40 blur-[130px] [animation:mesh-drift-a_30s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 28%, transparent), transparent 60%)",
        }}
      />

      {/* Faint grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-line-strong) 1px, transparent 1px), linear-gradient(90deg, var(--color-line-strong) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
        }}
      />

      {/* Grain */}
      <div className="grain absolute inset-0 opacity-[0.035] mix-blend-soft-light" />

      {/* Base darkening so content stays legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/70 to-bg" />
    </div>
  );
}
