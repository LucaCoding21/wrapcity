"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { navLinks } from "@/data/navigation";
import Magnetic from "@/components/animations/magnetic";
import MobileMenu from "./mobile-menu";

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    ScrollTrigger.create({
      start: "top -80",
      end: 99999,
      onUpdate: (self) => {
        setIsScrolled(self.progress > 0);
      },
    });

    // Track active section
    const sections = ["services", "about", "gallery", "faq", "contact"];
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section}`,
        start: "top 40%",
        end: "bottom 40%",
        onEnter: () => setActiveSection(section),
        onEnterBack: () => setActiveSection(section),
      });
    });
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!navRef.current) return;

    const links = navRef.current.querySelectorAll("[data-nav-link]");
    const logo = navRef.current.querySelector("[data-nav-logo]");
    const cta = navRef.current.querySelector("[data-nav-cta]");

    const tl = gsap.timeline({ delay: 2.5 });

    tl.fromTo(
      logo,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        links,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .fromTo(
        cta,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Top gradient overlay for logo visibility */}
      <div
        className="pointer-events-none fixed top-0 right-0 left-0 h-44 transition-opacity duration-500"
        style={{
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 40%, rgba(0, 0, 0, 0.3) 70%, transparent 100%)",
          zIndex: "calc(var(--z-navigation) - 1)",
          opacity: isScrolled ? 0 : 1,
        }}
      />
      <nav
        ref={navRef}
        className="fixed right-0 left-0 flex items-center justify-between overflow-visible px-6 py-4 transition-all duration-500 md:px-12 mobile-no-backdrop"
        style={{
          top: "var(--announcement-offset, 0px)",
          zIndex: "var(--z-navigation)",
          backgroundColor: isScrolled ? "rgba(29, 28, 29, 0.95)" : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
        }}
      >
        {/* Logo */}
        <div className="relative flex-shrink-0">
          <a
            href="/"
            data-nav-logo
            data-cursor="pointer"
            className="block opacity-0"
            onClick={(e) => {
              e.preventDefault();
              window.location.reload();
            }}
          >
            <Image
              src="/images/logo-new.png"
              alt="Wrap City - Vehicle Wraps Langley BC"
              width={280}
              height={120}
              className="h-16 w-auto md:h-20"
              priority
            />
          </a>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Magnetic key={link.href} strength={0.2}>
              <a
                href={link.href}
                data-nav-link
                data-cursor="pointer"
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative text-sm font-medium uppercase tracking-widest opacity-0 transition-colors duration-300 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {link.label}
                {/* Red underline indicator */}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-power-red transition-all duration-300 ${
                    activeSection === link.href.replace("#", "") ? "w-full" : "w-0"
                  }`}
                />
              </a>
            </Magnetic>
          ))}
        </div>

        {/* CTA Button */}
        <Magnetic strength={0.15}>
          <a
            href="#contact"
            data-nav-cta
            data-cursor="pointer"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="hidden rounded bg-power-red px-6 py-2.5 text-sm font-semibold uppercase tracking-widest text-near-black opacity-0 transition-all duration-300 hover:bg-power-red-dark md:block"
          >
            Request a Quote
          </a>
        </Magnetic>

        {/* Bottom gradient fade when scrolled */}
        <div
          className="pointer-events-none absolute right-0 bottom-0 left-0 h-6 translate-y-full transition-opacity duration-500"
          style={{
            background: "linear-gradient(to bottom, rgba(29, 28, 29, 0.95), transparent)",
            opacity: isScrolled ? 1 : 0,
          }}
        />

        {/* Mobile Menu Toggle */}
        <button
          data-cursor="pointer"
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
          style={{ zIndex: isMobileOpen ? 100 : 50 }}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="absolute h-[2px] w-6 bg-white transition-all duration-300"
            style={{
              transform: isMobileOpen
                ? "rotate(45deg)"
                : "translateY(-6px)",
            }}
          />
          <span
            className="absolute h-[2px] w-6 bg-white transition-all duration-300"
            style={{
              opacity: isMobileOpen ? 0 : 1,
            }}
          />
          <span
            className="absolute h-[2px] w-6 bg-white transition-all duration-300"
            style={{
              transform: isMobileOpen
                ? "rotate(-45deg)"
                : "translateY(6px)",
            }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
}
