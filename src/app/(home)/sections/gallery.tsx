"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type GalleryItem = {
  src: string;
  alt: string;
  title?: string;
  category?: string;
};

const galleryItems: GalleryItem[] = [
  // ── Existing gallery images ──
  {
    src: "/images/jeep4.jpg",
    alt: "Metallic green Jeep Wrangler full color change wrap by Wrap City in South Surrey BC",
    title: "Forest Guardian",
    category: "Color Change",
  },
  {
    src: "/images/gallery/tesla-model-y-bronze-showroom.jpg",
    alt: "Tesla Model Y matte bronze full color change wrap displayed in showroom by Wrap City",
    title: "Bronze Stealth",
    category: "Color Change",
  },
  {
    src: "/images/1.jpg",
    alt: "Custom sprint car racing graphics and vinyl wrap installation in Surrey BC",
    title: "Track Warrior",
    category: "Racing Graphics",
  },
  {
    src: "/images/gallery/harley-skull-fender.jpg",
    alt: "Harley Davidson bagger with custom skull rear fender wrap and red LED accents",
    title: "Skull Rider",
    category: "Motorcycle",
  },
  {
    src: "/images/motorcycle.jpeg",
    alt: "Harley Davidson Bagger custom motorcycle wrap with premium vinyl finish",
    title: "Road King",
    category: "Motorcycle",
  },
  {
    src: "/images/gallery/purple-ranger-side.jpg",
    alt: "Purple color change vinyl wrap on Ford Ranger truck full side profile by Wrap City",
    title: "Purple Reign",
    category: "Color Change",
  },
  {
    src: "/images/van auto show 4.jpg",
    alt: "Matte gray Tesla Model Y vehicle wrap showcased at Vancouver auto show",
    title: "Stealth Mode",
    category: "Color Change",
  },
  {
    src: "/images/gallery/mustang-racing-stripes.jpg",
    alt: "Ford Mustang with custom racing stripes vinyl wrap done by Wrap City",
    title: "Rally Stripes",
    category: "Racing Graphics",
  },
  {
    src: "/images/red-car.jpeg",
    alt: "Glossy red Ford Mustang full body color change wrap by certified installer",
    title: "Cherry Bomb",
    category: "Color Change",
  },
  {
    src: "/images/gallery/subaru-crosstrek-blue-side.jpg",
    alt: "Subaru Crosstrek baby blue matte color change wrap full side view",
    title: "Sky Blue",
    category: "Color Change",
  },
  {
    src: "/images/murals.jpeg",
    alt: "Custom floral wall mural vinyl installation for interior architectural design",
    title: "Floral Dreams",
    category: "Architectural",
  },
  {
    src: "/images/gallery/stormtrooper-graphic.jpg",
    alt: "Custom Star Wars Stormtrooper graphic vinyl wrap on black sports car quarter panel",
    title: "Stormtrooper",
    category: "Custom Graphics",
  },
  {
    src: "/images/2.jpg",
    alt: "Sprint car side profile showing detailed custom vinyl graphics and decals",
    title: "Speed Demon",
    category: "Racing Graphics",
  },
  {
    src: "/images/gallery/tesla-model-y-matte-bronze-detail.jpg",
    alt: "Tesla Model Y matte bronze wrap headlight and hood detail shot",
    title: "Bronze Detail",
    category: "Color Change",
  },
  {
    src: "/images/IMG_0108.jpeg",
    alt: "Custom Harley Davidson motorcycle with matte black and chrome vinyl wrap",
    title: "Dark Knight",
    category: "Motorcycle",
  },
  {
    src: "/images/gallery/quarter-midget-neon-splatter.jpg",
    alt: "Quarter midget race car with neon pink purple and yellow splatter vinyl wrap",
    title: "Neon Racer",
    category: "Racing Graphics",
  },
  {
    src: "/images/commercial.jpeg",
    alt: "Commercial office vinyl graphics and branded wall wrap for business interiors",
    title: "Brand Forward",
    category: "Commercial",
  },
  {
    src: "/images/gallery/f150-gutters-commercial.jpg",
    alt: "Ford F-150 commercial fleet wrap for All About Gutters Inc business branding",
    title: "Gutters Fleet",
    category: "Commercial Fleet",
  },
  {
    src: "/images/jeep1.jpg",
    alt: "Jeep Wrangler detail shot showing precision vinyl wrap edge work and finish quality",
    title: "Trail Blazer",
    category: "Color Change",
  },
  {
    src: "/images/gallery/miata-black-gloss-front.jpg",
    alt: "Mazda Miata NA with glossy black vinyl wrap front three quarter view",
    title: "Midnight Miata",
    category: "Color Change",
  },
  {
    src: "/images/commercial-fleet.jpg",
    alt: "Monster Energy commercial fleet van wrap with branded graphics by Wrap City",
    title: "Monster Fleet",
    category: "Commercial Fleet",
  },
  {
    src: "/images/gallery/motorcycle-tank-red-black.jpg",
    alt: "Motorcycle fuel tank wrapped in matte red and black vinyl two-tone finish",
    title: "Red Moto Tank",
    category: "Motorcycle",
  },
  {
    src: "/images/gallery/octopus-tailgate-graphic.jpg",
    alt: "Custom pink octopus cartoon tailgate graphic vinyl wrap on truck bed",
    title: "Octopus Tailgate",
    category: "Custom Graphics",
  },
  {
    src: "/images/gallery/purple-ranger-detail.jpg",
    alt: "Purple Ford Ranger wrap close-up showing Wrap City badge and fender flare detail",
    title: "Purple Detail",
    category: "Color Change",
  },
  {
    src: "/images/gallery/sprinter-van-wrap-design.jpg",
    alt: "Mercedes Sprinter van full commercial wrap design mockup for Watson Ink branding",
    title: "Sprinter Design",
    category: "Commercial Fleet",
  },
  {
    src: "/images/gallery/subaru-crosstrek-blue-rear.jpg",
    alt: "Subaru Crosstrek baby blue color change wrap rear quarter panel view",
    title: "Blue Rear",
    category: "Color Change",
  },
  {
    src: "/images/gallery/subaru-crosstrek-blue-profile.jpg",
    alt: "Subaru Crosstrek baby blue matte vinyl wrap full driver side profile",
    title: "Blue Profile",
    category: "Color Change",
  },
  {
    src: "/images/gallery/f150-chrome-delete-before.jpg",
    alt: "Ford F-150 before chrome delete wrap showing original blue and chrome trim",
    title: "Before Chrome Delete",
    category: "Chrome Delete",
  },
  {
    src: "/images/gallery/f150-chrome-delete-after.jpg",
    alt: "Ford F-150 after professional chrome delete wrap completed by Wrap City",
    title: "After Chrome Delete",
    category: "Chrome Delete",
  },
  {
    src: "/images/gallery/custom-helmet-wrap.jpg",
    alt: "Custom vinyl wrapped helmet with abstract polka dot purple and white design",
    title: "Custom Helmet",
    category: "Custom Graphics",
  },
  {
    src: "/images/gallery/neon-splatter-panel-side.jpg",
    alt: "Custom neon splatter design vinyl wrap on race car body panel in purple yellow and pink",
    title: "Neon Panel",
    category: "Racing Graphics",
  },
  {
    src: "/images/gallery/neon-splatter-panel-top.jpg",
    alt: "Race car body panel with vibrant neon splatter wrap design top-down angle",
    title: "Splatter Art",
    category: "Racing Graphics",
  },
  {
    src: "/images/gallery/pro-laser-signage.jpg",
    alt: "Pro 1 Laser illuminated vinyl signage and lettering installation",
    title: "Laser Signage",
    category: "Commercial",
  },
  {
    src: "/images/gallery/capri-quarter-midget.jpg",
    alt: "Capri branded quarter midget race car with custom vinyl graphics in workshop",
    title: "Capri Racer",
    category: "Racing Graphics",
  },
  {
    src: "/images/gallery/tesla-model-y-matte-bronze-front.jpg",
    alt: "Tesla Model Y matte bronze color change wrap front view with headlights on",
    title: "Bronze Front",
    category: "Color Change",
  },
  {
    src: "/images/gallery/civic-matte-gray-wrap.jpg",
    alt: "Honda Civic matte gray full body color change vinyl wrap by Wrap City",
    title: "Gray Ghost",
    category: "Color Change",
  },
  {
    src: "/images/gallery/truck-bumper-white-wrap.jpg",
    alt: "Truck front bumper being wrapped in white vinyl showing installation process",
    title: "Bumper Wrap",
    category: "Partial Wrap",
  },
  {
    src: "/images/gallery/ram-grille-white-wrap.jpg",
    alt: "Ram truck grille wrapped in glossy white vinyl with black badge detail",
    title: "White Grille",
    category: "Partial Wrap",
  },
  {
    src: "/images/gallery/civic-matte-gray-side.jpg",
    alt: "Honda Civic matte gray vinyl wrap full side view showcasing clean finish",
    title: "Gray Side",
    category: "Color Change",
  },
  {
    src: "/images/gallery/miata-black-gloss-side.jpg",
    alt: "Mazda Miata NA glossy black wrap full side profile with hardtop",
    title: "Miata Profile",
    category: "Color Change",
  },
  {
    src: "/images/gallery/custom-wheel-pink-accent.jpg",
    alt: "Custom vinyl wrapped wheel with gloss black and pink magenta accent spokes",
    title: "Pink Spokes",
    category: "Custom Graphics",
  },
  {
    src: "/images/gallery/office-privacy-film.jpg",
    alt: "Commercial office frosted glass privacy film installation for modern workspace",
    title: "Privacy Film",
    category: "Architectural",
  },
  {
    src: "/images/gallery/bmw-z3-dark-wrap.jpg",
    alt: "BMW Z3 roadster with dark gloss vinyl wrap rear three quarter view",
    title: "Dark Z3",
    category: "Color Change",
  },
  {
    src: "/images/gallery/trailer-before-wrap.jpg",
    alt: "Plain silver enclosed trailer before commercial vinyl wrap application",
    title: "Trailer Before",
    category: "Commercial Fleet",
  },
  {
    src: "/images/gallery/columbus-contracting-trailer.jpg",
    alt: "BC Columbus Contracting branded trailer wrap with compass logo design",
    title: "Columbus Trailer",
    category: "Commercial Fleet",
  },
  {
    src: "/images/gallery/porsche-cayenne-pink-wheels.jpg",
    alt: "Black Porsche Cayenne SUV with custom pink vinyl wrapped wheels by Wrap City",
    title: "Pink Roller",
    category: "Custom Graphics",
  },
  {
    src: "/images/gallery/honda-civic-before-clear-coat.jpg",
    alt: "Honda Civic before clear coat restoration showing peeling paint on roof and trunk at Wrap City shop",
    title: "Civic Revival - Before",
    category: "Paint Correction",
  },
  {
    src: "/images/gallery/honda-civic-after-window-tint-rear.jpg",
    alt: "Honda Civic after window tint and clear coat restoration rear view by Wrap City luxury automotive styling",
    title: "Civic Revival - After",
    category: "Paint Correction",
  },
  {
    src: "/images/gallery/honda-civic-window-tint-side.jpg",
    alt: "Honda Civic with professional window tint and paint restoration side profile by Wrap City South Surrey BC",
    title: "Civic Revival",
    category: "Window Tint",
  },
];

