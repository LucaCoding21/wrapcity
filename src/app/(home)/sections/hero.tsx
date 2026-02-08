"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePreloader } from "@/providers/preloader-provider";
import Link from "next/link";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
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

    // Brand block fades in
    if (brandRef.current) {
      tl.fromTo(
        brandRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.8
      );
    }

    // CTA
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        1.1
      );
    }

    // Bottom bar
    if (bottomBarRef.current) {
      tl.fromTo(
        bottomBarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power3.out" },
        1.3
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
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Everything fades on scroll
      const fadeEls = sectionRef.current!.querySelectorAll("[data-hero-fade]");
      gsap.fromTo(fadeEls, {
        y: 0,
        opacity: 1,
      }, {
        y: -30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "40% top",
          scrub: true,
        },
      });

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

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Full-bleed video — the hero IS the video */}
      <div ref={videoRef} className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Bottom gradient for text + top gradient for nav */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 40%), linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 25%)",
          }}
        />
      </div>

      {/* Reveal overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-background"
        style={{ zIndex: 3, clipPath: "inset(0% 0% 0% 0%)" }}
      />

      {/* Content — bottom-left, minimal, let the video breathe */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-24 md:px-12 lg:px-16">
        {/* Brand + location */}
        <div ref={brandRef} data-hero-fade className="opacity-0">
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">
            Premium vinyl wraps &amp; paint protection
          </p>
          <h1
            className="mt-3 font-hero font-black uppercase tracking-tight text-white"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)", lineHeight: 1.05 }}
          >
            Wrap City
          </h1>
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          data-hero-fade
          className="mt-6 flex items-center gap-6 opacity-0"
        >
          <Link
            href="/contact"
            data-cursor="pointer"
            className="group inline-flex items-center gap-3 rounded-full border border-accent/50 bg-accent/20 px-7 py-3.5 text-[12px] font-medium uppercase tracking-widest text-white backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-accent"
          >
            Get a Free Quote
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
          <Link
            href="/work"
            data-cursor="pointer"
            className="text-[12px] font-medium uppercase tracking-widest text-white/40 transition-colors duration-300 hover:text-white/80"
          >
            Our Work
          </Link>
        </div>
      </div>

      {/* Bottom bar — trust signals */}
      <div
        ref={bottomBarRef}
        className="absolute bottom-0 right-0 left-0 z-20 border-t border-white/[0.06] opacity-0"
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-12 lg:px-16">
          <div className="flex items-center gap-5">
            <span className="text-[10px] uppercase tracking-widest text-white/25">
              3M &amp; Avery Certified
            </span>
            <span className="text-white/10">|</span>
            <span className="text-[10px] uppercase tracking-widest text-white/25">
              500+ Vehicles
            </span>
            <span className="hidden text-white/10 md:inline">|</span>
            <span className="hidden text-[10px] uppercase tracking-widest text-white/25 md:inline">
              5-Star Rated
            </span>
          </div>

          {/* Scroll */}
          <div ref={scrollRef} className="flex items-center gap-3 opacity-0">
            <div className="h-8 w-[1px] overflow-hidden bg-white/10">
              <div
                className="h-full w-full bg-accent-light/60"
                style={{
                  animation: "scrollLine 1.5s ease-in-out infinite",
                }}
              />
            </div>
          </div>

          <div className="hidden items-center gap-5 md:flex">
            <a
              href="#"
              data-cursor="pointer"
              className="text-[10px] uppercase tracking-widest text-white/25 transition-colors hover:text-white/50"
            >
              IG
            </a>
            <a
              href="#"
              data-cursor="pointer"
              className="text-[10px] uppercase tracking-widest text-white/25 transition-colors hover:text-white/50"
            >
              TK
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </section>
  );
}
