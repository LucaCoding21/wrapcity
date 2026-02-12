"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import SectionHeader from "@/components/ui/section-header";
import Button from "@/components/ui/button";
import { projects } from "@/data/projects";

const featured = projects.slice(0, 4);

const clips = {
  left: { from: "inset(0% 100% 0% 0%)", to: "inset(0% 0% 0% 0%)" },
  right: { from: "inset(0% 0% 0% 100%)", to: "inset(0% 0% 0% 0%)" },
  up: { from: "inset(100% 0% 0% 0%)", to: "inset(0% 0% 0% 0%)" },
};

type Dir = keyof typeof clips;

/* ── Gallery Card ── */
function GalleryCard({
  project,
  reveal,
  className,
}: {
  project: (typeof projects)[0];
  reveal: Dir;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const wrap = el.querySelector<HTMLElement>("[data-wrap]");
    const img = el.querySelector<HTMLElement>("[data-img]");
    if (!wrap || !img) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(wrap, { clipPath: clips[reveal].from }, {
        clipPath: clips[reveal].to,
        duration: 1.3,
        ease: "power4.inOut",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });

      gsap.fromTo(img, { scale: 1.15 }, {
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });

      gsap.to(img, {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reveal]);

  return (
    <div ref={ref} className={className}>
      <Link
        href={`/work/${project.slug}`}
        className="group relative block h-full"
        data-cursor="view"
      >
        <div className="relative h-full overflow-hidden rounded-xl">
          {/* Image */}
          <div data-wrap className="relative h-full overflow-hidden">
            <div data-img className="absolute inset-[-4%]">
              <Image
                src="/images/jeep4.jpg"
                alt={project.title}
                fill
                className="object-cover object-[center_60%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
          </div>

          {/* Always-visible bottom info bar */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 pb-5 pt-16">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">
              {project.category}
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-white md:text-xl">
              {project.title}
            </h3>
            <p className="text-xs text-white/40">{project.car}</p>
          </div>

          {/* Hover overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-xl border border-accent/0 transition-all duration-500 group-hover:border-accent/20 group-hover:shadow-[inset_0_0_60px_rgba(193,127,110,0.06)]" />

          {/* Hover arrow */}
          <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* ── Main Section ── */
export default function Portfolio() {
  return (
    <section className="relative py-32 mobile-cv-auto">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <SectionHeader
          eyebrow="Our Work"
          heading="Built different"
          subtitle="Real wraps. Real cars. See what rolls out of our shop."
        />

        {/* Bento Grid */}
        <div className="mt-16 grid grid-cols-1 gap-3 md:grid-cols-12 md:grid-rows-[280px_280px] md:gap-4 lg:grid-rows-[320px_320px]">
          {/* Large left — spans both rows */}
          <GalleryCard
            project={featured[0]}
            reveal="left"
            className="md:col-span-7 md:row-span-2"
          />

          {/* Top right */}
          <GalleryCard
            project={featured[1]}
            reveal="right"
            className="aspect-[4/3] md:col-span-5 md:aspect-auto"
          />

          {/* Bottom right */}
          <GalleryCard
            project={featured[2]}
            reveal="up"
            className="aspect-[4/3] md:col-span-5 md:aspect-auto"
          />
        </div>

        {/* Full-width cinematic bottom card */}
        <div className="mt-3 md:mt-4">
          <GalleryCard
            project={featured[3]}
            reveal="up"
            className="aspect-[16/9] md:aspect-[21/9]"
          />
        </div>

        {/* CTAs */}
        <div className="mt-16 flex flex-col items-center gap-4 md:flex-row md:justify-center">
          <Button href="/work" variant="outline" size="md">
            See All Our Work
          </Button>
          <Button href="/contact" variant="primary" size="md">
            Start Your Transformation
          </Button>
        </div>
      </div>
    </section>
  );
}
