"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { services } from "@/data/services";

function ServiceIcon({ type }: { type: string }) {
  const iconClass = "w-8 h-8 text-power-red";

  switch (type) {
    case "wrap":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
    case "accent":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3v18M3 12h18" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "shield":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "droplet":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
        </svg>
      );
    case "truck":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    case "pencil":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      );
    default:
      return null;
  }
}

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
            From full color transformations to invisible protection, we deliver precision
            craftsmanship that exceeds expectations.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div ref={cardsRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.slug}
              data-card
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-surface p-8 transition-all duration-500 hover:border-power-red/30"
            >
              {/* Skewed accent bar */}
              <div
                className="absolute left-0 top-0 h-full w-1 origin-top bg-power-red transition-transform duration-500 group-hover:scale-y-100"
                style={{ transform: "scaleY(0)" }}
              />

              {/* Icon with skewed background */}
              <div className="relative mb-6 inline-block">
                <div
                  className="absolute inset-0 -z-10 bg-power-red/10"
                  style={{
                    clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)",
                    transform: "scale(1.5)",
                  }}
                />
                <ServiceIcon type={service.icon} />
              </div>

              {/* Number */}
              <span className="absolute right-6 top-6 font-display text-6xl font-bold text-white/5">
                0{i + 1}
              </span>

              {/* Content */}
              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white">
                {service.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-warm-coral">
                {service.tagline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                {service.description}
              </p>

              {/* Features */}
              <ul className="mt-6 space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-white/50"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-power-red" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover glow effect */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-power-red/0 to-power-red/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
