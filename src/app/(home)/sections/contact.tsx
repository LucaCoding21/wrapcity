"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const serviceOptions = [
  "Full Vehicle Wrap",
  "Partial Wrap / Accents",
  "Paint Protection Film (PPF)",
  "Ceramic Coating",
  "Commercial / Fleet Wrap",
  "Custom Design",
  "Not Sure - Need Consultation",
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    service: "",
    message: "",
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Form slides in from left
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }

      // Map slides in from right
      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-near-black py-24 md:py-32"
    >
      {/* Diagonal top separator */}
      <div
        className="absolute left-0 right-0 top-0 h-20 bg-charcoal"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 100%)",
        }}
      />

      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-0">
          {/* Left - Contact Form */}
          <div ref={formRef} className="lg:pr-12">
            <p className="label-uppercase mb-4 text-power-red">Get In Touch</p>
            <h2 className="heading-section text-white">
              BOOK YOUR CONSULTATION
            </h2>
            <div className="mt-4 h-1 w-24 bg-power-red" />

            <p className="mt-6 text-lg text-white/60">
              Ready to transform your vehicle? Fill out the form below and we&apos;ll
              get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Name & Email Row */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="form-label">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Phone & Vehicle Row */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="vehicle" className="form-label">
                    Vehicle (Make/Model)
                  </label>
                  <input
                    type="text"
                    id="vehicle"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="2024 BMW M4"
                  />
                </div>
              </div>

              {/* Service Dropdown */}
              <div>
                <label htmlFor="service" className="form-label">
                  Service Interested In *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="form-input cursor-pointer"
                >
                  <option value="">Select a service...</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="form-label">
                  Tell Us About Your Project
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input resize-none"
                  placeholder="Describe your vision, any specific colors or finishes you're interested in..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-skewed w-full bg-power-red py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-power-red-dark md:w-auto md:px-12"
              >
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Right - Map & Info */}
          <div
            ref={mapRef}
            className="relative lg:border-l lg:border-white/10 lg:pl-12"
          >
            {/* Red accent bar */}
            <div className="absolute left-0 top-0 hidden h-32 w-1 bg-power-red lg:block" />

            {/* Contact Info */}
            <div className="mb-8">
              <h3 className="font-display text-xl font-bold uppercase text-white">
                Visit Our Shop
              </h3>
              <div className="mt-4 space-y-4 text-white/70">
                <div className="flex items-start gap-4">
                  <svg
                    className="mt-1 h-5 w-5 shrink-0 text-power-red"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <p className="font-medium text-white">1234 Wrap City Lane</p>
                    <p>Los Angeles, CA 90210</p>
                    <a
                      href="#"
                      className="mt-1 inline-flex items-center gap-1 text-sm text-power-red hover:underline"
                    >
                      Get Directions
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg
                    className="mt-1 h-5 w-5 shrink-0 text-power-red"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div>
                    <a
                      href="tel:+15551234567"
                      className="font-medium text-white hover:text-power-red"
                    >
                      (555) 123-4567
                    </a>
                    <p>Call or text anytime</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg
                    className="mt-1 h-5 w-5 shrink-0 text-power-red"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <div>
                    <a
                      href="mailto:info@wrapcity.com"
                      className="font-medium text-white hover:text-power-red"
                    >
                      info@wrapcity.com
                    </a>
                    <p>We reply within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="mt-8">
                <h4 className="font-display text-lg font-bold uppercase text-white">
                  Business Hours
                </h4>
                <div className="mt-3 space-y-1 text-sm text-white/70">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-white">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-white">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-white/40">Closed</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex gap-4">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-300 hover:border-warm-coral hover:bg-warm-coral/10 hover:text-warm-coral"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-300 hover:border-warm-coral hover:bg-warm-coral/10 hover:text-warm-coral"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-300 hover:border-warm-coral hover:bg-warm-coral/10 hover:text-warm-coral"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="relative mt-8 h-64 overflow-hidden rounded-lg lg:h-80">
              {/* Dark styled map placeholder - in production, use actual Google Maps embed with dark styling */}
              <div className="absolute inset-0 bg-charcoal">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-white/20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <p className="mt-2 text-sm text-white/40">Interactive Map</p>
                  </div>
                </div>
                {/* Map pin marker */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                  <div className="relative">
                    <div className="h-8 w-8 rounded-full bg-power-red shadow-lg" />
                    <div className="absolute left-1/2 top-full h-4 w-1 -translate-x-1/2 bg-power-red" />
                  </div>
                </div>
              </div>
              {/* Red accent border */}
              <div className="absolute inset-0 rounded-lg border-2 border-power-red/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
