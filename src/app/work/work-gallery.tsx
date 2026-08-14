"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import TextReveal from "@/components/animations/text-reveal";
import Button from "@/components/ui/button";
import { projects, categories, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Layout configurations — each index gets a
   unique width, alignment, aspect ratio, reveal
   direction, and parallax speed. The pattern
   repeats for > 6 projects.
   ───────────────────────────────────────────── */
interface LayoutConfig {
  widthClass: string;
  align: string;
  aspect: string;
  reveal: "left" | "right" | "up" | "down";
  parallax: number;
  offset: string;
}

const layouts: LayoutConfig[] = [
  {
    widthClass: "md:w-[65%]",
    align: "md:mr-auto",
    aspect: "aspect-[3/2]",
    reveal: "left",
    parallax: 0.15,
    offset: "",
  },
  {
    widthClass: "md:w-[45%]",
    align: "md:ml-auto",
    aspect: "aspect-[4/3]",
    reveal: "right",
    parallax: 0.1,
    offset: "md:-mt-20",
  },
  {
    widthClass: "w-full",
    align: "",
    aspect: "aspect-[2.2/1]",
    reveal: "up",
    parallax: 0.2,
    offset: "mt-32",
  },
  {
    widthClass: "md:w-[50%]",
    align: "md:mr-auto",
    aspect: "aspect-[4/3]",
    reveal: "left",
    parallax: 0.12,
    offset: "mt-32",
  },
  {
    widthClass: "md:w-[40%]",
    align: "md:ml-auto",
    aspect: "aspect-[3/4]",
    reveal: "right",
    parallax: 0.18,
    offset: "md:-mt-24",
  },
  {
    widthClass: "md:w-[70%]",
    align: "md:mx-auto",
    aspect: "aspect-[3/2]",
    reveal: "up",
    parallax: 0.15,
    offset: "mt-32",
  },
];

/* ─────────────────────────────────────────────
   Editorial Card
   ───────────────────────────────────────────── */
function EditorialCard({
  project,
  layout,
  index,
  isActive,
}: {
  project: Project;
  layout: LayoutConfig;
  index: number;
  isActive: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !imageWrapperRef.current || !imageRef.current)
      return;

    const clipPaths: Record<string, { from: string; to: string }> = {
      left: {
        from: "inset(0% 100% 0% 0%)",
        to: "inset(0% 0% 0% 0%)",
      },
      right: {
        from: "inset(0% 0% 0% 100%)",
        to: "inset(0% 0% 0% 0%)",
      },
      up: {
        from: "inset(100% 0% 0% 0%)",
        to: "inset(0% 0% 0% 0%)",
      },
      down: {
        from: "inset(0% 0% 100% 0%)",
        to: "inset(0% 0% 0% 0%)",
      },
    };

    const ctx = gsap.context(() => {
      // ── Clip-path reveal ──
      gsap.fromTo(
        imageWrapperRef.current,
        { clipPath: clipPaths[layout.reveal].from },
        {
          clipPath: clipPaths[layout.reveal].to,
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // ── Counter-scale (Ken Burns unwind) ──
      gsap.fromTo(
        imageRef.current,
        { scale: 1.3 },
        {
          scale: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // ── Continuous parallax ──
      gsap.to(imageRef.current, {
        yPercent: layout.parallax * 100,
        ease: "none",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // ── Text elements fade-up ──
      const texts = cardRef.current!.querySelectorAll("[data-ed-text]");
      if (texts.length) {
        gsap.fromTo(
          texts,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, [layout]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "w-full transition-all duration-700",
        layout.widthClass,
        layout.align,
        layout.offset,
        isActive
          ? "opacity-100"
          : "pointer-events-none opacity-[0.12] grayscale"
      )}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group block"
        data-cursor="view"
      >
        {/* ── Watermark number ── */}
        <div className="relative">
          <span className="stroke-text pointer-events-none absolute -top-10 left-0 z-10 font-display text-[clamp(5rem,10vw,10rem)] font-bold leading-none md:-top-14">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* ── Image container ── */}
          <div className="relative overflow-hidden rounded-lg transition-shadow duration-700 group-hover:shadow-[0_0_80px_rgba(193,127,110,0.1)]">
            <div
              ref={imageWrapperRef}
              className={cn("relative overflow-hidden", layout.aspect)}
            >
              <div ref={imageRef} className="absolute inset-[-15%]">
                <Image
                  src="/images/jeep4.jpg"
                  alt={project.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 70vw"
                />
              </div>
            </div>

            {/* Hover accent border */}
            <div className="pointer-events-none absolute inset-0 rounded-lg border border-accent/0 transition-all duration-700 group-hover:border-accent/15" />
          </div>
        </div>

        {/* ── Project info ── */}
        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <span
              data-ed-text
              className="text-[10px] uppercase tracking-[0.3em] text-accent-light/60"
            >
              {project.category} &middot; {project.year}
            </span>
            <h3
              data-ed-text
              className="mt-2 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-tight tracking-tight"
            >
              {project.title}
            </h3>
            <p data-ed-text className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">
              {project.car} &middot; {project.description}
            </p>
          </div>
          <svg
            data-ed-text
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="mt-3 shrink-0 text-muted opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Work Gallery (page-level client component)
   ───────────────────────────────────────────── */
export default function WorkGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="pt-48 pb-16">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <TextReveal
            as="p"
            type="words"
            className="mb-4 text-xs uppercase tracking-[0.3em] text-accent-light"
          >
            Our Portfolio
          </TextReveal>
          <TextReveal
            as="h1"
            type="chars"
            stagger={0.03}
            className="font-display text-[clamp(3rem,9vw,9rem)] font-bold leading-[0.9] tracking-tight"
          >
            The Work
          </TextReveal>
          <TextReveal
            as="p"
            delay={0.3}
            className="mt-8 max-w-lg text-lg leading-relaxed text-muted"
          >
            Every vehicle tells a story. Here&apos;s where we write the next
            chapter.
          </TextReveal>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <div className="sticky top-0 z-20 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] gap-1 overflow-x-auto px-6 py-4 md:gap-2 md:px-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "relative shrink-0 rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.2em] transition-all duration-500",
                activeCategory === cat
                  ? "bg-accent/10 text-accent-light"
                  : "text-muted-dark hover:text-muted"
              )}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute -bottom-[17px] left-1/2 h-px w-6 -translate-x-1/2 bg-accent" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Editorial Grid ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          {projects.map((project, i) => (
            <EditorialCard
              key={project.slug}
              project={project}
              layout={layouts[i % layouts.length]}
              index={i}
              isActive={
                activeCategory === "All" ||
                project.category === activeCategory
              }
            />
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="border-t border-white/[0.06] py-32">
        <div className="mx-auto max-w-[1440px] px-6 text-center md:px-12">
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight">
            Ready to transform your ride?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Get in touch and let&apos;s make your vision a reality.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:justify-center">
            <Button href="/contact" variant="primary" size="lg">
              Get a Quote
            </Button>
            <Button href="/" variant="outline" size="lg">
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
