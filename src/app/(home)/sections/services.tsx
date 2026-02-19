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
            duration: 0.4,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-near-black py-24 md:py-32 mobile-cv-auto"
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
        </div>

        {/* Service Cards */}
        <div ref={cardsRef} className="space-y-6">
          {/* Featured Hero Card - Vehicle Wraps */}
          {services[0] && (
            <div
              data-card
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-surface transition-all duration-500 hover:border-power-red/30"
            >
              <div className="grid md:grid-cols-2">
                {/* Hero Image */}
                <div className="relative h-64 w-full overflow-hidden md:h-full md:min-h-[320px]">
                  <Image
                    src={services[0].image}
                    alt={services[0].imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/80 max-md:bg-gradient-to-t max-md:from-surface max-md:via-surface/50 max-md:to-transparent" />
                </div>

                {/* Hero Content */}
                <div className="relative flex flex-col justify-center p-8 md:p-12">
                  <div
                    className="absolute left-0 top-0 h-full w-1 origin-top bg-power-red transition-transform duration-500 group-hover:scale-y-100"
                    style={{ transform: "scaleY(0)" }}
                  />
                  <p className="label-uppercase mb-2 text-power-red">Featured Service</p>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                    {services[0].title}
                  </h3>
                  <p className="mt-2 text-base font-medium text-warm-coral">
                    {services[0].tagline}
                  </p>
                  <p className="mt-4 leading-relaxed text-white/60">
                    {services[0].description}
                  </p>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-power-red/0 to-power-red/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </div>
            </div>
          )}

          {/* Remaining 6 Service Cards - 3x2 Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(1).map((service) => (
              <div
                key={service.slug}
                data-card
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-surface transition-all duration-500 hover:border-power-red/30"
              >
                {/* Service Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
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
        </div>

        {/* CTA Row */}
        <div className="mt-16 flex flex-col items-center gap-6 rounded-lg border border-white/10 bg-surface/50 p-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-white">
              Not sure which service you need?{" "}
              <span className="text-white/60">We&apos;ll help you figure it out.</span>
            </p>
          </div>
          <a
            href="#contact"
            className="btn-skewed inline-flex items-center justify-center bg-power-red px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-power-red-dark"
          >
            <span>Cost Calculator</span>
          </a>
        </div>
      </div>
    </section>
  );
}
