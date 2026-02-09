"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const reviews = [
  {
    quote: "Absolutely incredible work! My Tesla looks better than new. The attention to detail is unmatched.",
    author: "Michael R.",
    vehicle: "Tesla Model S",
    rating: 5,
  },
  {
    quote: "Professional team, flawless finish. They transformed my M4 with a stunning matte black wrap. Highly recommend!",
    author: "Sarah T.",
    vehicle: "BMW M4",
    rating: 5,
  },
  {
    quote: "Best wrap shop in the city. The PPF installation was perfect - completely invisible protection.",
    author: "James K.",
    vehicle: "Porsche 911",
    rating: 5,
  },
  {
    quote: "They transformed my Porsche with their ceramic coating. The shine is absolutely insane!",
    author: "David M.",
    vehicle: "Porsche Cayenne",
    rating: 5,
  },
];

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-[#FBBC05]"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function GoogleReviews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
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
              trigger: sectionRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("[data-review-card]");
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute -left-32 top-20 h-64 w-64 rounded-full bg-power-red/5 blur-3xl" />
      <div className="absolute -right-32 bottom-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-16 flex flex-col items-center text-center">
          {/* Google Badge - Elevated design */}
          <div className="mb-8 inline-flex items-center gap-5 rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 px-8 py-5 shadow-xl shadow-gray-200/50">
            {/* Google Logo */}
            <svg viewBox="0 0 24 24" width="48" height="48">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>

            <div className="text-left">
              <div className="flex items-center gap-3">
                <span className="font-display text-4xl font-bold text-near-black">4.9</span>
                <StarRating count={5} />
              </div>
              <p className="mt-1 text-sm font-medium text-charcoal">Based on 120+ verified reviews</p>
            </div>
          </div>

          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-near-black md:text-5xl lg:text-6xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 max-w-xl text-lg text-charcoal/70">
            Real experiences from real customers. We take pride in every vehicle we transform.
          </p>
        </div>

        {/* Review Cards Grid */}
        <div
          ref={cardsRef}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {reviews.map((review, i) => (
            <div
              key={i}
              data-review-card
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50/50 p-8 shadow-lg shadow-gray-200/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-300/50"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-power-red/0 to-power-red/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Quote Icon - Top left accent */}
              <div className="relative mb-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-power-red/10">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-power-red"
                  >
                    <path
                      d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z"
                      fill="currentColor"
                    />
                    <path
                      d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>

              {/* Stars */}
              <div className="relative">
                <StarRating count={review.rating} />
              </div>

              {/* Quote */}
              <p className="relative mt-5 text-base leading-relaxed text-charcoal">
                &ldquo;{review.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="relative mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
                {/* Avatar placeholder */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-power-red text-lg font-bold text-white">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-near-black">{review.author}</p>
                  <p className="text-sm text-charcoal/60">{review.vehicle}</p>
                </div>
              </div>

              {/* Google Icon - Corner badge */}
              <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Read More Link - More prominent CTA */}
        <div className="mt-14 text-center">
          <a
            href="#"
            className="group inline-flex items-center gap-3 rounded-full border-2 border-near-black bg-near-black px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-transparent hover:text-near-black"
          >
            Read All Reviews on Google
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
