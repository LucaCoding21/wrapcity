"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const facebookPosts = [
  {
    image: "/images/jeep4.jpg",
    text: "Just finished this stunning matte black wrap on a 2024 BMW M4! The owner wanted something sleek and aggressive - mission accomplished!",
    date: "2 days ago",
    likes: 247,
    comments: 32,
  },
  {
    image: "/images/jeep4.jpg",
    text: "Full PPF installation complete on this beautiful Porsche 992 GT3. Invisible protection for peace of mind on the track and street.",
    date: "5 days ago",
    likes: 189,
    comments: 24,
  },
  {
    image: "/images/jeep4.jpg",
    text: "Chrome delete + ceramic coating on this Mercedes G Wagon. Clean, modern, and ready to turn heads.",
    date: "1 week ago",
    likes: 312,
    comments: 45,
  },
  {
    image: "/images/jeep4.jpg",
    text: "Another fleet transformation complete! 15 vehicles wrapped and branded for our friends at XYZ Logistics. Mobile advertising at its finest!",
    date: "2 weeks ago",
    likes: 156,
    comments: 18,
  },
];

export default function FacebookPosts() {
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
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("[data-post-card]");
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
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
      className="relative bg-white py-24 md:py-32"
    >
      <div className="container-wide">
        {/* Section Header */}
        <div ref={headerRef} className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <p className="label-uppercase mb-4 text-warm-coral">Follow Our Work</p>
            <h2 className="heading-section text-near-black">
              LATEST FROM FACEBOOK
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-3 rounded-full bg-[#1877F2] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#166FE5]"
          >
            {/* Facebook Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Follow Us
          </a>
        </div>

        {/* Posts Grid */}
        <div
          ref={cardsRef}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {facebookPosts.map((post, i) => (
            <div
              key={i}
              data-post-card
              className="group overflow-hidden rounded-lg bg-near-black transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-power-red/10"
            >
              {/* Image with slanted clip */}
              <div
                className="relative h-48 overflow-hidden"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
                }}
              >
                <Image
                  src={post.image}
                  alt="Facebook post"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="line-clamp-3 text-sm leading-relaxed text-white/70">
                  {post.text}
                </p>

                {/* Meta */}
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs text-white/40">{post.date}</span>
                  <div className="flex items-center gap-4 text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-warm-coral"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
