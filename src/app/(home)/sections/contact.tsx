"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

// ── Option lists ──────────────────────────────────────────────

const automotiveServiceOptions = [
  "Commercial Fleet Wrap",
  "Color Change Wrap",
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

const designNeededOptions = [
  "Yes",
  "Already have vector files",
  "Not sure",
];

const architecturalProjectTypes = [
  "Mural",
  "Wall Graphics",
  "Floor Graphics",
  "Wayfinding",
  "Storefront Advertising",
  "Window Frosting",
  "Privacy Film",
  "Decals",
  "Vinyl Lettering",
  "Other",
];

const architecturalSurfaceTypes = [
  "Glass",
  "Drywall",
  "Metal",
  "Concrete",
  "Tile",
  "Brick",
  "Other",
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

// ── Types ─────────────────────────────────────────────────────

type Category = "" | "automotive" | "architectural" | "municipal";

type FormData = {
  // shared
  category: Category;
  name: string;
  email: string;
  phone: string;

  // automotive
  serviceType: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  currentColor: string;
  doorType: string;
  desiredColor: string;
  doorJamb: string;
  designNeeded: string;
  perforatedWindowFilm: boolean;
  designIdeas: string;
  referral: string;
  additionalInfo: string;

  // architectural
  projectType: string;
  surfaceType: string;
  hasDamage: string;
  areaSize: string;
  archDesignNeeded: string;
  businessName: string;
  archReferral: string;
  archAdditionalInfo: string;

  // municipal
  city: string;
  projectIdea: string;
};

const initialFormData: FormData = {
  category: "",
  name: "",
  email: "",
  phone: "",

  serviceType: "",
  vehicleYear: "",
  vehicleMake: "",
  vehicleModel: "",
  currentColor: "",
  doorType: "",
  desiredColor: "",
  doorJamb: "",
  designNeeded: "",
  perforatedWindowFilm: false,
  designIdeas: "",
  referral: "",
  additionalInfo: "",

  projectType: "",
  surfaceType: "",
  hasDamage: "",
  areaSize: "",
  archDesignNeeded: "",
  businessName: "",
  archReferral: "",
  archAdditionalInfo: "",

  city: "",
  projectIdea: "",
};

// ── Step configs per category ─────────────────────────────────

const autoStepTitles = ["Service Type", "Vehicle Details", "Preferences", "Your Info"];
const archStepTitles = ["Project Details", "Additional Info", "Your Info"];
const muniStepTitles = ["Your Info"];

function getStepTitles(category: Category) {
  if (category === "automotive") return autoStepTitles;
  if (category === "architectural") return archStepTitles;
  if (category === "municipal") return muniStepTitles;
  return [];
}

// ── Component ─────────────────────────────────────────────────

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0); // 0 = category select
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const stepTitles = getStepTitles(formData.category);
  const totalSteps = stepTitles.length;

  // ── animations ──
  useEffect(() => {
    if (!sectionRef.current) return;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: isMobile ? 40 : 0, x: isMobile ? 0 : -50, opacity: 0 },
          {
            y: 0, x: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
          }
        );
      }
      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current,
          { y: isMobile ? 40 : 0, x: isMobile ? 0 : 50, opacity: 0 },
          {
            y: 0, x: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── handlers ──
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setFormData({ ...formData, [target.name]: target.checked });
    } else {
      setFormData({ ...formData, [target.name]: target.value });
    }
  };

  const selectCategory = (cat: Category) => {
    setFormData({ ...initialFormData, category: cat });
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      // go back to category selection
      setCurrentStep(0);
      setFormData({ ...initialFormData });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── validation ──
  const canProceed = (): boolean => {
    const { category } = formData;

    if (category === "automotive") {
      if (currentStep === 1) return !!formData.serviceType;
      if (currentStep === 2) return !!formData.vehicleYear && !!formData.vehicleMake && !!formData.vehicleModel;
      if (currentStep === 3) return !!formData.desiredColor;
      if (currentStep === 4) return !!formData.name && !!formData.email;
    }

    if (category === "architectural") {
      if (currentStep === 1) return !!formData.projectType && !!formData.surfaceType;
      if (currentStep === 2) return true; // optional fields
      if (currentStep === 3) return !!formData.name && !!formData.email;
    }

    if (category === "municipal") {
      if (currentStep === 1) return !!formData.name && !!formData.email && !!formData.phone && !!formData.city;
    }

    return true;
  };

  const isLastStep = currentStep === totalSteps;

  // ── render helpers ──
  const renderCategorySelect = () => (
    <div className="space-y-6 animate-fadeIn">
      <p className="text-white/60 text-sm">Select the category that best fits your project:</p>
      <div className="grid gap-4">
        {[
          {
            id: "automotive" as Category,
            title: "Automotive",
            desc: "Vehicle wraps, fleet graphics, color changes",
            icon: (
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17v1a1 1 0 001 1h1a1 1 0 001-1v-1M19 17v1a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1" />
                <circle cx="7.5" cy="14" r="1.5" />
                <circle cx="16.5" cy="14" r="1.5" />
              </svg>
            ),
          },
          {
            id: "architectural" as Category,
            title: "Architectural",
            desc: "Murals, wall graphics, signage, window films",
            icon: (
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 21h18M3 7v14M21 7v14M6 7V3h12v4M9 21v-4h6v4M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
              </svg>
            ),
          },
          {
            id: "municipal" as Category,
            title: "Municipal",
            desc: "City projects, public works, community installations",
            icon: (
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            ),
          },
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => selectCategory(cat.id)}
            className="flex items-center gap-5 rounded-lg border border-white/10 bg-white/5 p-5 text-left transition-all duration-300 hover:border-power-red/50 hover:bg-white/10"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-power-red/10 text-power-red">
              {cat.icon}
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-white">{cat.title}</h4>
              <p className="mt-1 text-sm text-white/50">{cat.desc}</p>
            </div>
            <svg className="ml-auto h-5 w-5 shrink-0 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );

  // ── AUTOMOTIVE STEPS ──
  const renderAutoStep1 = () => (
    <div className="space-y-5 animate-fadeIn">
      <p className="text-sm text-white/60">What type of automotive wrap service do you need?</p>
      <div className="grid gap-3">
        {automotiveServiceOptions.map((option) => (
          <label
            key={option}
            className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all duration-300 ${
              formData.serviceType === option
                ? "border-power-red bg-power-red/10"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            <input
              type="radio"
              name="serviceType"
              value={option}
              checked={formData.serviceType === option}
              onChange={handleChange}
              className="sr-only"
            />
            <div
              className={`h-5 w-5 shrink-0 rounded-full border-2 transition-all ${
                formData.serviceType === option
                  ? "border-power-red bg-power-red"
                  : "border-white/30"
              }`}
            >
              {formData.serviceType === option && (
                <svg className="h-full w-full text-white p-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="font-medium text-white">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderAutoStep2 = () => (
    <div className="space-y-5 animate-fadeIn">
      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label htmlFor="vehicleYear" className="form-label">Year *</label>
          <input type="text" id="vehicleYear" name="vehicleYear" required value={formData.vehicleYear} onChange={handleChange} className="form-input" placeholder="2024" />
        </div>
        <div>
          <label htmlFor="vehicleMake" className="form-label">Make *</label>
          <input type="text" id="vehicleMake" name="vehicleMake" required value={formData.vehicleMake} onChange={handleChange} className="form-input" placeholder="BMW" />
        </div>
        <div>
          <label htmlFor="vehicleModel" className="form-label">Model *</label>
          <input type="text" id="vehicleModel" name="vehicleModel" required value={formData.vehicleModel} onChange={handleChange} className="form-input" placeholder="M4" />
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="currentColor" className="form-label">Current Vehicle Color</label>
          <input type="text" id="currentColor" name="currentColor" value={formData.currentColor} onChange={handleChange} className="form-input" placeholder="Black" />
        </div>
        <div>
          <label htmlFor="doorType" className="form-label">Door Configuration</label>
          <select id="doorType" name="doorType" value={formData.doorType} onChange={handleChange} className="form-input cursor-pointer">
            <option value="">Select option...</option>
            {doorOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>
    </div>
  );

  const renderAutoStep3 = () => (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <label htmlFor="desiredColor" className="form-label">Desired Color & Finish *</label>
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

      {/* Color Catalog */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-medium text-white mb-3">Need help choosing? Browse our color catalog:</p>
        <div className="flex flex-wrap gap-3">
          <a href="/images/notpdf.jpg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-sm text-white transition-colors">
            <svg className="w-4 h-4 text-power-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            Color Catalog
          </a>
        </div>
      </div>

      <div>
        <label htmlFor="doorJamb" className="form-label">Door Jamb Option</label>
        <select id="doorJamb" name="doorJamb" value={formData.doorJamb} onChange={handleChange} className="form-input cursor-pointer">
          <option value="">Select option...</option>
          {doorJambOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="designNeeded" className="form-label">Graphic Design Needed?</label>
        <select id="designNeeded" name="designNeeded" value={formData.designNeeded} onChange={handleChange} className="form-input cursor-pointer">
          <option value="">Select option...</option>
          {designNeededOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      {formData.serviceType === "Commercial Fleet Wrap" && (
        <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 cursor-pointer transition-all hover:border-white/20">
          <input
            type="checkbox"
            name="perforatedWindowFilm"
            checked={formData.perforatedWindowFilm}
            onChange={handleChange}
            className="h-5 w-5 rounded border-white/30 bg-charcoal accent-power-red"
          />
          <div>
            <span className="font-medium text-white">Include Perforated Window Film</span>
            <p className="text-xs text-white/50 mt-0.5">One-way vision film for rear and side windows</p>
          </div>
        </label>
      )}

      {formData.designNeeded === "Yes" && (
        <div>
          <label htmlFor="designIdeas" className="form-label">Design Ideas</label>
          <textarea id="designIdeas" name="designIdeas" rows={3} value={formData.designIdeas} onChange={handleChange} className="form-input resize-none" placeholder="Describe your design vision..." />
        </div>
      )}
    </div>
  );

  const renderAutoStep4 = () => (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <label htmlFor="name" className="form-label">Your Name *</label>
        <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="form-input" placeholder="John Smith" />
      </div>
      <div>
        <label htmlFor="email" className="form-label">Email Address *</label>
        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="form-input" placeholder="john@example.com" />
      </div>
      <div>
        <label htmlFor="phone" className="form-label">Phone Number</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder="(604) 123-4567" />
      </div>
      <div>
        <label htmlFor="referral" className="form-label">How did you hear about us?</label>
        <select id="referral" name="referral" value={formData.referral} onChange={handleChange} className="form-input cursor-pointer">
          <option value="">Select option...</option>
          {referralOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="additionalInfo" className="form-label">Additional Information (optional)</label>
        <textarea id="additionalInfo" name="additionalInfo" rows={3} value={formData.additionalInfo} onChange={handleChange} className="form-input resize-none" placeholder="Any body damage, rust, or other details we should know about..." />
      </div>
      <p className="text-xs text-white/40 italic">
        We respect your privacy. Your information will only be used to respond to your inquiry.
      </p>
    </div>
  );

  // ── ARCHITECTURAL STEPS ──
  const renderArchStep1 = () => (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <label htmlFor="projectType" className="form-label">Project Type *</label>
        <select id="projectType" name="projectType" required value={formData.projectType} onChange={handleChange} className="form-input cursor-pointer">
          <option value="">Select project type...</option>
          {architecturalProjectTypes.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="surfaceType" className="form-label">Surface Type *</label>
        <select id="surfaceType" name="surfaceType" required value={formData.surfaceType} onChange={handleChange} className="form-input cursor-pointer">
          <option value="">Select surface type...</option>
          {architecturalSurfaceTypes.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label className="form-label">Any Damage to the Surface?</label>
        <div className="flex gap-4">
          {["Yes", "No"].map((opt) => (
            <label
              key={opt}
              className={`flex-1 cursor-pointer rounded-lg border p-3 text-center transition-all duration-300 ${
                formData.hasDamage === opt
                  ? "border-power-red bg-power-red/10 text-white"
                  : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
              }`}
            >
              <input type="radio" name="hasDamage" value={opt} checked={formData.hasDamage === opt} onChange={handleChange} className="sr-only" />
              {opt}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="areaSize" className="form-label">Approximate Area Size</label>
        <input type="text" id="areaSize" name="areaSize" value={formData.areaSize} onChange={handleChange} className="form-input" placeholder='e.g. 10ft x 8ft, 200 sq ft' />
      </div>
    </div>
  );

  const renderArchStep2 = () => (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <label htmlFor="archDesignNeeded" className="form-label">Graphic Design Needed?</label>
        <select id="archDesignNeeded" name="archDesignNeeded" value={formData.archDesignNeeded} onChange={handleChange} className="form-input cursor-pointer">
          <option value="">Select option...</option>
          {designNeededOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="businessName" className="form-label">Business Name (optional)</label>
        <input type="text" id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} className="form-input" placeholder="Your business name" />
      </div>
      <div>
        <label htmlFor="archReferral" className="form-label">How did you hear about us?</label>
        <select id="archReferral" name="archReferral" value={formData.archReferral} onChange={handleChange} className="form-input cursor-pointer">
          <option value="">Select option...</option>
          {referralOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    </div>
  );

  const renderArchStep3 = () => (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <label htmlFor="name" className="form-label">Your Name *</label>
        <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="form-input" placeholder="John Smith" />
      </div>
      <div>
        <label htmlFor="email" className="form-label">Email Address *</label>
        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="form-input" placeholder="john@example.com" />
      </div>
      <div>
        <label htmlFor="phone" className="form-label">Phone Number</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder="(604) 123-4567" />
      </div>
      <p className="text-xs text-white/40 italic">
        We will contact you within 24 hours. Your information is kept private and used solely for project communication.
      </p>
    </div>
  );

  // ── MUNICIPAL STEP ──
  const renderMuniStep1 = () => (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <label htmlFor="name" className="form-label">Your Name *</label>
        <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="form-input" placeholder="John Smith" />
      </div>
      <div>
        <label htmlFor="phone" className="form-label">Phone Number *</label>
        <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className="form-input" placeholder="(604) 123-4567" />
      </div>
      <div>
        <label htmlFor="email" className="form-label">Email Address *</label>
        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="form-input" placeholder="john@example.com" />
      </div>
      <div>
        <label htmlFor="city" className="form-label">City *</label>
        <input type="text" id="city" name="city" required value={formData.city} onChange={handleChange} className="form-input" placeholder="Vancouver" />
      </div>
      <div>
        <label htmlFor="projectIdea" className="form-label">Project Idea (optional)</label>
        <textarea id="projectIdea" name="projectIdea" rows={4} value={formData.projectIdea} onChange={handleChange} className="form-input resize-none" placeholder="Describe your project idea..." />
      </div>
      <p className="text-xs text-white/40 italic">
        We will contact you within 24 hours. We respect your privacy. Your information will only be used to respond to your inquiry.
      </p>
    </div>
  );

  // ── render current step ──
  const renderStep = () => {
    if (currentStep === 0) return renderCategorySelect();

    const { category } = formData;

    if (category === "automotive") {
      if (currentStep === 1) return renderAutoStep1();
      if (currentStep === 2) return renderAutoStep2();
      if (currentStep === 3) return renderAutoStep3();
      if (currentStep === 4) return renderAutoStep4();
    }

    if (category === "architectural") {
      if (currentStep === 1) return renderArchStep1();
      if (currentStep === 2) return renderArchStep2();
      if (currentStep === 3) return renderArchStep3();
    }

    if (category === "municipal") {
      if (currentStep === 1) return renderMuniStep1();
    }

    return null;
  };

  // ── submitted state ──
  if (submitted) {
    return (
      <section id="contact" className="relative bg-near-black py-24 md:py-32 mobile-cv-auto">
        <div className="absolute left-0 right-0 top-0 h-20 bg-charcoal" style={{ clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 100%)" }} />
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-power-red/20">
              <svg className="h-10 w-10 text-power-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="heading-section text-white">Request Submitted!</h2>
            <p className="mt-4 text-lg text-white/60">
              Thank you! We&apos;ll get back to you within 24 hours. Your information is kept private and used solely for project communication.
            </p>
            <button
              type="button"
              onClick={() => { setSubmitted(false); setCurrentStep(0); setFormData(initialFormData); }}
              className="mt-8 inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:border-power-red hover:bg-power-red/10"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" ref={sectionRef} className="relative bg-near-black py-24 md:py-32 mobile-cv-auto">
      {/* Diagonal top separator */}
      <div className="absolute left-0 right-0 top-0 h-20 bg-charcoal" style={{ clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 100%)" }} />

      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-0">
          {/* Left - Estimate Form */}
          <div ref={formRef} className="lg:pr-12">
            <p className="label-uppercase mb-4 text-power-red">Instant Estimate</p>
            <h2 className="heading-section text-white">
              GET YOUR INSTANT ESTIMATE
            </h2>
            <div className="mt-4 h-1 w-24 bg-power-red" />

            <p className="mt-6 text-lg text-white/60">
              {currentStep === 0
                ? "Select your project category to get started."
                : `Step ${currentStep} of ${totalSteps} \u2014 ${stepTitles[currentStep - 1]}`}
            </p>

            {/* Step Indicator (only when category is selected) */}
            {currentStep > 0 && totalSteps > 1 && (
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
                    style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {renderStep()}

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              {/* Navigation Buttons */}
              {currentStep > 0 && (
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 md:flex-none px-8 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all duration-300 text-sm font-medium uppercase tracking-widest"
                  >
                    Back
                  </button>
                  {isLastStep ? (
                    <button
                      type="submit"
                      disabled={!canProceed() || isSubmitting}
                      className="flex-1 md:flex-none btn-skewed bg-power-red py-3 px-8 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-power-red-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{isSubmitting ? "Sending..." : "Submit Request"}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className="flex-1 md:flex-none btn-skewed bg-power-red py-3 px-8 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-power-red-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Continue</span>
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Right - Map & Info */}
          <div ref={mapRef} className="relative lg:border-l lg:border-white/10 lg:pl-12">
            {/* Red accent bar */}
            <div className="absolute left-0 top-0 hidden h-32 w-1 bg-power-red lg:block" />

            {/* Contact Info */}
            <div className="mb-8">
              <h3 className="font-display text-xl font-bold uppercase text-white">Get In Touch</h3>

              {/* Primary CTA - Call */}
              <a href="tel:+16045102400" className="mt-6 flex items-center gap-4 rounded-lg bg-power-red p-4 transition-all duration-300 hover:bg-power-red-dark">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/70">Call Now</p>
                  <p className="text-lg font-bold text-white">(604) 510-2400</p>
                </div>
              </a>

              {/* Secondary CTAs - Text & Email */}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <a href="sms:+16045005391" className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 transition-all duration-300 hover:border-power-red/50 hover:bg-white/10">
                  <svg className="h-5 w-5 shrink-0 text-power-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <div className="min-w-0">
                    <p className="text-xs text-white/50">Text</p>
                    <p className="truncate text-sm font-medium text-white">604-500-5391</p>
                  </div>
                </a>
                <a href="mailto:taylor@wrapcity.co" className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 transition-all duration-300 hover:border-power-red/50 hover:bg-white/10">
                  <svg className="h-5 w-5 shrink-0 text-power-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <div className="min-w-0">
                    <p className="text-xs text-white/50">Email</p>
                    <p className="truncate text-sm font-medium text-white">taylor@wrapcity.co</p>
                  </div>
                </a>
              </div>

              {/* Social Links */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-xs text-white/40">Follow us</span>
                <div className="flex gap-2">
                  <a href="https://www.facebook.com/p/Wrap-City-100091623488082/" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-300 hover:border-power-red hover:bg-power-red/10 hover:text-power-red">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/wrapcity604" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-300 hover:border-power-red hover:bg-power-red/10 hover:text-power-red">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Appointment Note */}
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <svg className="h-5 w-5 shrink-0 text-power-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <p className="text-sm font-semibold uppercase tracking-wide text-white">By Appointment Only</p>
            </div>

            {/* Location & Map */}
            <div className="relative">
              <div className="flex items-center justify-between rounded-t-lg bg-white/5 px-4 py-3">
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 shrink-0 text-power-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-white">1312 184 St, Langley Twp, BC</p>
                  </div>
                </div>
                <a href="https://www.google.com/maps/dir/?api=1&destination=1312+184+St,+Langley+Twp,+BC+V2Z+1K2" target="_blank" rel="noopener noreferrer" className="shrink-0 rounded bg-power-red px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-power-red-dark">
                  Get Directions
                </a>
              </div>
              <div className="relative h-56 overflow-hidden rounded-b-lg lg:h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2614.5!2d-122.6756!3d49.0234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485d0e7e7c9f0e1%3A0x0!2s1312%20184%20St%2C%20Langley%20Twp%2C%20BC%20V2Z%201K2!5e0!3m2!1sen!2sca!4v1699999999999!5m2!1sen!2sca"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Wrap City Location - 1312 184 St, Langley Twp, BC"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
