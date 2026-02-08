export const EASE = {
  smooth: "power3.out",
  smoothInOut: "power3.inOut",
  snappy: "power4.out",
  bounce: "back.out(1.7)",
  elastic: "elastic.out(1, 0.5)",
  expo: "expo.out",
  expoInOut: "expo.inOut",
} as const;

export const DURATION = {
  fast: 0.4,
  normal: 0.8,
  slow: 1.2,
  xslow: 2.0,
} as const;

export const STAGGER = {
  fast: 0.02,
  normal: 0.05,
  slow: 0.1,
  chars: 0.03,
} as const;

export const SCROLL_TRIGGER = {
  default: { start: "top 85%", end: "bottom 20%" },
  mid: { start: "top 70%", end: "bottom 30%" },
  hero: { start: "top top", end: "bottom top" },
  pin: { start: "top top", end: "+=100%", pin: true },
  scrub: { start: "top bottom", end: "bottom top", scrub: true },
} as const;
