"use client";

import TextReveal from "@/components/animations/text-reveal";

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  heading,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={`${align === "center" ? "text-center" : ""} ${className || ""}`}
    >
      {eyebrow && (
        <TextReveal
          as="p"
          type="words"
          className="mb-4 text-xs uppercase tracking-[0.3em] text-accent-light"
        >
          {eyebrow}
        </TextReveal>
      )}
      <TextReveal
        as="h2"
        type="words"
        stagger={0.04}
        className="font-display text-[clamp(2rem,5vw,5rem)] leading-[0.95] font-bold tracking-tight"
      >
        {heading}
      </TextReveal>
      {subtitle && (
        <TextReveal
          as="p"
          type="words"
          delay={0.3}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
        >
          {subtitle}
        </TextReveal>
      )}
    </div>
  );
}
