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
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      gsap.to(menuRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
      });
      gsap.fromTo(
        linksRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.3,
        }
      );
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.6 }
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
      className="fixed inset-0 flex flex-col justify-between bg-near-black px-6 pt-24 pb-12"
      style={{
        zIndex: 99,
        clipPath: "inset(0% 0% 100% 0%)",
      }}
    >
      <div className="flex flex-col gap-4">
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            ref={(el) => {
              if (el) linksRef.current[i] = el;
            }}
            onClick={(e) => handleClick(e, link.href)}
            className="font-display text-5xl font-bold uppercase tracking-tight text-white opacity-0 transition-colors duration-300 active:text-power-red"
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
          className="mt-4 inline-block w-fit bg-power-red px-8 py-4 font-display text-2xl font-bold uppercase tracking-tight text-white opacity-0 transition-colors duration-300 active:bg-power-red-dark"
        >
          Book Now
        </a>
      </div>

      <div ref={infoRef} className="flex flex-col gap-4 opacity-0">
        <div className="h-[1px] bg-white/10" />
        <div className="flex justify-between text-sm text-white/50">
          <div>
            <p className="text-white">info@wrapcity.com</p>
            <p>(555) 123-4567</p>
          </div>
          <div className="flex gap-4">
            <a
              href="#"
              className="transition-colors duration-300 hover:text-white"
            >
              Instagram
            </a>
            <a
              href="#"
              className="transition-colors duration-300 hover:text-white"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
