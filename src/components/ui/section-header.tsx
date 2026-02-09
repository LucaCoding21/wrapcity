"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export default function SectionHeader({
  eyebrow,
  heading,
  subtitle,
  align = "left",
  className,
  light = false,
}: SectionHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={headerRef}
      className={`${align === "center" ? "text-center" : ""} ${className || ""}`}
    >
      {eyebrow && (
        <p className={`label-uppercase mb-4 ${light ? "text-power-red" : "text-power-red"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`heading-section ${light ? "text-near-black" : "text-white"}`}>
        {heading}
      </h2>
      <div className={`mt-4 h-1 w-24 bg-power-red ${align === "center" ? "mx-auto" : ""}`} />
      {subtitle && (
        <p className={`mt-6 max-w-xl text-lg leading-relaxed ${light ? "text-charcoal" : "text-white/60"} ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
