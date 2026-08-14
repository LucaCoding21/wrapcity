"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";

const reviews = [
  {
    quote: "I couldn't be happier with my wrap! Taylor did an amazing job from start to finish, super professional, detail oriented, and easy to work with. The design turned out even better than I imagined, and the quality of the material is top notch. I get compliments on my vehicle all the time now, and it really helps my truck stand out. Highly recommend!",
    author: "Rob",
    rating: 5,
  },
  {
    quote: "I couldn't be happier with my experience at Wrap City! I had my BMW wrapped and the results are absolutely stunning. The attention to detail and quality of work were top notch, everything looks flawless. From start to finish, the service was professional, friendly, and efficient. She really took the time to make sure everything was perfect, and it shows.",
    author: "Hash",
    rating: 5,
  },
  {
    quote: "A greatful shoutout to Taylor Paige for wrapping my 92 miata. She personally came out and inspected and quoted my car and she had the experience and knowledge to walk me through what the process was. She was professional, sent me updates every day and I had no worries at all. I picked up the car amazed at her skill.",
    author: "Matthew",
    rating: 5,
  },
  {
    quote: "I had my canopy wrapped by Taylor at Wrap City. She did a great job and went above and beyond. She went over the wrap after with me to make sure I was happy. I recommend Wrap City!!!",
    author: "Randy",
    rating: 5,
  },
  {
    quote: "I got my F150 wrapped by Taylor and I could not be happier. I had a specific look I was going for and she helped make it happen. Super knowledgeable and pays attention to detail which I think is important for a wrap job. If you need your vehicle wrapped, I would definitely recommend her!",
    author: "Hardeep",
    rating: 5,
  },
];

function StarRating({ rating = 5, size = 18 }: { rating?: number; size?: number }) {
  const fullStars = Math.floor(rating);
  const partialFill = rating - fullStars;
  const emptyStars = 5 - fullStars - (partialFill > 0 ? 1 : 0);

  return (
    <div className="flex gap-1">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={`full-${i}`}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-[#FBBC05]"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      {/* Partial star */}
      {partialFill > 0 && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          className="text-[#FBBC05]"
        >
          <defs>
            <linearGradient id="partialFill">
              <stop offset={`${partialFill * 100}%`} stopColor="currentColor" />
              <stop offset={`${partialFill * 100}%`} stopColor="#E0E0E0" />
            </linearGradient>
          </defs>
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="url(#partialFill)"
          />
        </svg>
      )}
      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={`empty-${i}`}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="#E0E0E0"
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const isHoveredRef = useRef(false);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    if (tweenRef.current) {
      // Smoothly decelerate to a stop
      gsap.to(tweenRef.current, {
        timeScale: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    if (tweenRef.current) {
      // Smoothly accelerate back to normal speed
      gsap.to(tweenRef.current, {
        timeScale: 1,
        duration: 0.8,
        ease: "power2.in",
      });
    }
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    const scrollWidth = scrollContainer.scrollWidth / 2; // Half because we duplicate the content

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

      // Infinite scroll animation with GSAP for super smooth scrolling
      tweenRef.current = gsap.to(scrollContainer, {
        x: -scrollWidth,
        duration: 40,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % scrollWidth),
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      tweenRef.current = null;
    };
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
                <span className="font-display text-4xl font-bold text-near-black">4.4</span>
                <StarRating rating={4.4} />
              </div>
              <p className="mt-1 text-sm font-medium text-charcoal">Based on 22 Google reviews</p>
            </div>
          </div>

          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-near-black md:text-5xl lg:text-6xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 max-w-xl text-lg text-charcoal/70">
            Real experiences from real customers. We take pride in every vehicle we transform.
          </p>
        </div>

        {/* Auto-scrolling Review Carousel */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent" />

          <div className="overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-6 will-change-transform"
            >
              {/* Duplicate reviews for seamless loop */}
              {[...reviews, ...reviews].map((review, i) => (
                <div
                  key={i}
                  data-review-card
                  className="group relative w-[400px] flex-shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50/50 p-8 shadow-lg shadow-gray-200/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-300/50"
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
                    <StarRating rating={review.rating} />
                  </div>

                  {/* Quote */}
                  <p className="relative mt-5 line-clamp-4 text-base leading-relaxed text-charcoal">
                    &ldquo;{review.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="relative mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
                    {/* Avatar placeholder */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-power-red text-lg font-bold text-near-black">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-near-black">{review.author}</p>
                      <p className="text-sm text-charcoal/60">Google Review</p>
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
          </div>
        </div>

        {/* Read More Link - More prominent CTA */}
        <div className="mt-14 text-center">
          <a
            href="https://www.google.com/search?q=Wrap+City+Reviews&oq=wrap&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIOCAEQRRgnGDsYgAQYigUyDAgCEEUYORixAxiABDIGCAMQRRg9MgYIBBBFGD0yBggFEEUYPDIGCAYQRRg8MgYIBxBFGD3SAQgxNzAxajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x5485c512236ebe05:0xc0db54ad5998594e,1,,,,"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-power-red px-8 py-4 text-sm font-semibold uppercase tracking-widest text-near-black transition-all duration-300 hover:bg-power-red-dark"
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
