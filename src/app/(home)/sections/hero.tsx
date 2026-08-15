"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePreloader } from "@/providers/preloader-provider";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isLoading, setVideoReady } = usePreloader();
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoInitializedRef = useRef(false);

  // Detect mobile
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // For desktop: start loading video immediately (during preloader)
  // For mobile: wait until preloader finishes
  useEffect(() => {
    const videoEl = videoElementRef.current;
    if (!videoEl) return;

    // Prevent re-initialization when isLoading changes
    if (videoInitializedRef.current) return;

    const isMobileDevice = window.innerWidth < 768;

    // On mobile, wait for preloader to finish
    if (isMobileDevice && isLoading) return;

    // Mark as initialized before loading
    videoInitializedRef.current = true;

    videoEl.src = "/videos/wrap-city-video.mp4";
    videoEl.load();

    const handleCanPlay = () => {
      setVideoLoaded(true);
      // Tell preloader the video is ready (desktop will wait for this)
      setVideoReady();
      videoEl.play().catch(() => {});
    };

    videoEl.addEventListener("canplay", handleCanPlay);
    return () => videoEl.removeEventListener("canplay", handleCanPlay);
  }, [isLoading, setVideoReady]);

  // Entrance animations
  useEffect(() => {
    if (isLoading) return;

    const tl = gsap.timeline();

    // Location fades in
    if (locationRef.current) {
      tl.to(
        locationRef.current,
        { opacity: 1, duration: 0.4, ease: "power3.out" },
        0.1
      );
    }

    // Headline slides up with stagger
    if (headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll("[data-line]");
      tl.to(
        lines,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out"
        },
        0.2
      );
    }

    // CTAs pop in
    if (ctaRef.current) {
      tl.to(
        ctaRef.current,
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
        0.6
      );
    }

    // Scroll indicator
    if (scrollRef.current) {
      tl.to(
        scrollRef.current,
        { opacity: 1, duration: 0.3 },
        0.8
      );
    }

  }, [isLoading]);

  // Scroll parallax — disabled on mobile for GPU performance
  useEffect(() => {
    if (!sectionRef.current) return;
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Skip expensive parallax scale on mobile
      if (videoRef.current && !isMobile) {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isMobile]);

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
          ref={videoElementRef}
          loop
          muted
          playsInline
          preload="none"
          poster={isMobile ? "/images/jeep4.jpg" : undefined}
          className="h-full w-full object-cover"
          style={{ opacity: isMobile ? (videoLoaded ? 1 : 0) : 1 }}
        />
        {/* Poster fallback visible while video loads - mobile only */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 md:hidden"
          style={{
            backgroundImage: "url('/images/jeep4.jpg')",
            opacity: videoLoaded ? 0 : 1,
          }}
        />

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

      {/* Content */}
      <div
        ref={contentRef}
        className="container-wide relative z-10 flex h-full flex-col justify-center"
      >
        {/* Eyebrow + tagline lockup share a width so they line up */}
        <div className="w-full max-w-2xl md:max-w-3xl">
          {/* Location */}
          <p
            ref={locationRef}
            className="label-uppercase mb-6 mt-16 text-center text-white/60 opacity-0"
          >
            Premium Vinyl, PPF &amp; Ceramic Studio in Langley BC
          </p>

          {/* Main headline - brand tagline lockup in Taylor's font */}
          <h1 ref={headlineRef}>
            <span className="sr-only">
              Vinyl Styling and Protection. Automotive, Marine, Architectural.
            </span>
            <span data-line className="block overflow-hidden opacity-0">
              <Image
                src="/images/hero-tagline.png"
                alt=""
                width={1340}
                height={142}
                className="w-full"
                priority
              />
            </span>
          </h1>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4 opacity-0">
          {/* Primary CTA */}
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, "#contact")}
            className="btn-skewed inline-flex items-center gap-3 bg-power-red px-8 py-4 text-sm font-semibold uppercase tracking-widest text-near-black transition-all duration-300 hover:bg-power-red-dark"
          >
            <span>Get an Instant Estimate</span>
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
            View Our Portfolio
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
