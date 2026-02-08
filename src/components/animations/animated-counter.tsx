"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const counter = { value: from };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: to,
        duration,
        ease: "power2.out",
        snap: { value: 1 },
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
          }
        },
      });
    });

    return () => ctx.revert();
  }, [from, to, duration, suffix, prefix]);

  return (
    <span ref={ref} className={className}>
      {prefix}{from}{suffix}
    </span>
  );
}
