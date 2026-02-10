"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { services } from "@/data/services";

export default function Services() {
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
      }

      // Cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("[data-card]");
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
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
      id="services"
      ref={sectionRef}
      className="relative bg-near-black py-24 md:py-32"
    >
      {/* Subtle carbon fiber pattern */}
      <div className="carbon-pattern absolute inset-0 opacity-50" />

      <div className="container-wide relative">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 max-w-2xl">
          <p className="label-uppercase mb-4 text-power-red">Our Services</p>
          <h2 className="heading-section text-white">
            WHAT WE DO
          </h2>
          <div className="mt-4 h-1 w-24 bg-power-red" />
          <p className="mt-6 text-lg leading-relaxed text-white/60">
            From motorcycle customization to large scale municipal projects, we deliver precision
            craftsmanship that exceeds expectations.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div ref={cardsRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.slug}
              data-card
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-surface transition-all duration-500 hover:border-power-red/30"
            >
              {/* Service Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />

                {/* Number overlay */}
                <span className="absolute right-4 top-4 font-display text-5xl font-bold text-white/20">
                  0{i + 1}
                </span>
              </div>

              <div className="relative p-6">
                {/* Skewed accent bar */}
                <div
                  className="absolute left-0 top-0 h-full w-1 origin-top bg-power-red transition-transform duration-500 group-hover:scale-y-100"
                  style={{ transform: "scaleY(0)" }}
                />

                {/* Content */}
                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-warm-coral">
                  {service.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {service.description}
                </p>

                {/* Hover glow effect */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-power-red/0 to-power-red/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Row */}
        <div className="mt-16 flex flex-col items-center gap-6 rounded-lg border border-white/10 bg-surface/50 p-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-white">
              Not sure which service you need?{" "}
              <span className="text-white/60">We&apos;ll help you figure it out.</span>
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:+15551234567"
              className="inline-flex items-center justify-center gap-2 border border-power-red/50 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-power-red transition-all duration-300 hover:bg-power-red hover:text-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call (555) 123-4567
            </a>
            <a
              href="#contact"
              className="btn-skewed inline-flex items-center justify-center bg-power-red px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-power-red-dark"
            >
              <span>Get a Free Quote</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
