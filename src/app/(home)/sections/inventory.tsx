"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const brands = [
  {
    name: "3M",
    description: "Wrap Film Series 2080",
    catalogImage: "/colour2.jpg",
    catalogLink: "/colour2.jpg",
    catalogLabel: "View Full Chart",
  },
  {
    name: "3M",
    description: "DI-NOC Architectural Finishes",
    catalogImage: "/images/notpdf.jpg",
    catalogLink: "/images/notpdf.jpg",
    catalogLabel: "View Full Chart",
  },
];

export default function Inventory() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
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

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("[data-card]");
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
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
      id="inventory"
      ref={sectionRef}
      className="relative bg-charcoal py-24 md:py-32 mobile-cv-auto"
    >
      {/* Diagonal top separator */}
      <div
        className="absolute left-0 right-0 top-0 h-20 bg-near-black"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 100%)" }}
      />

      <div className="container-wide">
        {/* Header */}
        <div ref={headerRef} className="text-center">
          <p className="label-uppercase mb-4 text-power-red">Browse Our Films</p>
          <h2 className="heading-section text-white">AVAILABLE INVENTORY</h2>
          <div className="mt-4 h-1 w-24 bg-power-red mx-auto" />
          <p className="mt-6 max-w-2xl mx-auto text-lg text-white/60">
            We stock premium vinyl films from industry-leading manufacturers.
            Browse our color charts below to find the perfect finish for your project.
          </p>
        </div>

        {/* Brand Logos */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {/* 3M Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/10 p-2">
              <svg viewBox="0 0 400 400" className="h-12 w-12">
                <rect width="400" height="400" rx="20" fill="#CC0000" />
                <text
                  x="200"
                  y="260"
                  textAnchor="middle"
                  fill="white"
                  fontSize="220"
                  fontWeight="bold"
                  fontFamily="Arial, sans-serif"
                >
                  3M
                </text>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-white">3M Certified</p>
              <p className="text-xs text-white/50">Wrap Film Series 2080</p>
            </div>
          </div>

          {/* Avery Dennison Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/10 p-2">
              <svg viewBox="0 0 400 400" className="h-12 w-12">
                <rect width="400" height="400" rx="20" fill="#E31937" />
                <text
                  x="200"
                  y="230"
                  textAnchor="middle"
                  fill="white"
                  fontSize="120"
                  fontWeight="bold"
                  fontFamily="Arial, sans-serif"
                >
                  AD
                </text>
                <text
                  x="200"
                  y="310"
                  textAnchor="middle"
                  fill="white"
                  fontSize="50"
                  fontFamily="Arial, sans-serif"
                >
                  AVERY
                </text>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Avery Dennison</p>
              <p className="text-xs text-white/50">Supreme Wrapping Film</p>
            </div>
          </div>
        </div>

        {/* Color Charts */}
        <div ref={cardsRef} className="mt-16 grid gap-8 md:grid-cols-2">
          {/* 3M Wrap Film Color Chart */}
          <div data-card className="group">
            <a
              href="/colour2.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-power-red/40 hover:bg-white/[0.08]"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/colour2.jpg"
                  alt="3M Wrap Film Series 2080 color chart showing Gloss, Satin, Matte, Textures, Colour Flips, and Chrome finishes available at Wrap City Langley BC"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/40">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/0 transition-all duration-500 group-hover:bg-white/20">
                    <svg
                      className="h-8 w-8 text-white opacity-0 transition-all duration-500 group-hover:opacity-100"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      3M Wrap Film Series 2080
                    </h3>
                    <p className="mt-1 text-sm text-white/50">
                      Gloss, Satin, Matte, Chrome, Textures & Colour Flips
                    </p>
                  </div>
                  <svg
                    className="h-5 w-5 shrink-0 text-power-red transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </a>
          </div>

          {/* DI-NOC / Additional Catalog */}
          <div data-card className="group">
            <a
              href="/images/notpdf.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-power-red/40 hover:bg-white/[0.08]"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/notpdf.jpg"
                  alt="Full color catalog showing all available vinyl film colors and finishes stocked at our Langley location"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/40">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/0 transition-all duration-500 group-hover:bg-white/20">
                    <svg
                      className="h-8 w-8 text-white opacity-0 transition-all duration-500 group-hover:opacity-100"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      Full Color Catalog
                    </h3>
                    <p className="mt-1 text-sm text-white/50">
                      Complete catalog with all vinyl film options
                    </p>
                  </div>
                  <svg
                    className="h-5 w-5 shrink-0 text-power-red transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/50 mb-6">
            Can&apos;t find what you&apos;re looking for? We can source any color or finish.
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-skewed inline-flex items-center gap-3 bg-power-red px-8 py-4 text-sm font-semibold uppercase tracking-widest text-near-black transition-all duration-300 hover:bg-power-red-dark"
          >
            <span>Request a Color Consultation</span>
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
