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

    const mobile = window.innerWidth < 768;
    const items = ref.current.querySelectorAll(itemSelector);
    if (!items.length) return;

    const yOffset = mobile ? 30 : 60;
    gsap.set(items, { y: yOffset, opacity: 0 });

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(items, {
        onEnter: (batch) => {
          // On mobile, cap animated items to 6 — rest snap into place
          const animBatch = mobile ? batch.slice(0, 6) : batch;
          const restBatch = mobile ? batch.slice(6) : [];

          gsap.to(animBatch, {
            y: 0,
            opacity: 1,
            duration: mobile ? 0.5 : 0.8,
            stagger: mobile ? 0.06 : stagger,
            ease: mobile ? "power2.out" : "power3.out",
          });

          if (restBatch.length > 0) {
            gsap.set(restBatch, { y: 0, opacity: 1 });
          }
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
