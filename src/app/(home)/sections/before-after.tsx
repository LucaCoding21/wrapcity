"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percent);
    },
    []
  );

  // Mouse events
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      updatePosition(e.clientX);
    };
    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, updatePosition]);

  // Touch events
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleTouchMove = (e: TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    };
    const handleTouchEnd = () => setIsDragging(false);

    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, updatePosition]);

  // GSAP entrance animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 40, opacity: 0 },
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

      if (sliderRef.current) {
        gsap.fromTo(
          sliderRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sliderRef.current,
              start: "top 85%",
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
      id="before-after"
      ref={sectionRef}
      className="relative bg-near-black py-24 md:py-32 mobile-cv-auto overflow-hidden"
    >
      <div className="container-wide">
        {/* Header */}
        <div ref={headerRef} className="mb-12 md:mb-16 text-center opacity-0">
          <p className="text-power-red text-sm font-medium tracking-widest uppercase mb-3">
            The Transformation
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            BEFORE & AFTER
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/50 text-lg">
            Drag the slider to see the full transformation — from plain to
            professionally branded.
          </p>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="opacity-0 mx-auto max-w-5xl"
        >
          <div
            ref={containerRef}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.7)] select-none cursor-col-resize"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* After image (full, bottom layer) */}
            <Image
              src="/images/after-new.jpg"
              alt="Subaru Crosstrek after baby blue color change vinyl wrap by Wrap City"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px"
              quality={85}
              priority
            />

            {/* Before image (clipped, top layer) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src="/images/before-new.jpg"
                alt="Subaru Crosstrek before wrap in original silver paint with bumper damage"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px"
                quality={85}
                priority
              />
            </div>

            {/* Labels */}
            <div className="pointer-events-none absolute top-5 left-5 z-10">
              <span className="inline-block rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white border border-white/10">
                Before
              </span>
            </div>
            <div className="pointer-events-none absolute top-5 right-5 z-10">
              <span className="inline-block rounded-full bg-power-red/90 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
                After
              </span>
            </div>

            {/* Slider divider line */}
            <div
              className="absolute top-0 bottom-0 z-20 w-[2px] bg-white/90 pointer-events-none"
              style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
            >
              {/* Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-near-black/80 backdrop-blur-sm shadow-lg transition-transform duration-200 ${
                    isDragging ? "scale-110" : ""
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 5l-5 7 5 7" />
                    <path d="M16 5l5 7-5 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Gradient edges for depth */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
          </div>

          {/* Hint text */}
          <p className="mt-6 text-center text-white/30 text-sm tracking-wide flex items-center justify-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 5l-5 7 5 7" />
              <path d="M16 5l5 7-5 7" />
            </svg>
            Drag to compare
          </p>
        </div>
      </div>
    </section>
  );
}
