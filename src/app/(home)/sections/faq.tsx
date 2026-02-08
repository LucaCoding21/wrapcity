"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeader from "@/components/ui/section-header";
import Button from "@/components/ui/button";
import Magnetic from "@/components/animations/magnetic";

const faqs = [
  {
    question: "How much does a wrap cost?",
    answer:
      "A full color change wrap typically ranges from $3,500\u2013$6,500 depending on the vehicle size and film chosen. PPF starts at $1,500 for a front-end package. We provide exact quotes during your free consultation \u2014 no hidden fees, no surprises.",
  },
  {
    question: "Will a wrap damage my paint?",
    answer:
      "No. When installed and removed by certified professionals, a wrap actually protects your factory paint. We use only premium 3M and Avery Dennison films designed to remove cleanly.",
  },
  {
    question: "How long does a wrap last?",
    answer:
      "Our color change wraps last 5\u20137 years with proper care. PPF lasts up to 10 years and comes with a manufacturer warranty. Ceramic coatings protect for 3\u20139 years depending on the package.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Most full wraps are completed in 3\u20135 business days. Partial wraps and PPF packages can often be done in 1\u20132 days. We\u2019ll give you an exact timeline during your consultation.",
  },
  {
    question: "Do you offer financing?",
    answer:
      "Yes. We offer flexible financing options to make your transformation accessible. Ask about our payment plans during your consultation.",
  },
  {
    question: "What if I change my mind about the color?",
    answer:
      "That\u2019s the beauty of wrapping \u2014 it\u2019s completely reversible. And with our digital mockup process, you\u2019ll see exactly how your car will look before we start. We don\u2019t proceed until you\u2019re 100% satisfied with the design.",
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
    <section ref={sectionRef} className="relative bg-surface py-32">
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
                <Button
                  href="tel:+15551234567"
                  variant="outline"
                  size="md"
                  className="w-full"
                >
                  Call (555) 123-4567
                </Button>
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  Book a Consultation
                </Button>
              </div>
            </div>
          </div>

          {/* Sticky CTA Panel — Desktop Only */}
          <div className="hidden lg:block">
            <div className="sticky top-[120px] rounded-lg border border-border bg-surface-light p-8">
              <h3 className="font-display text-xl font-bold tracking-tight">
                Still have questions?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Talk to our team directly. We respond within 2 hours during
                business hours.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Magnetic strength={0.15}>
                  <a
                    href="tel:+15551234567"
                    data-cursor="pointer"
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-accent/30 py-3 text-xs font-medium uppercase tracking-widest text-accent-light transition-all duration-300 hover:border-accent hover:bg-accent/10"
                  >
                    Call (555) 123-4567
                  </a>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <a
                    href="sms:+15551234567"
                    data-cursor="pointer"
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-border py-3 text-xs font-medium uppercase tracking-widest text-muted transition-all duration-300 hover:border-accent/30 hover:text-foreground"
                  >
                    Text Us
                  </a>
                </Magnetic>
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  className="mt-2 w-full"
                >
                  Book a Consultation
                </Button>
              </div>
              <p className="mt-6 text-[11px] uppercase tracking-widest text-muted-dark">
                Mon&ndash;Fri 8am&ndash;6pm &middot; Sat 9am&ndash;3pm
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
