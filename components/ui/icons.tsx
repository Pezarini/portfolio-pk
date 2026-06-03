import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Icon = {
  calendar: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" />
    </svg>
  ),
  cube: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 2.7 21 7.5v9L12 21.3 3 16.5v-9L12 2.7Z" />
      <path d="M3.3 7.6 12 12.3l8.7-4.7M12 12.3v9" />
    </svg>
  ),
  building: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3" />
    </svg>
  ),
  brain: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1.5 5.5A3 3 0 0 0 6 18a3 3 0 0 0 3 2.5V4Z" />
      <path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1.5 5.5A3 3 0 0 1 18 18a3 3 0 0 1-3 2.5V4Z" />
    </svg>
  ),
  ai: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="6" y="6" width="12" height="12" rx="2.5" />
      <path d="M9.5 14v-4l1.5 2 1.5-2v4M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </svg>
  ),
  backend: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" />
    </svg>
  ),
  frontend: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M9 21h6M12 17v4M9 8.5 11 11l-2 2.5M14 13h2.5" />
    </svg>
  ),
  architecture: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 2.7 21 7l-9 4.3L3 7l9-4.3Z" />
      <path d="m3 12 9 4.3L21 12M3 17l9 4.3L21 17" />
    </svg>
  ),
  cloud: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M7 18a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17.5 9.5 3.75 3.75 0 0 1 17 18H7Z" />
    </svg>
  ),
  testing: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M9 3v6L4.5 17.5A2 2 0 0 0 6.3 20.5h11.4a2 2 0 0 0 1.8-3L15 9V3M8 3h8M9.5 13h5" />
    </svg>
  ),
  pin: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  mail: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  ),
  linkedin: (p: IconProps) => (
    <svg {...base} {...p} strokeWidth={1.4}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7 10v7M7 7v.01M11.5 17v-4a2 2 0 0 1 4 0v4M11.5 13v4" />
    </svg>
  ),
  github: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.5 1.3a12 12 0 0 0-6.3 0C6.5 2.8 5.5 3.1 5.5 3.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  ),
  arrowUpRight: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  ),
  arrowRight: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  document: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  ),
  menu: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  close: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  mouse: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="8" y="3" width="8" height="14" rx="4" />
      <path d="M12 6.5v2" />
    </svg>
  ),
  sparkle: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5l2.5 2.5M16 16l2.5 2.5M18.5 5.5 16 8M8 16l-2.5 2.5" />
    </svg>
  ),
};

export type IconName = keyof typeof Icon;
