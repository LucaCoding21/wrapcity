"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionHeader from "@/components/ui/section-header";
import Magnetic from "@/components/animations/magnetic";

// ── Types ──

type ContentBlock =
  | { type: "text"; value: string }
  | { type: "list"; items: string[] }
  | { type: "heading"; value: string };

interface FaqItem {
  category: string;
  question: string;
  answer: ContentBlock[];
}

interface CategoryMeta {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

// ── Helpers ──

function text(value: string): ContentBlock {
  return { type: "text", value };
}
function list(items: string[]): ContentBlock {
  return { type: "list", items };
}
function heading(value: string): ContentBlock {
  return { type: "heading", value };
}

// ── Category Metadata ──

const categoryMeta: CategoryMeta[] = [
  {
    id: "Vinyl Basics",
    label: "Vinyl Basics",
    description: "What vinyl wrap is, how it works, and what to expect",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "Services",
    label: "Services",
    description: "Architectural wrap, PPF, and paint vs wrap",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: "Process & Care",
    label: "Process & Care",
    description: "Timelines, durability, warranty, and maintenance",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "Pricing",
    label: "Pricing & Payments",
    description: "Costs, deposits, and payment methods",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "Commercial",
    label: "Commercial & Fleet",
    description: "Fleet branding, insurance, and project coordination",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: "Location",
    label: "Location & Hours",
    description: "Where we are and areas we serve",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

// ── FAQ Data ──

const faqs: FaqItem[] = [
  // ── Vinyl Basics ──
  {
    category: "Vinyl Basics",
    question: "What is vinyl wrap?",
    answer: [
      text(
        "Vinyl wrap is a premium, high-performance film professionally applied to vehicles, architectural surfaces, storefront glass, and commercial assets to transform appearance, protect original finishes, and elevate branding."
      ),
      text(
        "At Wrap City, we install commercial-grade films designed for long-term durability, color depth, and precision finish, whether for custom vehicles, fleet branding, storefront advertising, or architectural transformations in Surrey and the Lower Mainland."
      ),
    ],
  },
  {
    category: "Vinyl Basics",
    question: "How thick is vinyl wrap?",
    answer: [
      text(
        "Professional vehicle wrap films are typically 2–4 mils thick, with an additional protective laminate layer for UV resistance and durability."
      ),
      text(
        "Architectural films vary depending on application and finish but are engineered for both aesthetic realism and long-term performance."
      ),
    ],
  },
  {
    category: "Vinyl Basics",
    question: "Does vinyl wrap damage the surface?",
    answer: [
      text(
        "No. When installed and removed correctly on a properly prepared surface, vinyl wrap does not damage factory paint or structurally sound walls."
      ),
      text(
        "In fact, wrap can help preserve OEM paint from UV exposure and minor surface wear."
      ),
    ],
  },
  {
    category: "Vinyl Basics",
    question: "Can vinyl wrap be removed?",
    answer: [
      text("Yes. Vinyl wrap is completely removable."),
      text(
        "When removed professionally, it restores the original surface beneath, provided the surface was in good condition prior to installation."
      ),
    ],
  },
  {
    category: "Vinyl Basics",
    question: "What happens if the wrap gets damaged?",
    answer: [
      text("One advantage of wrap over paint is sectional repair."),
      text(
        "If a panel becomes damaged, we can often replace only the affected section rather than refinishing the entire vehicle or wall."
      ),
      text(
        "This makes commercial fleet maintenance and storefront branding updates far more efficient."
      ),
    ],
  },
  {
    category: "Vinyl Basics",
    question: "Will vinyl wrap hide surface damage?",
    answer: [
      text("Vinyl is a conformable film, not a filler."),
      text("It will not conceal:"),
      list([
        "Deep scratches",
        "Rust",
        "Peeling clear coat",
        "Non-OEM or failing repaint work",
        "Heavy orange peel",
        "Damaged rubber trim",
        "Compromised ABS plastics",
      ]),
      text(
        "Surface condition directly affects adhesion and final appearance. We assess all projects prior to installation."
      ),
    ],
  },

  // ── Services ──
  {
    category: "Services",
    question: "What is architectural wrap?",
    answer: [
      text(
        "Architectural wrap is a high-end vinyl surface film used to transform interior and exterior spaces without demolition or reconstruction."
      ),
      text(
        "We install premium finishes including 3M DI-NOC architectural films, offering realistic wood, stone, metal, matte, gloss, and specialty textures."
      ),
      text("Applications include:"),
      list([
        "Office feature walls",
        "Reception desks",
        "Elevators",
        "Retail interiors",
        "Residential upgrades",
        "Wayfinding systems",
        "Community wall graphics",
      ]),
      text(
        "Architectural vinyl offers a cost-effective alternative to renovation while delivering a refined, modern finish."
      ),
    ],
  },
  {
    category: "Services",
    question: "Do you offer PPF or ceramic coating?",
    answer: [
      text(
        "Yes. Both are now offered in-house at our Langley studio."
      ),
      text(
        "Paint Protection Film (PPF) is a transparent, self-healing urethane film that shields your paint from rock chips, road debris, and scratches."
      ),
      text(
        "Our professional ceramic coating bonds to paint, vinyl, PPF, and marine surfaces. Packages are available in 1, 3, and 5-year options for vehicles and boats."
      ),
    ],
  },
  {
    category: "Services",
    question: "Paint vs Wrap: Which is better?",
    answer: [
      heading("Wrap Advantages:"),
      list([
        "Fully reversible",
        "Protects OEM paint",
        "Faster turnaround",
        "Endless design flexibility",
        "More cost-effective for color changes",
        "Ideal for commercial branding",
      ]),
      heading("Paint Advantages:"),
      list([
        "Permanent",
        "May increase resale value if done professionally",
        "Better suited for heavily damaged panels requiring repair",
      ]),
      text(
        "For branding, customization, and commercial fleet applications in Surrey and White Rock, vinyl wrap is typically the superior option."
      ),
    ],
  },

  // ── Process & Care ──
  {
    category: "Process & Care",
    question: "How long does vinyl wrap last?",
    answer: [
      text("Durability depends on material, exposure, and maintenance."),
      text("Typical lifespan:"),
      list([
        "Vehicle wraps: 5–7 years",
        "Architectural interior films: 7–10+ years",
        "Exterior commercial graphics: 3–7 years",
      ]),
      text(
        "All Wrap City clients receive professional care and maintenance instructions to maximize longevity."
      ),
    ],
  },
  {
    category: "Process & Care",
    question: "Is there a warranty?",
    answer: [
      text(
        "Yes. We use premium vinyl films backed by manufacturer warranties (often up to 5 years depending on material and application)."
      ),
      text("Warranty details are provided per project."),
    ],
  },
  {
    category: "Process & Care",
    question: "How long will it take to complete a project?",
    answer: [
      text(
        "Wrap City is a single-installer shop that takes exceptional care and attention to detail with every vehicle wrap. Unlike larger shops with multiple installers that rush projects to meet high volumes, we believe your vehicle deserves preparation and focus to ensure a flawless, long-lasting result. We plan our schedule with proper time allotment to ensure your project gets done properly."
      ),
      text(
        "Commercial wraps can take anywhere from 1–3 days, depending on the size and complexity of the project."
      ),
      text(
        "While a full color change wrap typically requires up to 10 days, this timeline ensures we can work carefully and thoroughly. In some cases, your vehicle may be completed sooner, depending on complexity and schedule. Our priority is delivering a high quality wrap that stands out, is durable, and built to last."
      ),
      list([
        "Chrome deletes and removals: Please plan to leave your vehicle for up to 3 business days.",
        "Roof wraps and hood wraps: Please plan to leave your vehicle for 1 full business day.",
      ]),
    ],
  },
  {
    category: "Process & Care",
    question: "How do I care for my wrap?",
    answer: [
      text("To maintain a luxury finish:"),
      list([
        "Hand wash recommended",
        "Avoid abrasive brushes",
        "Avoid directing high-pressure spray at edges",
        "Remove contaminants (fuel, bird droppings, tree sap) promptly",
        "Use non-harsh cleaners",
      ]),
      text("Care instructions are provided at pickup."),
    ],
  },

  // ── Pricing ──
  {
    category: "Pricing",
    question: "How much does a wrap cost?",
    answer: [
      text("Pricing depends on:"),
      list([
        "Vehicle size or surface area",
        "Design complexity",
        "Material selection",
        "Surface condition",
        "Installation scope",
      ]),
      text(
        "For accurate pricing, please complete our quote form for a personalized estimate."
      ),
    ],
  },
  {
    category: "Pricing",
    question: "How does payment work?",
    answer: [
      text(
        "A 50% non-refundable deposit is required upon booking to secure your installation date and materials."
      ),
      text(
        "The remaining 50% is due upon project completion and pickup."
      ),
    ],
  },
  {
    category: "Pricing",
    question: "What payment methods do you accept?",
    answer: [
      text(
        "Accepted payment methods are provided during booking confirmation."
      ),
    ],
  },

  // ── Commercial ──
  {
    category: "Commercial",
    question: "Are you insured?",
    answer: [
      text("Yes. Wrap City is fully insured for:"),
      list([
        "Vehicle installations",
        "Commercial properties",
        "Fleet projects",
        "Marine installations",
      ]),
    ],
  },
  {
    category: "Commercial",
    question: "Can you handle fleet and multi-location branding projects?",
    answer: [
      text(
        "Yes. We coordinate consistent branding across fleets, storefronts, offices, and multiple business locations throughout the Lower Mainland."
      ),
    ],
  },
  {
    category: "Commercial",
    question: "Do you provide design previews?",
    answer: [
      text(
        "Yes. For commercial fleet and branding clients, we provide digital mockups and sample swatches prior to print production. Multiple revisions are available before final approval."
      ),
    ],
  },
  {
    category: "Commercial",
    question: "Can you work with tight deadlines?",
    answer: [
      text(
        "When scheduling allows, we can accommodate expedited commercial projects. Contact us directly to discuss timelines."
      ),
    ],
  },

  // ── Location ──
  {
    category: "Location",
    question: "Where are you located?",
    answer: [
      text(
        "Wrap City is located at 106-20058 Industrial Ave in Langley, BC."
      ),
      text("We serve:"),
      list([
        "Langley",
        "Surrey",
        "White Rock",
        "South Surrey",
        "Cloverdale",
        "Port Kells",
        "Maple Ridge",
        "Mission",
        "Delta",
        "Tsawwassen",
        "North Shore",
        "Vancouver",
        "East Van / West Van",
        "Greater Vancouver",
        "The Lower Mainland",
      ]),
      text("All installations are by appointment only."),
    ],
  },
];

// ── Sub-components ──

function AnswerContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-3 pb-6 pr-4 md:pr-12">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <p key={i} className="text-sm font-semibold text-white/80">
              {block.value}
            </p>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="ml-4 space-y-1.5">
              {block.items.map((item, j) => (
                <li
                  key={j}
                  className="flex items-start gap-2 text-sm leading-relaxed text-muted"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-power-red" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-sm leading-relaxed text-muted">
            {block.value}
          </p>
        );
      })}
    </div>
  );
}

