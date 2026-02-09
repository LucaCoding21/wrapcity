"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const processSteps = [
  { number: "01", title: "Design", description: "Choose your color, finish, and custom details" },
  { number: "02", title: "Prep", description: "Vehicle is thoroughly cleaned and prepped" },
  { number: "03", title: "Wrap", description: "Precision installation by certified technicians" },
  { number: "04", title: "Finish", description: "Quality inspection and final detailing" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Left content slides in
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }

      // Right content slides in
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }

      // Image reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: imageRef.current,
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
      className="relative bg-soft-sand py-24 text-near-black md:py-32"
    >
      {/* Diagonal top separator */}
      <div
        className="absolute left-0 right-0 top-0 h-20 bg-near-black"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 100%)",
        }}
      />

      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Column - About Us */}
          <div ref={leftRef}>
            <p className="label-uppercase mb-4 text-power-red">About Us</p>
            <h2 className="heading-section text-near-black">
              CRAFTSMANSHIP MEETS PASSION
            </h2>
            <div className="mt-4 h-1 w-24 bg-power-red" />

            <p className="mt-8 text-lg leading-relaxed text-charcoal">
              Founded by car enthusiasts, for car enthusiasts. At Wrap City, we believe
              every vehicle deserves to stand out. What started as a passion project in a
              small garage has grown into the region&apos;s premier vinyl wrap destination.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-charcoal">
              Our team of certified installers brings decades of combined experience and an
              obsessive attention to detail. We don&apos;t just wrap cars — we transform them
              into rolling works of art.
            </p>

            {/* Certifications */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3 rounded-full bg-near-black/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-power-red" />
                <span className="text-sm font-semibold">3M Certified</span>
              </div>
              <div className="flex items-center gap-3 rounded-full bg-near-black/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-power-red" />
                <span className="text-sm font-semibold">Avery Dennison Certified</span>
              </div>
              <div className="flex items-center gap-3 rounded-full bg-near-black/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-power-red" />
                <span className="text-sm font-semibold">XPEL Certified</span>
              </div>
            </div>

            {/* Image with skewed frame */}
            <div className="mt-10 relative">
              <div
                ref={imageRef}
                className="relative overflow-hidden"
                style={{
                  transform: "rotate(-2deg)",
                }}
              >
                <Image
                  src="/images/jeep4.jpg"
                  alt="Our workshop"
                  width={600}
                  height={400}
                  className="w-full object-cover"
                  style={{
                    transform: "rotate(2deg) scale(1.05)",
                  }}
                />
              </div>
              {/* Red accent corner */}
              <div
                className="absolute -bottom-4 -right-4 h-20 w-20 bg-power-red"
                style={{
                  clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                }}
              />
            </div>
          </div>

          {/* Right Column - What is Vinyl Wrapping */}
          <div ref={rightRef}>
            <p className="label-uppercase mb-4 text-warm-coral-dark">Learn More</p>
            <h2 className="heading-section text-near-black">
              WHAT IS VINYL WRAPPING?
            </h2>
            <div className="mt-4 h-1 w-24 bg-warm-coral" />

            <p className="mt-8 text-lg leading-relaxed text-charcoal">
              Vinyl wrapping is the process of applying a thin, adhesive-backed film over your
              vehicle&apos;s original paint. It&apos;s a revolutionary way to completely
              change your car&apos;s appearance without the permanence or cost of a full respray.
            </p>

            <h3 className="mt-8 font-display text-xl font-bold uppercase text-near-black">
              Why Choose Wrapping?
            </h3>

            <ul className="mt-4 space-y-3">
              {[
                "Completely reversible: your original paint stays protected",
                "Hundreds of colors and finishes to choose from",
                "Fraction of the cost of a quality paint job",
                "Faster turnaround: drive away in days, not weeks",
                "Protects your factory paint from UV and minor damage",
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-charcoal">
                  <svg
                    className="mt-1 h-5 w-5 shrink-0 text-power-red"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>

            {/* Process Steps */}
            <h3 className="mt-10 font-display text-xl font-bold uppercase text-near-black">
              Our Process
            </h3>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-lg border border-near-black/10 bg-white/50 p-4 transition-all duration-300 hover:border-power-red/30 hover:bg-white"
                >
                  <span className="font-display text-2xl font-bold text-warm-coral">
                    {step.number}
                  </span>
                  <h4 className="mt-1 font-display text-lg font-bold uppercase text-near-black">
                    {step.title}
                  </h4>
                  <p className="mt-1 text-sm text-charcoal">{step.description}</p>
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
