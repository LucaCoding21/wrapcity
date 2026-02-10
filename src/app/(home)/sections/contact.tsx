"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const wrapTypeOptions = [
  "Color Change Wrap",
  "Printed Wrap",
  "Not Sure Yet",
];

const doorOptions = [
  "Two Door",
  "Four Door",
  "Other (Truck, SUV, Van, etc.)",
];

const doorJambOptions = [
  "Yes, include door jambs",
  "No, exterior only",
  "Not sure, need advice",
];

const referralOptions = [
  "Google Search",
  "Instagram",
  "Facebook",
  "TikTok",
  "Friend/Family Referral",
  "Saw a wrapped vehicle",
  "Other",
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  wrapType: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  currentColor: string;
  doorType: string;
  desiredColor: string;
  doorJamb: string;
  referral: string;
  designIdeas: string;
  additionalInfo: string;
};

const TOTAL_STEPS = 4;

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    wrapType: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    currentColor: "",
    doorType: "",
    desiredColor: "",
    doorJamb: "",
    referral: "",
    designIdeas: "",
    additionalInfo: "",
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
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

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedStep1 = formData.name && formData.email;
  const canProceedStep2 = formData.wrapType && formData.vehicleYear && formData.vehicleMake && formData.vehicleModel;
  const canProceedStep3 = formData.currentColor && formData.doorType && formData.desiredColor && formData.doorJamb;
  const canSubmit = canProceedStep1 && canProceedStep2 && canProceedStep3 && formData.referral;

  const stepTitles = [
    "Your Info",
    "Vehicle Details",
    "Wrap Preferences",
    "Final Details",
  ];

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
              Ready to transform your vehicle? Fill out the form below and I&apos;ll
              get back to you within 24 hours.
            </p>

            {/* Step Indicator */}
            <div className="mt-8 mb-8">
              <div className="flex items-center justify-between mb-2">
                {stepTitles.map((title, index) => (
                  <div
                    key={title}
                    className={`flex flex-col items-center ${
                      index + 1 === currentStep
                        ? "text-power-red"
                        : index + 1 < currentStep
                        ? "text-white"
                        : "text-white/40"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 transition-all duration-300 ${
                        index + 1 === currentStep
                          ? "bg-power-red text-white"
                          : index + 1 < currentStep
                          ? "bg-white/20 text-white"
                          : "bg-white/10 text-white/40"
                      }`}
                    >
                      {index + 1 < currentStep ? (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className="text-xs hidden sm:block">{title}</span>
                  </div>
                ))}
              </div>
              {/* Progress Bar */}
              <div className="h-1 bg-white/10 rounded-full mt-4">
                <div
                  className="h-full bg-power-red rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Step 1: Contact Info */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-fadeIn">
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
                  <div>
                    <label htmlFor="phone" className="form-label">
                      Phone Number (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="(604) 123-4567"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Vehicle Info */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <label htmlFor="wrapType" className="form-label">
                      Wrap Type *
                    </label>
                    <select
                      id="wrapType"
                      name="wrapType"
                      required
                      value={formData.wrapType}
                      onChange={handleChange}
                      className="form-input cursor-pointer"
                    >
                      <option value="">Select wrap type...</option>
                      {wrapTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-5 md:grid-cols-3">
                    <div>
                      <label htmlFor="vehicleYear" className="form-label">
                        Year *
                      </label>
                      <input
                        type="text"
                        id="vehicleYear"
                        name="vehicleYear"
                        required
                        value={formData.vehicleYear}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="2024"
                      />
                    </div>
                    <div>
                      <label htmlFor="vehicleMake" className="form-label">
                        Make *
                      </label>
                      <input
                        type="text"
                        id="vehicleMake"
                        name="vehicleMake"
                        required
                        value={formData.vehicleMake}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="BMW"
                      />
                    </div>
                    <div>
                      <label htmlFor="vehicleModel" className="form-label">
                        Model *
                      </label>
                      <input
                        type="text"
                        id="vehicleModel"
                        name="vehicleModel"
                        required
                        value={formData.vehicleModel}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="M4"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Wrap Preferences */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="currentColor" className="form-label">
                        Current Vehicle Color *
                      </label>
                      <input
                        type="text"
                        id="currentColor"
                        name="currentColor"
                        required
                        value={formData.currentColor}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Black"
                      />
                    </div>
                    <div>
                      <label htmlFor="desiredColor" className="form-label">
                        Desired Color & Finish *
                      </label>
                      <input
                        type="text"
                        id="desiredColor"
                        name="desiredColor"
                        required
                        value={formData.desiredColor}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Satin Black, Gloss Red, etc."
                      />
                    </div>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="doorType" className="form-label">
                        Door Configuration *
                      </label>
                      <select
                        id="doorType"
                        name="doorType"
                        required
                        value={formData.doorType}
                        onChange={handleChange}
                        className="form-input cursor-pointer"
                      >
                        <option value="">Select option...</option>
                        {doorOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="doorJamb" className="form-label">
                        Door Jamb Option *
                      </label>
                      <select
                        id="doorJamb"
                        name="doorJamb"
                        required
                        value={formData.doorJamb}
                        onChange={handleChange}
                        className="form-input cursor-pointer"
                      >
                        <option value="">Select option...</option>
                        {doorJambOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {formData.wrapType === "Printed Wrap" && (
                    <div>
                      <label htmlFor="designIdeas" className="form-label">
                        Design Ideas
                      </label>
                      <textarea
                        id="designIdeas"
                        name="designIdeas"
                        rows={3}
                        value={formData.designIdeas}
                        onChange={handleChange}
                        className="form-input resize-none"
                        placeholder="Describe your design vision..."
                      />
                    </div>
                  )}

                  {/* Color Catalog */}
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-medium text-white mb-3">
                      Need help choosing? Browse our color catalogs:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="/colour1.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-sm text-white transition-colors"
                      >
                        <svg className="w-4 h-4 text-power-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        Color Catalog 1
                      </a>
                      <a
                        href="/colour2.jpg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-sm text-white transition-colors"
                      >
                        <svg className="w-4 h-4 text-power-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        Color Catalog 2
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Final Details */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <label htmlFor="referral" className="form-label">
                      How did you hear about Wrap City? *
                    </label>
                    <select
                      id="referral"
                      name="referral"
                      required
                      value={formData.referral}
                      onChange={handleChange}
                      className="form-input cursor-pointer"
                    >
                      <option value="">Select option...</option>
                      {referralOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="additionalInfo" className="form-label">
                      Additional Information (optional)
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      rows={3}
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      className="form-input resize-none"
                      placeholder="Any body damage, rust, or other details I should know about..."
                    />
                  </div>

                  {/* Photo Upload Note */}
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-white/70">
                      <span className="font-medium text-white">Vehicle Photos:</span>{" "}
                      Please send photos of your vehicle to{" "}
                      <a href="mailto:taylor@wrapcity.co" className="text-power-red hover:underline">
                        taylor@wrapcity.co
                      </a>{" "}
                      after submitting this form.
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <h4 className="font-medium text-white mb-3">Summary</h4>
                    <div className="space-y-2 text-sm text-white/70">
                      <p><span className="text-white/50">Name:</span> {formData.name}</p>
                      <p><span className="text-white/50">Vehicle:</span> {formData.vehicleYear} {formData.vehicleMake} {formData.vehicleModel}</p>
                      <p><span className="text-white/50">Wrap Type:</span> {formData.wrapType}</p>
                      <p><span className="text-white/50">Desired Color:</span> {formData.desiredColor}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 md:flex-none px-8 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all duration-300 text-sm font-medium uppercase tracking-widest"
                  >
                    Back
                  </button>
                )}
                {currentStep < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && !canProceedStep1) ||
                      (currentStep === 2 && !canProceedStep2) ||
                      (currentStep === 3 && !canProceedStep3)
                    }
                    className="flex-1 md:flex-none btn-skewed bg-power-red py-3 px-8 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-power-red-dark disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Continue</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="flex-1 md:flex-none btn-skewed bg-power-red py-3 px-8 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-power-red-dark disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Submit Request</span>
                  </button>
                )}
              </div>
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
                Visit My Shop
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
                    <p className="font-medium text-white">1312 184 St</p>
                    <p>Langley Twp, BC V2Z 1K2</p>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=1312+184+St,+Langley+Twp,+BC+V2Z+1K2"
                      target="_blank"
                      rel="noopener noreferrer"
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
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <div>
                    <a
                      href="mailto:taylor@wrapcity.co"
                      className="font-medium text-white hover:text-power-red"
                    >
                      taylor@wrapcity.co
                    </a>
                    <p>I reply within 24 hours</p>
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
                    <span>Monday to Friday</span>
                    <span className="text-white">8:00 AM to 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-white">9:00 AM to 4:00 PM</span>
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
                  href="https://www.facebook.com/p/Wrap-City-100091623488082/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-300 hover:border-warm-coral hover:bg-warm-coral/10 hover:text-warm-coral"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/wrapcity604?fbclid=IwY2xjawP3bYJleHRuA2FlbQIxMABicmlkETEzSnpxNU9TdjVFUFVScGl3c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHui00MJ3KLiiLlBW44NJ0U8wlWeePpM4NKRQIxWxFf_6D6kNGTRN43DbLiA-_aem_nsKKnJICwtUSmzOIYetQKQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-300 hover:border-warm-coral hover:bg-warm-coral/10 hover:text-warm-coral"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="relative mt-8 h-64 overflow-hidden rounded-lg lg:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2614.5!2d-122.6756!3d49.0234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485d0e7e7c9f0e1%3A0x0!2s1312%20184%20St%2C%20Langley%20Twp%2C%20BC%20V2Z%201K2!5e0!3m2!1sen!2sca!4v1699999999999!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(83%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wrap City Location - 1312 184 St, Langley Twp, BC"
              />
              {/* Red accent border */}
              <div className="absolute inset-0 rounded-lg border-2 border-power-red/30 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