// ── Main Component ──

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory
    ? faqs.filter((f) => f.category === activeCategory)
    : [];

  // Entrance animation for category cards
  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll("[data-category-card]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate FAQ items when a category is selected
  useEffect(() => {
    if (!activeCategory || !listRef.current) return;

    const items = listRef.current.querySelectorAll("[data-faq-item]");
    gsap.fromTo(
      items,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: "power3.out",
      }
    );
  }, [activeCategory]);

  const selectCategory = (id: string) => {
    setActiveCategory(id);
    setOpenIndex(null);
  };

  const goBack = () => {
    setActiveCategory(null);
    setOpenIndex(null);
  };

  const activeMeta = categoryMeta.find((c) => c.id === activeCategory);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative bg-surface py-32 mobile-cv-auto"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* FAQ Column */}
          <div>
            <SectionHeader
              eyebrow="Common Questions"
              heading="Everything you need to know"
            />

            {/* ── Category Cards (landing view) ── */}
            {!activeCategory && (
              <div
                ref={cardsRef}
                className="mt-12 grid gap-4 sm:grid-cols-2"
              >
                {categoryMeta.map((cat) => {
                  const count = faqs.filter(
                    (f) => f.category === cat.id
                  ).length;
                  return (
                    <button
                      key={cat.id}
                      data-category-card
                      data-cursor="pointer"
                      onClick={() => selectCategory(cat.id)}
                      className="group flex items-start gap-4 rounded-lg border border-border bg-surface-light p-5 text-left transition-all duration-300 hover:border-power-red/50 hover:bg-white/[0.04]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-power-red/10 text-power-red transition-colors duration-300 group-hover:bg-power-red/20">
                        {cat.icon}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-display text-base font-bold tracking-tight text-white">
                          {cat.label}
                        </h4>
                        <p className="mt-1 text-sm leading-snug text-muted">
                          {cat.description}
                        </p>
                        <p className="mt-2 text-xs font-medium text-power-red">
                          {count} {count === 1 ? "question" : "questions"}
                        </p>
                      </div>
                      <svg
                        className="mt-1 h-5 w-5 shrink-0 text-white/20 transition-colors duration-300 group-hover:text-power-red"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  );
                })}
              </div>
            )}

            {/* ── FAQ Accordion (category selected) ── */}
            {activeCategory && (
              <div className="mt-10">
                {/* Back button + category title */}
                <button
                  onClick={goBack}
                  data-cursor="pointer"
                  className="mb-6 flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-white"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  All Categories
                </button>

                <div className="mb-8 flex items-center gap-3">
                  {activeMeta && (
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-power-red/10 text-power-red">
                      {activeMeta.icon}
                    </div>
                  )}
                  <h3 className="font-display text-xl font-bold tracking-tight text-white">
                    {activeMeta?.label}
                  </h3>
                </div>

                {/* Questions */}
                <div ref={listRef}>
                  {filtered.map((faq, i) => {
                    const isOpen = openIndex === i;
                    return (
                      <div
                        key={i}
                        data-faq-item
                        className="border-b border-border"
                      >
                        <button
                          data-cursor="pointer"
                          className="flex w-full items-center justify-between py-5 text-left"
                          onClick={() =>
                            setOpenIndex(isOpen ? null : i)
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
                              isOpen ? "rotate-180" : ""
                            }`}
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </button>
                        <div
                          className="grid transition-all duration-300"
                          style={{
                            gridTemplateRows: isOpen ? "1fr" : "0fr",
                          }}
                        >
                          <div className="overflow-hidden">
                            <AnswerContent blocks={faq.answer} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mobile CTA */}
            <div className="mt-10 lg:hidden">
              <p className="mb-4 text-sm text-muted">
                Still have questions?
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+16045102400"
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-accent to-accent/80 py-4 text-sm font-bold uppercase tracking-widest text-near-black shadow-lg shadow-accent/25 transition-all duration-300 hover:shadow-xl hover:shadow-accent/40 hover:scale-[1.02]"
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
                Get in touch for a quote. We&apos;ll discuss your
                vision and provide a detailed estimate.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Magnetic strength={0.15}>
                  <a
                    href="tel:+16045102400"
                    data-cursor="pointer"
                    className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-accent to-accent/80 py-4 text-sm font-bold uppercase tracking-widest text-near-black shadow-lg shadow-accent/25 transition-all duration-300 hover:shadow-xl hover:shadow-accent/40 hover:scale-[1.02]"
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
