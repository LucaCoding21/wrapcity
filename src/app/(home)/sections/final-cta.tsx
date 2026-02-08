"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import Button from "@/components/ui/button";
import Magnetic from "@/components/animations/magnetic";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;

    let split: ReturnType<typeof SplitText.create> | null = null;

    const ctx = gsap.context(() => {
      split = SplitText.create(headingRef.current!, {
        type: "chars,words,lines",
        linesClass: "line-mask",
        mask: "lines",
        autoSplit: true,
      });

      gsap.fromTo(
        split.chars,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1,
          stagger: 0.02,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("[data-action-card]");
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-32 md:px-12"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(193, 127, 110, 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-center font-display text-[clamp(2.5rem,8vw,8rem)] font-bold leading-[0.9] tracking-tight"
        >
          READY FOR YOUR
          <br />
          <span className="text-gradient-accent">TRANSFORMATION</span>?
        </h2>

        {/* Supporting text */}
        <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-muted md:text-lg">
          Get a free, no-obligation quote in under 2 hours. We&apos;ll walk you
          through every option and find the perfect solution for your vehicle.
        </p>

        {/* Action Cards */}
        <div ref={cardsRef} className="mt-16 grid gap-6 md:grid-cols-3">
          {/* Card 1: Quote Form */}
          <div
            data-action-card
            className="rounded-lg border border-border bg-surface p-8 text-center"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-accent/20 text-accent-light">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-bold tracking-tight">
              Get a Free Quote
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Fill out our quick form and we&apos;ll get back to you within 2
              hours with a custom quote.
            </p>
            <div className="mt-6">
              <Button
                href="/contact"
                variant="primary"
                size="md"
                className="w-full"
              >
                Get Your Quote
              </Button>
            </div>
          </div>

          {/* Card 2: Phone / Text */}
          <div
            data-action-card
            className="order-first rounded-lg border border-accent/20 bg-surface p-8 text-center md:order-none"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-accent/20 text-accent-light">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-bold tracking-tight">
              Call or Text
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Prefer to talk? Reach us directly.
            </p>
            <Magnetic strength={0.1}>
              <a
                href="tel:+15551234567"
                data-cursor="pointer"
                className="mt-4 block font-display text-2xl font-bold text-accent-light transition-colors duration-300 hover:text-accent"
              >
                (555) 123-4567
              </a>
            </Magnetic>
            <div className="mt-4 flex gap-3">
              <Button
                href="tel:+15551234567"
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Call Now
              </Button>
              <Button
                href="sms:+15551234567"
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Text Us
              </Button>
            </div>
          </div>

          {/* Card 3: Visit */}
          <div
            data-action-card
            className="rounded-lg border border-border bg-surface p-8 text-center"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-accent/20 text-accent-light">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-bold tracking-tight">
              Visit Our Shop
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              1234 Wrap City Blvd
              <br />
              Suite 100, City, ST 12345
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-widest text-muted-dark">
              Mon&ndash;Fri 8am&ndash;6pm &middot; Sat 9am&ndash;3pm
            </p>
            <div className="mt-6">
              <Button
                href="https://maps.google.com"
                variant="outline"
                size="sm"
                className="w-full"
              >
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
