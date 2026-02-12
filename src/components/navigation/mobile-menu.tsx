"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { navLinks } from "@/data/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      gsap.to(menuRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
      });
      // Animate nav links
      gsap.fromTo(
        linksRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.3,
        }
      );
      // Animate social icons
      if (socialsRef.current) {
        gsap.fromTo(
          socialsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.7 }
        );
      }
    } else {
      gsap.to(menuRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.6,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    // Small delay to let menu close animation start
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 flex flex-col bg-near-black"
      style={{
        zIndex: 99,
        clipPath: "inset(0% 0% 100% 0%)",
      }}
    >
      {/* Spacer to account for nav height */}
      <div className="pt-24" />

      {/* Menu content - centered */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            ref={(el) => {
              if (el) linksRef.current[i] = el;
            }}
            onClick={(e) => handleClick(e, link.href)}
            className="font-display text-4xl font-bold uppercase tracking-tight text-white opacity-0 transition-colors duration-300 active:text-power-red"
          >
            {link.label}
          </a>
        ))}
        {/* Book Now CTA */}
        <a
          href="#contact"
          ref={(el) => {
            if (el) linksRef.current[navLinks.length] = el;
          }}
          onClick={(e) => handleClick(e, "#contact")}
          className="mt-4 bg-power-red px-8 py-4 font-display text-xl font-bold uppercase tracking-tight text-white opacity-0 transition-colors duration-300 active:bg-power-red-dark"
        >
          Book Now
        </a>

        {/* Social Icons */}
        <div
          ref={socialsRef}
          className="mt-8 flex items-center gap-6 opacity-0"
        >
          <a
            href="https://www.instagram.com/wrapcity604"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-300 active:border-power-red active:text-power-red"
            aria-label="Instagram"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/p/Wrap-City-100091623488082/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-300 active:border-power-red active:text-power-red"
            aria-label="Facebook"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom contact info */}
      <div className="px-6 pb-8 text-center">
        <p className="text-sm text-white/40">
          <a href="tel:+16045102400" className="text-white transition-colors active:text-power-red">
            (604) 510-2400
          </a>
          {" · "}
          <a href="mailto:taylor@wrapcity.co" className="text-white transition-colors active:text-power-red">
            taylor@wrapcity.co
          </a>
        </p>
      </div>
    </div>
  );
}
