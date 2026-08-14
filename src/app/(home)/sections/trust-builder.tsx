"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const trustCategories = [
  {
    title: "Certified Quality",
    points: [
      "3M, Avery Dennison & Hexis Certified Installation",
      "Premium vinyl materials from industry-leading brands",
      "Professional installation standards",
    ],
  },
  {
    title: "Full-Service Shop",
    points: [
      "In-house design, print & installation",
      "Commercial-grade print systems",
      "Detail-focused craftsmanship on every project",
    ],
  },
  {
    title: "Trusted Reputation",
    points: [
      "Multiple 5-star Google reviews",
      "Trusted across the Lower Mainland",
      "Proud participant at Vancouver Auto Show 2023",
    ],
  },
  {
    title: "Peace of Mind",
    points: [
      "Fully insured",
      "Commercial project experience",
      "Genuine, personalized customer service",
    ],
  },
];

export default function TrustBuilder() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }

      // Cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("[data-card]");
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
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

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-wrap-city"
      ref={sectionRef}
      className="relative bg-gray-100 py-24 text-near-black md:py-32 mobile-cv-auto"
    >
      <div className="container-wide relative">
        {/* Section Header */}
        <div ref={headerRef} className="mb-12 md:mb-16">
          <p className="label-uppercase mb-4 text-power-red">Trust & Quality</p>
          <h2 className="heading-section text-near-black">
            WHY WRAP CITY?
          </h2>
          <div className="mt-4 h-1 w-24 bg-power-red" />
        </div>

        {/* Trust Categories Grid */}
        <div
          ref={cardsRef}
          className="grid gap-8 md:grid-cols-2"
        >
          {trustCategories.map((category) => (
            <div
              key={category.title}
              data-card
              className="rounded-xl bg-white p-6 shadow-md md:p-8"
            >
              <h3 className="mb-5 font-display text-xl font-bold uppercase tracking-tight text-near-black">
                {category.title}
              </h3>
              <ul className="space-y-4">
                {category.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-power-red">
                      <svg
                        className="h-3 w-3 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-base leading-relaxed text-charcoal">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col items-center gap-6 rounded-xl bg-near-black p-8 text-center md:mt-16 md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-lg font-medium text-white">
              Ready to experience the Wrap City difference?
            </p>
            <p className="mt-1 text-white/60">
              Get a free, no-obligation quote today.
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-skewed inline-flex shrink-0 items-center gap-3 bg-power-red px-8 py-4 text-sm font-semibold uppercase tracking-widest text-near-black transition-all duration-300 hover:bg-power-red-dark"
          >
            <span>Get Your Free Quote</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>

    </section>
  );
}
