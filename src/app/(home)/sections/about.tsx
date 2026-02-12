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
      className="relative bg-white py-24 text-near-black md:py-32"
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
              Wrap City is a single-installer shop that takes exceptional care
              and attention to detail with every vehicle wrap. Unlike larger shops where
              multiple installers may rush projects to meet high volumes, we believe your
              vehicle deserves focused, expert hands to ensure a flawless, long-lasting result.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-charcoal">
              We do not feel multiple people should handle your investment, as this can
              increase the risk of errors or compromised quality. Our approach allows us
              to meticulously prepare and wrap every panel, which is what truly sets us apart.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-charcoal">
              While a full wrap typically requires approximately 7 days, this timeline
              ensures we can work carefully and thoroughly. In some cases, your vehicle
              may be completed sooner, depending on complexity and schedule. Our priority
              is delivering a wrap that is stunning, durable, and built to last.
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
                <span>Get a Free Quote</span>
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

      {/* Diagonal bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-near-black"
        style={{
          clipPath: "polygon(0 100%, 100% 0%, 100% 100%, 0 100%)",
        }}
      />
    </section>
  );
}
