"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * A subtle blended cursor ring (fine pointers only). Grows and brightens
 * over interactive elements. Disabled for touch and reduced-motion users.
 */
const FINE_POINTER = "(pointer: fine)";
function subscribeFinePointer(cb: () => void) {
  const mq = window.matchMedia(FINE_POINTER);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getFinePointer = () => window.matchMedia(FINE_POINTER).matches;

export function CustomCursor() {
  const reduce = useReducedMotion();
  const finePointer = useSyncExternalStore(subscribeFinePointer, getFinePointer, () => false);
  const enabled = finePointer && !reduce;
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    if (!enabled) return;

    function move(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const el = e.target as HTMLElement | null;
      setActive(
        !!el?.closest('a, button, [role="button"], input, [data-cursor="hover"]'),
      );
    }
    function leave() {
      setHidden(true);
    }
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x: sx, y: sy }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
        animate={{
          width: active ? 44 : 22,
          height: active ? 44 : 22,
          opacity: active ? 0.9 : 0.55,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      />
    </motion.div>
  );
}
