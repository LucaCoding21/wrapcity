"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  itemSelector?: string;
}

export default function StaggerGrid({
  children,
  className,
  stagger = 0.1,
  itemSelector = "[data-grid-item]",
}: StaggerGridProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const items = ref.current.querySelectorAll(itemSelector);
    if (!items.length) return;

    gsap.set(items, { y: 60, opacity: 0 });

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(items, {
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger,
            ease: "power3.out",
          });
        },
        start: "top 85%",
        once: true,
      });
    }, ref);

    return () => ctx.revert();
  }, [stagger, itemSelector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
