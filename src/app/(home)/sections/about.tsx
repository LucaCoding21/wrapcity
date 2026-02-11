"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const highlights = [
  "Owner-operated with personal attention to every project",
  "3M & Avery Dennison certified installer",
  "Specializing in vehicle wraps, custom graphics & murals",
  "Premium materials with manufacturer warranty",
  "Dedicated to bringing your vision to life",
  "100% satisfaction guarantee",
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Content animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );

        // Animate checkmarks
        const checkItems = contentRef.current.querySelectorAll("[data-check]");
        gsap.fromTo(
          checkItems,
          { x: 20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 75%",
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
                alt="Taylor Paige — owner of Wrap City"
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
              Hi, I&apos;m Taylor Paige — the owner and sole artist behind Wrap City.
              What started as a passion for transforming vehicles has grown into a
              full-service wrap and graphics business where I personally handle every
              project from start to finish.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-charcoal">
              From custom vehicle wraps to eye-catching murals and commercial graphics,
              I pour my creativity and attention to detail into every piece. When you work
              with Wrap City, you work directly with me — ensuring your vision gets the
              personal care it deserves.
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
