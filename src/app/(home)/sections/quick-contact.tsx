"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function QuickContact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/quick-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");
      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = formData.name && formData.email;

  return (
    <section
      ref={sectionRef}
      className="relative bg-near-black pb-10 pt-4"
    >
      <div className="container-wide">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mx-auto max-w-4xl"
        >
          {!isSubmitted ? (
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-center font-display text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                Have an idea for a project?
              </h3>

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-center">
                <input
                  type="text"
                  id="quick-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-power-red/50 md:w-48"
                  placeholder="Name"
                />
                <input
                  type="email"
                  id="quick-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-power-red/50 md:w-56"
                  placeholder="Email"
                />
                <input
                  type="tel"
                  id="quick-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-11 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-power-red/50 md:w-44"
                  placeholder="Phone"
                />
                <button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="h-11 w-full shrink-0 rounded-md bg-power-red px-6 text-sm font-semibold text-white transition-colors hover:bg-power-red-dark disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <svg
                className="h-5 w-5 text-green-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm text-white/70">
                Thanks! We&apos;ll be in touch within 24 hours.
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
