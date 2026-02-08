"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import AnimatedCounter from "@/components/animations/animated-counter";
import Marquee from "@/components/animations/marquee";

const stats = [
  { value: 500, suffix: "+", label: "Vehicles Transformed" },
  { value: 12, suffix: "", label: "Years in Business" },
  { value: 5, suffix: ".0", label: "Google Rating", sublabel: "120+ Reviews" },
];

const certifications = [
  "3M Certified Installer",
  "XPEL Authorized",
  "Avery Dennison Certified",
  "Gtechniq Accredited Detailer",
];

export default function TrustBar() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !statsRef.current) return;

    const items = statsRef.current.querySelectorAll("[data-stat]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative border-y border-border bg-surface">
      <div
        ref={statsRef}
        className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 md:py-16"
      >
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} data-stat className="text-center md:text-left">
              <AnimatedCounter
                to={stat.value}
                suffix={stat.suffix}
                duration={2.5}
                className="font-display text-3xl font-bold text-foreground md:text-4xl"
              />
              <p className="mt-1 text-xs uppercase tracking-widest text-muted">
                {stat.label}
              </p>
              {stat.sublabel && (
                <p className="mt-0.5 text-[11px] text-accent-light/60">
                  {stat.sublabel}
                </p>
              )}
            </div>
          ))}
          <div data-stat className="text-center md:text-left">
            <span className="font-display text-3xl font-bold text-foreground md:text-4xl">
              #1
            </span>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted">
              Rated Wrap Shop
            </p>
          </div>
        </div>
      </div>

      <Marquee speed={30} className="border-t border-border py-4">
        <div className="flex items-center gap-12 px-6">
          {certifications.map((cert) => (
            <span
              key={cert}
              className="flex items-center gap-3 whitespace-nowrap text-sm uppercase tracking-widest text-muted-dark"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent/40" />
              {cert}
            </span>
          ))}
        </div>
      </Marquee>
    </section>
  );
}
