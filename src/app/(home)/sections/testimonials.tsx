"use client";

import SectionHeader from "@/components/ui/section-header";
import StaggerGrid from "@/components/animations/stagger-grid";
import Button from "@/components/ui/button";
import { testimonials } from "@/data/testimonials";

function StarRating() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-accent"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <SectionHeader
          eyebrow="Client Reviews"
          heading="Hear it from them"
          align="center"
        />

        <StaggerGrid
          className="mt-16 grid gap-6 md:grid-cols-3"
          stagger={0.15}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-grid-item
              className="group rounded-lg border border-border bg-surface p-8 transition-all duration-500 hover:-translate-y-1 hover:border-accent/20"
            >
              <StarRating />
              <blockquote className="mt-5 text-base leading-relaxed text-foreground/90 md:text-lg">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <div>
                  <p className="font-display text-sm font-bold text-accent-light">
                    {t.author}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {t.car} &middot; {t.service}
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-muted-dark">
                  Google Review
                </span>
              </div>
            </div>
          ))}
        </StaggerGrid>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted">
            120+ five-star reviews on Google
          </p>
          <Button href="https://google.com/maps" variant="outline" size="sm">
            Read More Reviews
          </Button>
        </div>
      </div>
    </section>
  );
}
