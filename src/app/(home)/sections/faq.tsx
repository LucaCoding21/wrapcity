"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeader from "@/components/ui/section-header";
import Magnetic from "@/components/animations/magnetic";

const faqs = [
  {
    question: "How long does a car wrap last?",
    answer:
      "Our color change wraps last 5 to 7 years with proper care. The longevity depends on factors like sun exposure, washing habits, and how the vehicle is stored. We use only premium 3M and Avery Dennison materials with manufacturer warranty to ensure maximum durability.",
  },
  {
    question: "Will a car wrap damage my paint?",
    answer:
      "No. When installed and removed by certified professionals, a wrap actually protects your factory paint. We use only premium 3M and Avery Dennison films designed to remove cleanly. That's why we're a certified installer.",
  },
  {
    question: "Car wrap vs painting: which is better?",
    answer:
      "Wrapping offers several advantages over painting: it's reversible, protects your original paint, costs less than a quality paint job, and can be completed faster. Plus, you can change colors again in the future without affecting your vehicle's value.",
  },
  {
    question: "What is your car wrap warranty?",
    answer:
      "We back all our work with the manufacturer's warranty, typically 5-7 years for color change wraps. As a 3M and Avery Dennison certified installer, you're getting materials and installation that meet the highest industry standards.",
  },
  {
    question: "Why does a full wrap take 7 days at your shop?",
    answer:
      "As a single-installer wrap shop, we take the time to meticulously prepare and wrap every panel. Unlike larger shops that rush vehicles through an assembly line, your car gets our complete attention. This ensures a flawless, long-lasting result.",
  },
  {
    question: "Do you wrap Harley Davidsons and motorcycles?",
    answer:
      "Yes! We specialize in motorcycle wraps including Harley Davidson baggers, sport bikes, and cruisers. The same single-installer precision we apply to vehicles ensures every curve and detail of your bike is perfectly wrapped.",
  },
  {
    question: "Do you offer chrome delete for Tesla and other vehicles?",
    answer:
      "Absolutely. Chrome delete is one of our most popular services, especially for Tesla owners. We wrap chrome trim in satin black, gloss black, or body-matched colors for a clean, modern look.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !itemsRef.current) return;

    const items = itemsRef.current.querySelectorAll("[data-faq-item]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: itemsRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="relative bg-surface py-32 mobile-cv-auto">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* FAQ Column */}
          <div>
            <SectionHeader
              eyebrow="Common Questions"
              heading="Everything you need to know"
            />

            <div ref={itemsRef} className="mt-12">
              {faqs.map((faq, i) => (
                <div key={i} data-faq-item className="border-b border-border">
                  <button
                    data-cursor="pointer"
                    className="flex w-full items-center justify-between py-6 text-left"
                    onClick={() =>
                      setOpenIndex(openIndex === i ? null : i)
                    }
                  >
                    <span className="pr-8 font-display text-base font-medium tracking-tight md:text-lg">
                      {faq.question}
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className={`shrink-0 text-muted transition-transform duration-300 ${
                        openIndex === i ? "rotate-180" : ""
                      }`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div
                    className="grid transition-all duration-300"
                    style={{
                      gridTemplateRows: openIndex === i ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-12 text-sm leading-relaxed text-muted">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-10 lg:hidden">
              <p className="mb-4 text-sm text-muted">Still have questions?</p>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+16045102400"
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-accent to-accent/80 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:shadow-xl hover:shadow-accent/40 hover:scale-[1.02]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="animate-pulse"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Call (604) 510-2400
                </a>
                <a
                  href="sms:+16045005391"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-border py-3 text-xs font-medium uppercase tracking-widest text-muted transition-all duration-300 hover:border-accent/30 hover:text-foreground"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Text +1 604-500-5391
                </a>
              </div>
            </div>
          </div>

          {/* Sticky CTA Panel — Desktop Only */}
          <div className="hidden lg:block">
            <div className="sticky top-[120px] rounded-lg border border-border bg-surface-light p-8">
              <h3 className="font-display text-xl font-bold tracking-tight">
                Ready to transform your vehicle?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Get in touch for a free quote. We'll discuss your vision and
                provide a detailed estimate.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Magnetic strength={0.15}>
                  <a
                    href="tel:+16045102400"
                    data-cursor="pointer"
                    className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-accent to-accent/80 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:shadow-xl hover:shadow-accent/40 hover:scale-[1.02]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="animate-pulse"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Call (604) 510-2400
                  </a>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <a
                    href="sms:+16045005391"
                    data-cursor="pointer"
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-border py-3 text-xs font-medium uppercase tracking-widest text-muted transition-all duration-300 hover:border-accent/30 hover:text-foreground"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Text +1 604-500-5391
                  </a>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <a
                    href="https://www.instagram.com/wrapcity604"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="pointer"
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-border py-3 text-xs font-medium uppercase tracking-widest text-muted transition-all duration-300 hover:border-accent/30 hover:text-foreground"
                  >
                    Follow Us on Instagram
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
