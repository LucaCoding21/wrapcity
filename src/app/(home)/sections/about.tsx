"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const highlights = [
  "Single-installer shop, no assembly line, no shortcuts",
  "3M & Avery Dennison certified vinyl wrap installer",
  "Specializing in color change wraps, matte black, and chrome delete",
  "Premium materials with 5-7 year manufacturer warranty",
  "Serving South Surrey, White Rock & Fraser Valley",
  "100% satisfaction guarantee on every wrap",
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Image animation - use vertical on mobile for smoother feel
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: isMobile ? 40 : 0, x: isMobile ? 0 : -50, opacity: 0 },
          {
            y: 0,
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Content animation - use vertical on mobile
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: isMobile ? 40 : 0, x: isMobile ? 0 : 50, opacity: 0 },
          {
            y: 0,
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        // Animate checkmarks - use vertical movement
        const checkItems = contentRef.current.querySelectorAll("[data-check]");
        gsap.fromTo(
          checkItems,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );

        // Animate CTA button
        const ctaButton = contentRef.current.querySelector("[data-cta]");
        if (ctaButton) {
          gsap.fromTo(
            ctaButton,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ctaButton,
                start: "top 90%",
                once: true,
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-gray-100 py-24 text-near-black md:py-32 mobile-cv-auto"
    >
      {/* Diagonal top separator */}
      <div
        className="absolute left-0 right-0 top-0 h-20 bg-near-black"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 100%)",
        }}
      />

      <div className="container-wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Column - Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/images/aboutme.jpeg"
                alt="Taylor Paige, owner and 3M certified vinyl wrap installer at Wrap City in South Surrey BC"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div ref={contentRef} className="lg:pl-8">
            <p className="label-uppercase mb-4 text-power-red">Meet Taylor</p>
            <h2 className="heading-section text-near-black">
              PRECISION. QUALITY. PASSION.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal">
              Wrap City is a premium vinyl &amp; visual branding studio in South Surrey BC specializing in
              custom vehicle wraps, commercial fleet graphics, architectural vinyl
              installations, and municipal surface transformations.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-charcoal">
              From personal vehicle customization to full-scale business branding and
              public installations, we combine precision installation with high-impact
              design to help brands stand out everywhere they appear.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-charcoal">
              Wrap City takes pride in being able to design, print and install
              high-impact graphics for vehicles, businesses, public spaces and
              everything in between — in house.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-charcoal">
              We don&apos;t just wrap surfaces — we elevate visibility.
            </p>

            {/* Checkmark points */}
            <div className="mt-8 space-y-4">
              {highlights.map((item) => (
                <div key={item} data-check className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-power-red">
                    <svg
                      className="h-4 w-4 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-charcoal">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div data-cta className="mt-10">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-skewed inline-flex items-center gap-3 bg-power-red px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-power-red-dark"
              >
                <span>Request a Quote</span>
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
        </div>
      </div>

    </section>
  );
}
