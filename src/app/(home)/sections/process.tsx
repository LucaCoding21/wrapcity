"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeader from "@/components/ui/section-header";
import Button from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Free Consultation",
    description:
      "Tell us about your vision. We\u2019ll discuss materials, finishes, and colors \u2014 and give you a transparent quote the same day. No obligation.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Design & Prep",
    description:
      "We digitally mock up the look on your vehicle so you can see it before we start. Once approved, we prep the surface and cut every piece with precision templates.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Expert Installation",
    description:
      "Your vehicle stays in our climate-controlled facility for 3\u20135 days. Every panel is wrapped by hand by certified installers. Zero shortcuts.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "The Reveal",
    description:
      "We do a full walkthrough with you, explain care instructions, and hand you the keys to what feels like a brand new car.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !stepsRef.current) return;

    const cards = stepsRef.current.querySelectorAll("[data-step]");

    const ctx = gsap.context(() => {
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
            trigger: stepsRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 50%",
              scrub: true,
            },
          }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-surface py-32 mobile-cv-auto">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <SectionHeader
          eyebrow="How It Works"
          heading="From consultation to reveal in four steps"
          subtitle="No surprises. No hidden costs. Just a transparent process built around your vehicle."
          align="center"
        />

        {/* Progress Line — Desktop Only */}
        <div className="relative mt-20">
          <div
            ref={lineRef}
            className="absolute left-0 right-0 top-[60px] hidden h-px origin-left bg-gradient-to-r from-accent/60 via-accent/30 to-accent/60 lg:block"
          />

          <div
            ref={stepsRef}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((step, i) => (
              <div
                key={step.number}
                data-step
                className={`group rounded-lg border p-8 transition-all duration-500 hover:bg-surface-light ${
                  i === 0
                    ? "border-accent/20 bg-surface-light"
                    : "border-border bg-surface"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`font-display text-3xl font-bold ${
                      i === 0
                        ? "text-accent-light/60"
                        : "text-foreground/30 group-hover:text-accent-light/60"
                    } transition-colors duration-500`}
                  >
                    {step.number}
                  </span>
                  <span
                    className={`${
                      i === 0
                        ? "text-accent-light"
                        : "text-muted-dark group-hover:text-accent-light"
                    } transition-colors duration-500`}
                  >
                    {step.icon}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Inline CTA */}
        <div
          ref={ctaRef}
          className="mt-16 flex flex-col items-center gap-3 text-center"
        >
          <p className="text-lg text-muted">Ready to start?</p>
          <Button href="/contact" variant="primary" size="lg">
            Get an Instant Estimate
          </Button>
          <p className="mt-2 text-xs text-muted-dark">
            No obligation. Response within 2 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
