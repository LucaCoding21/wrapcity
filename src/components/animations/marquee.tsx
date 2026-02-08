"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export default function Marquee({
  children,
  speed = 50,
  direction = "left",
  className,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const items = track.children;
    const firstItem = items[0] as HTMLElement;
    if (!firstItem) return;

    const itemWidth = firstItem.offsetWidth;
    const duration = itemWidth / speed;

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: direction === "left" ? -itemWidth : itemWidth,
        duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const val = parseFloat(x);
            if (direction === "left") {
              return `${val % itemWidth}px`;
            }
            return `${val % itemWidth}px`;
          },
        },
      });

      // Velocity-reactive speed on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const speedMultiplier = 1 + velocity / 3000;
          tween.timeScale(speedMultiplier);

          gsap.to(tween, {
            timeScale: 1,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true,
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [speed, direction]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className || ""}`}
    >
      <div ref={trackRef} className="flex w-max">
        {/* Duplicate children for seamless loop */}
        {children}
        {children}
        {children}
        {children}
      </div>
    </div>
  );
}
