import type { Variants, Transition } from "framer-motion";

const easeOutQuint = [0.16, 1, 0.3, 1] as const;

export const easing: Transition = {
  duration: 0.6,
  ease: easeOutQuint,
};

/** Single element reveal: fade + rise. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutQuint },
  },
};

/** Container that staggers its children's reveal. */
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Child used inside staggerContainer. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutQuint },
  },
};

/** Word/line reveal for headline staggering. */
export const lineReveal: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutQuint },
  },
};

/** Shared viewport config for whileInView. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
