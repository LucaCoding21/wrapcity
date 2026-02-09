"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const galleryImages = [
  {
    src: "/images/jeep4.jpg",
    alt: "Matte Black BMW M4",
    vehicle: "BMW M4",
    wrap: "Matte Black",
    size: "large",
    rotate: 2,
  },
  {
    src: "/images/jeep4.jpg",
    alt: "Gloss Red Porsche 911",
    vehicle: "Porsche 911",
    wrap: "Gloss Racing Red",
    size: "medium",
    rotate: -2,
  },
  {
    src: "/images/jeep4.jpg",
    alt: "Satin Blue Tesla Model 3",
    vehicle: "Tesla Model 3",
    wrap: "Satin Blue",
    size: "medium",
    rotate: 1,
  },
  {
    src: "/images/jeep4.jpg",
    alt: "Chrome Delete Mercedes",
    vehicle: "Mercedes G-Wagon",
    wrap: "Chrome Delete",
    size: "large",
    rotate: -1,
  },
  {
    src: "/images/jeep4.jpg",
    alt: "Matte Army Green Urus",
    vehicle: "Lamborghini Urus",
    wrap: "Matte Army Green",
    size: "medium",
    rotate: 2,
  },
  {
    src: "/images/jeep4.jpg",
    alt: "PPF Install GT3",
    vehicle: "Porsche GT3",
    wrap: "Full PPF",
    size: "medium",
    rotate: -2,
  },
  {
    src: "/images/jeep4.jpg",
    alt: "Satin Purple Audi R8",
    vehicle: "Audi R8",
    wrap: "Satin Purple",
    size: "large",
    rotate: 1,
  },
  {
    src: "/images/jeep4.jpg",
    alt: "Fleet Wrap",
    vehicle: "Commercial Fleet",
    wrap: "Custom Branding",
    size: "medium",
    rotate: -1,
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
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

      // Gallery items stagger animation
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll("[data-gallery-item]");
        gsap.fromTo(
          items,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
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

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative bg-near-black py-24 md:py-32"
    >
      <div className="container-wide">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <p className="label-uppercase mb-4 text-power-red">Our Work</p>
          <h2 className="heading-section text-white">
            THE GALLERY
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 bg-power-red" />
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60">
            Real wraps. Real cars. Every project represents our commitment to perfection.
          </p>
        </div>

        {/* Masonry Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          {galleryImages.map((image, i) => (
            <div
              key={i}
              data-gallery-item
              className={`group relative overflow-hidden ${
                image.size === "large"
                  ? "col-span-2 row-span-2 aspect-square"
                  : "aspect-[4/3]"
              }`}
              style={{
                transform: `rotate(${image.rotate}deg)`,
              }}
            >
              {/* Image */}
              <div className="relative h-full w-full overflow-hidden rounded-lg">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{
                    transform: `rotate(${-image.rotate}deg) scale(1.15)`,
                  }}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-near-black via-near-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Info on hover */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-500 group-hover:translate-y-0">
                  <p className="text-xs uppercase tracking-widest text-power-red">
                    {image.wrap}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-bold text-white">
                    {image.vehicle}
                  </h3>
                </div>

                {/* Red border on hover */}
                <div className="absolute inset-0 rounded-lg border-2 border-power-red opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="btn-skewed inline-flex items-center gap-3 bg-power-red px-10 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-power-red-dark"
          >
            <span>Start Your Transformation</span>
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
