"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

type GalleryItem = {
  src: string;
  alt: string;
  type: "image" | "video";
  poster?: string;
};

const galleryItems: GalleryItem[] = [
  {
    src: "/images/jeep4.jpg",
    alt: "Metallic Green Jeep Wrangler",
    type: "image",
  },
  {
    src: "/images/1.jpg",
    alt: "Custom Sprint Car Graphics",
    type: "image",
  },
  {
    src: "/images/motorcycle.jpeg",
    alt: "Harley Davidson Bagger",
    type: "image",
  },
  {
    src: "/images/van auto show 4.jpg",
    alt: "Matte Gray Tesla Model Y",
    type: "image",
  },
  {
    src: "/images/red-car.jpeg",
    alt: "Glossy Red Ford Mustang",
    type: "image",
  },
  {
    src: "/images/murals.jpeg",
    alt: "Floral Wall Mural",
    type: "image",
  },
  {
    src: "/images/2.jpg",
    alt: "Sprint Car Side View",
    type: "image",
  },
  {
    src: "/images/vehicle-wrap.jpg",
    alt: "Steeda Mustang",
    type: "image",
  },
  {
    src: "/images/IMG_0108.jpeg",
    alt: "Custom Harley Davidson",
    type: "image",
  },
  {
    src: "/images/commercial.jpeg",
    alt: "Commercial Office Graphics",
    type: "image",
  },
  {
    src: "/images/jeep1.jpg",
    alt: "Jeep Wrangler Detail",
    type: "image",
  },
];


export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll("[data-gallery-item]");
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="bg-near-black py-24 md:py-32"
    >
      <div className="container-wide">
        {/* Minimal Header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <p className="text-power-red text-sm font-medium tracking-widest uppercase mb-3">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            My Work
          </h2>
        </div>

        {/* Clean Grid - 3 columns on desktop */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
        >
          {galleryItems.map((item, i) => (
            <div
              key={i}
              data-gallery-item
              onClick={() => openLightbox(i)}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden bg-white/5"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                quality={85}
                loading="lazy"
              />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            </div>
          ))}
        </div>

        {/* Minimal CTA */}
        <div className="mt-16 md:mt-20 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 text-white hover:text-power-red transition-colors duration-300 group"
          >
            <span className="text-sm font-medium tracking-widest uppercase">
              Start Your Project
            </span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Minimal Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Nav */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
            }}
            className="absolute left-4 md:left-8 z-50 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev + 1) % galleryItems.length);
            }}
            className="absolute right-4 md:right-8 z-50 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Content */}
          <div
            className="relative max-h-[85vh] max-w-[90vw] md:max-w-[80vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryItems[lightboxIndex]?.src || ""}
              alt={galleryItems[lightboxIndex]?.alt || ""}
              width={1400}
              height={900}
              className="max-h-[85vh] w-auto object-contain"
              quality={90}
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm font-light tracking-widest">
            {lightboxIndex + 1} / {galleryItems.length}
          </div>
        </div>
      )}
    </section>
  );
}
