"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
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

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 flex flex-col justify-between bg-background px-6 pt-24 pb-12"
      style={{
        zIndex: 99,
        clipPath: "inset(0% 0% 100% 0%)",
      }}
    >
      <div className="flex flex-col gap-4">
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            ref={(el) => {
              if (el) linksRef.current[i] = el;
            }}
            onClick={onClose}
            className="font-display text-5xl font-bold uppercase tracking-tight text-foreground opacity-0 transition-colors duration-300 active:text-accent"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div ref={infoRef} className="flex flex-col gap-4 opacity-0">
        <div className="h-[1px] bg-border" />
        <div className="flex justify-between text-sm text-muted">
          <div>
            <p>info@wrapcity.com</p>
            <p>(555) 123-4567</p>
          </div>
          <div className="flex gap-4">
            <a
              href="#"
              className="transition-colors duration-300 hover:text-foreground"
            >
              Instagram
            </a>
            <a
              href="#"
              className="transition-colors duration-300 hover:text-foreground"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
