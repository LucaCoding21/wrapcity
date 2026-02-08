"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeader from "@/components/ui/section-header";
import StaggerGrid from "@/components/animations/stagger-grid";
import Button from "@/components/ui/button";
import Magnetic from "@/components/animations/magnetic";
import { services } from "@/data/services";

export default function Services() {
  const ctaRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctaRowRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaRowRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRowRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <SectionHeader
          eyebrow="Our Services"
          heading="Precision craftsmanship for every surface"
          subtitle="From full color transformations to invisible protection, we deliver results that exceed expectations."
        />

        <StaggerGrid className="mt-16 grid gap-6 md:grid-cols-2" stagger={0.15}>
          {services.map((service, i) => (
            <div
              key={service.slug}
              data-grid-item
              data-cursor="pointer"
              className="group relative overflow-hidden rounded-lg border border-border bg-surface p-8 transition-all duration-500 hover:border-accent/30 hover:bg-surface-light"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-accent-light/60">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm text-accent-light">
                    {service.tagline}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted">
                {service.description}
              </p>

              <ul className="mt-6 space-y-2">
                {service.features.slice(0, 3).map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                    {feature}
                  </li>
                ))}
                {service.features.length > 3 && (
                  <li className="hidden items-center gap-2 text-sm text-muted md:flex">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                    {service.features[3]}
                  </li>
                )}
              </ul>

              <div className="mt-8">
                <Button
                  href={`/contact?service=${service.slug}`}
                  variant="outline"
                  size="sm"
                >
                  Get a Quote
                </Button>
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </StaggerGrid>

        <div
          ref={ctaRowRef}
          className="mt-16 flex flex-col items-center gap-4 rounded-lg border border-border/50 bg-surface/50 px-8 py-6 text-center md:flex-row md:justify-between md:text-left"
        >
          <p className="text-sm text-muted">
            Not sure which service you need?{" "}
            <span className="text-foreground">
              We&apos;ll help you figure it out.
            </span>
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            <Magnetic strength={0.15}>
              <a
                href="tel:+15551234567"
                data-cursor="pointer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/30 px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-accent-light transition-all duration-300 hover:border-accent hover:bg-accent/10"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call (555) 123-4567
              </a>
            </Magnetic>
            <Magnetic strength={0.15}>
              <a
                href="sms:+15551234567"
                data-cursor="pointer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-muted transition-all duration-300 hover:border-accent/30 hover:text-foreground"
              >
                Text Us
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
