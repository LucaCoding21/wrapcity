"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePreloader } from "@/providers/preloader-provider";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isLoading } = usePreloader();

  // Entrance animations
  useEffect(() => {
    if (isLoading) return;

    const tl = gsap.timeline({ delay: 0.1 });

    // Video overlay wipes down to reveal
    if (overlayRef.current) {
      tl.to(overlayRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1.4,
        ease: "power4.inOut",
      });
    }

    // Headline slides up with stagger
    if (headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll("[data-line]");
      tl.fromTo(
        lines,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out"
        },
        0.6
      );
    }

    // Subheadline fades in
    if (subheadlineRef.current) {
      tl.fromTo(
        subheadlineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        1.0
      );
    }

    // CTAs pop in
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        1.2
      );
    }

    // Scroll indicator
    if (scrollRef.current) {
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        1.4
      );
    }

  }, [isLoading]);

  // Scroll parallax
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Content fades on scroll
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: -50,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "40% top",
            scrub: true,
          },
        });
      }

      if (scrollRef.current) {
        gsap.to(scrollRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "3% top",
            end: "8% top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Full-bleed video background */}
      <div ref={videoRef} className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/videos/wrap-city-video.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Bottom gradient for text legibility + top for nav */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(29,28,29,0.7) 0%, rgba(0,0,0,0) 40%), linear-gradient(to bottom, rgba(29,28,29,0.5) 0%, rgba(0,0,0,0) 20%)",
          }}
        />
      </div>


      {/* Reveal overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-near-black"
        style={{ zIndex: 3, clipPath: "inset(0% 0% 0% 0%)" }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="container-wide relative z-10 flex h-full flex-col justify-center"
      >
        {/* Location */}
        <p className="label-uppercase mb-6 text-white/60">
          Located in South Surrey, B.C.
        </p>

        {/* Main headline */}
        <h1 ref={headlineRef} className="heading-hero max-w-5xl">
          <span data-line className="block overflow-hidden">
            <span className="inline-block text-white">YOUR RIDE.</span>
          </span>
          <span data-line className="block overflow-hidden">
            <span
              className="inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #E8C4B8 0%, #D4A090 50%, #C08978 100%)"
              }}
            >REIMAGINED.</span>
          </span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="mt-8 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
        >
          Precision vinyl wraps, paint protection film, and ceramic coatings
          for every vehicle. We don&apos;t just wrap cars — we transform them.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
          {/* Primary CTA */}
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, "#contact")}
            className="btn-skewed inline-flex items-center gap-3 bg-power-red px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-power-red-dark"
          >
            <span>Book a Consultation</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>

          {/* Secondary CTA */}
          <a
            href="#gallery"
            onClick={(e) => handleScroll(e, "#gallery")}
            className="inline-flex items-center gap-2 border border-white/30 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:border-power-red hover:bg-power-red/10"
          >
            View Our Work
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 opacity-0"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-white/40">Scroll</span>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1">
            <div className="h-2 w-1 animate-scroll-pulse rounded-full bg-power-red" />
          </div>
        </div>
      </div>

      {/* Angled bottom edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-near-black"
        style={{
          clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)",
        }}
      />
    </section>
  );
}
