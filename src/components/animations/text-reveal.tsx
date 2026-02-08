"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

interface TextRevealProps {
  children: ReactNode;
  type?: "chars" | "words" | "lines";
  stagger?: number;
  delay?: number;
  duration?: number;
  as?: "div" | "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  scrub?: boolean;
  once?: boolean;
}

export default function TextReveal({
  children,
  type = "words",
  stagger = 0.05,
  delay = 0,
  duration = 0.8,
  as = "div",
  className,
  scrub = false,
  once = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const split = SplitText.create(containerRef.current, {
      type:
        type === "chars"
          ? "chars,words,lines"
          : type === "words"
          ? "words,lines"
          : "lines",
      linesClass: "line-mask",
      mask: "lines",
      autoSplit: true,
    });

    const targets =
      type === "chars"
        ? split.chars
        : type === "words"
        ? split.words
        : split.lines;

    if (scrub) {
      gsap.fromTo(
        targets,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 30%",
            scrub: true,
          },
        }
      );
    } else {
      gsap.fromTo(
        targets,
        { y: "100%" },
        {
          y: "0%",
          duration,
          stagger,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once,
          },
        }
      );
    }

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === containerRef.current) st.kill();
      });
    };
  }, [type, stagger, delay, duration, scrub, once]);

  const Component = as;

  return (
    <Component
      ref={containerRef as React.Ref<never>}
      className={className}
    >
      {children}
    </Component>
  );
}
