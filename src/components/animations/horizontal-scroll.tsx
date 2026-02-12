"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export default function HorizontalScroll({
  children,
  className,
}: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    // On mobile, skip the pinned horizontal scroll entirely — too expensive
    if (isMobile) return;

    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className || ""}`}>
      {/* Progress bar */}
      <div className="absolute top-0 right-0 left-0 h-[1px] bg-border" style={{ zIndex: 10 }}>
        <div
          ref={progressRef}
          className="bg-gradient-accent h-full origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* On mobile: vertical stack. On desktop: horizontal scroll */}
      <div ref={trackRef} className={isMobile ? "flex flex-col" : "flex h-screen items-center"}>
        {children}
      </div>
    </div>
  );
}