/* ── Coverflow Card ── */
function CoverflowCard({
  item,
  position,
  onClick,
  onView,
}: {
  item: GalleryItem;
  position: number;
  onClick: () => void;
  onView: () => void;
}) {
  const isCenter = position === 0;

  const getTransforms = () => {
    if (position === 0) {
      return {
        translateX: "0%",
        translateZ: "0px",
        rotateY: "0deg",
        scale: 1,
        zIndex: 50,
        opacity: 1,
      };
    }

    const direction = position > 0 ? 1 : -1;
    const absPos = Math.abs(position);

    return {
      translateX: `${direction * (40 + absPos * 25)}%`,
      translateZ: `${-120 - absPos * 60}px`,
      rotateY: `${-direction * 50}deg`,
      scale: 0.8 - absPos * 0.08,
      zIndex: 40 - absPos * 10,
      opacity: absPos > 2 ? 0 : 1 - absPos * 0.2,
    };
  };

  const transforms = getTransforms();

  return (
    <div
      onClick={isCenter ? onView : onClick}
      className={cn(
        "pointer-events-auto absolute left-1/2 top-1/2 w-[85vw] md:w-[520px] lg:w-[680px]",
        "transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "cursor-pointer"
      )}
      style={{
        transform: `
          translate(-50%, -50%)
          translateX(${transforms.translateX})
          translateZ(${transforms.translateZ})
          rotateY(${transforms.rotateY})
          scale(${transforms.scale})
        `,
        zIndex: transforms.zIndex,
        opacity: transforms.opacity,
      }}
    >
      <div
        className={cn(
          "group relative overflow-hidden rounded-xl",
          "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]",
          isCenter && "ring-1 ring-white/10"
        )}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className={cn(
              "object-cover object-center transition-transform duration-700 ease-out",
              isCenter && "group-hover:scale-105"
            )}
            sizes="(max-width: 768px) 340px, (max-width: 1024px) 520px, 680px"
            quality={85}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Reflection effect on bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
        </div>


        {/* Hover overlay for center card */}
        {isCenter && (
          <>
            <div className="pointer-events-none absolute inset-0 rounded-xl border border-power-red/0 transition-all duration-500 group-hover:border-power-red/40" />
            <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Arrow Button ── */
function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute top-1/2 z-60 -translate-y-1/2",
        "flex h-14 w-14 items-center justify-center rounded-full",
        "bg-near-black/80 backdrop-blur-sm border border-white/10",
        "text-white/60 transition-all duration-300",
        "hover:bg-power-red hover:text-white hover:border-power-red hover:scale-110",
        "cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-power-red/50",
        direction === "left" ? "left-4 md:left-12 lg:left-20" : "right-4 md:right-12 lg:right-20"
      )}
      aria-label={`Go to ${direction === "left" ? "previous" : "next"} image`}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={direction === "right" ? "rotate-180" : ""}
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
}

/* ── Dot Indicators (windowed – shows max 7 dots) ── */
function DotIndicators({
  total,
  current,
  onSelect,
}: {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}) {
  const maxDots = 7;

  // If few enough items, show all dots
  if (total <= maxDots) {
    return (
      <div className="mt-10 flex flex-col items-center gap-3">
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === current
                  ? "w-10 bg-power-red"
                  : "w-2 bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Windowed dots: show maxDots centered around current
  const half = Math.floor(maxDots / 2);
  let start = Math.max(0, current - half);
  let end = start + maxDots - 1;

  if (end >= total) {
    end = total - 1;
    start = end - maxDots + 1;
  }

  return (
    <div className="mt-10 flex flex-col items-center gap-3">
      <div className="flex items-center justify-center gap-1.5">
        {Array.from({ length: maxDots }).map((_, i) => {
          const dotIndex = start + i;
          const distFromActive = Math.abs(dotIndex - current);
          const isActive = dotIndex === current;
          const isEdge = (i === 0 && start > 0) || (i === maxDots - 1 && end < total - 1);

          return (
            <button
              key={dotIndex}
              onClick={() => onSelect(dotIndex)}
              className={cn(
                "rounded-full transition-all duration-300",
                isActive
                  ? "h-2 w-8 bg-power-red"
                  : isEdge
                    ? "h-1.5 w-1.5 bg-white/15"
                    : distFromActive > 2
                      ? "h-1.5 w-1.5 bg-white/20 hover:bg-white/40"
                      : "h-2 w-2 bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Go to image ${dotIndex + 1}`}
            />
          );
        })}
      </div>
      <span className="text-xs tracking-widest text-white/30">
        {current + 1} / {total}
      </span>
    </div>
  );
}

/* ── Main Gallery Section ── */
export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalItems = galleryItems.length;

  // Navigate with infinite loop
  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === "Escape") setLightboxOpen(false);
        if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev + 1) % totalItems);
        if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev - 1 + totalItems) % totalItems);
      } else {
        if (e.key === "ArrowLeft") goToPrev();
        if (e.key === "ArrowRight") goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, lightboxOpen, totalItems]);

  // Lightbox body scroll lock
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("lightbox-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");
    };
  }, [lightboxOpen]);

  // Auto-play carousel
  useEffect(() => {
    if (isDragging || lightboxOpen) return;

    const interval = setInterval(() => {
      goToNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [isDragging, lightboxOpen, goToNext]);

  // Touch/drag handling
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStart);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50;
    if (dragOffset > threshold) {
      goToPrev();
    } else if (dragOffset < -threshold) {
      goToNext();
    }
    setDragOffset(0);
  };

  // Calculate visible cards (show 5 cards: -2, -1, 0, 1, 2)
  const getVisibleCards = () => {
    const cards = [];
    for (let offset = -2; offset <= 2; offset++) {
      const index = (activeIndex + offset + totalItems) % totalItems;
      cards.push({ item: galleryItems[index], position: offset, index });
    }
    return cards;
  };

  // Open lightbox
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

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

      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
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
      id="gallery"
      ref={sectionRef}
      className="bg-near-black py-24 md:py-32 mobile-cv-auto overflow-hidden"
    >
      {/* Header */}
      <div className="container-wide">
        <div ref={headerRef} className="mb-3 md:mb-4 text-center opacity-0">
          <p className="text-power-red text-sm font-medium tracking-widest uppercase mb-3">
            Car Wrap Gallery
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            OUR WORK
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-white/50 text-lg">
            Browse samples of our color change wraps, commercial fleet graphics, racing liveries, motorcycle wraps, and custom designs.
          </p>
        </div>
      </div>

      {/* Coverflow Container */}
      <div
        ref={containerRef}
        className="relative h-[480px] md:h-[580px] lg:h-[700px] opacity-0"
        style={{ perspective: "1400px" }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* 3D Stage */}
        <div
          className="pointer-events-none relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            transform: isDragging ? `translateX(${dragOffset * 0.3}px)` : undefined,
          }}
        >
          {getVisibleCards().map(({ item, position, index }) => (
            <CoverflowCard
              key={`${item.src}-${index}`}
              item={item}
              position={position}
              onClick={() => goToIndex(index)}
              onView={() => openLightbox(index)}
            />
          ))}
        </div>

        {/* Clickable Side Zones - behind cards but still clickable in empty areas */}
        <button
          onClick={goToPrev}
          className="absolute left-0 top-0 z-10 h-full w-1/4 cursor-pointer bg-transparent focus:outline-none md:w-1/5"
          aria-label="Go to previous image"
        />
        <button
          onClick={goToNext}
          className="absolute right-0 top-0 z-10 h-full w-1/4 cursor-pointer bg-transparent focus:outline-none md:w-1/5"
          aria-label="Go to next image"
        />

        {/* Navigation Arrows */}
        <ArrowButton direction="left" onClick={goToPrev} />
        <ArrowButton direction="right" onClick={goToNext} />
      </div>

      {/* Dot Indicators */}
      <DotIndicators
        total={totalItems}
        current={activeIndex}
        onSelect={goToIndex}
      />

      {/* CTA */}
      <div className="mt-16 md:mt-20 text-center">
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          }}
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

      {/* Lightbox */}
      {lightboxOpen && createPortal(
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            className="absolute top-4 right-4 z-[60] w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-power-red hover:border-power-red transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Nav */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev - 1 + totalItems) % totalItems);
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
              setLightboxIndex((prev) => (prev + 1) % totalItems);
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
            {lightboxIndex + 1} / {totalItems}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
