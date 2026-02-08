"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Magnetic from "@/components/animations/magnetic";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!footerRef.current || !headingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-surface"
      style={{ zIndex: 0 }}
    >
      {/* Main CTA Area */}
      <div className="flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center md:px-12">
        <p className="mb-6 text-sm uppercase tracking-[0.3em] text-muted">
          Ready to transform your vehicle?
        </p>
        <h2
          ref={headingRef}
          className="font-display text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] font-bold tracking-tight"
        >
          <span className="text-gradient-accent">LET&apos;S</span>
          <br />
          <span className="text-foreground">WORK TOGETHER</span>
        </h2>
        <Magnetic strength={0.2}>
          <Link
            href="/contact"
            data-cursor="pointer"
            className="mt-12 inline-flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 text-accent-light transition-all duration-500 hover:h-44 hover:w-44 hover:bg-accent/10 md:h-20 md:w-20"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
        </Magnetic>
      </div>

      {/* Footer Info */}
      <div className="border-t border-border px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo */}
          <Link
            href="/"
            data-cursor="pointer"
          >
            <Image
              src="/images/logo.png"
              alt="Wrap City"
              width={140}
              height={44}
              className="h-10 w-auto"
            />
          </Link>

          {/* Links */}
          <div className="flex gap-8 text-sm text-muted">
            <Link
              href="/work"
              data-cursor="pointer"
              className="transition-colors duration-300 hover:text-foreground"
            >
              Work
            </Link>
            <Link
              href="/services"
              data-cursor="pointer"
              className="transition-colors duration-300 hover:text-foreground"
            >
              Services
            </Link>
            <Link
              href="/about"
              data-cursor="pointer"
              className="transition-colors duration-300 hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/contact"
              data-cursor="pointer"
              className="transition-colors duration-300 hover:text-foreground"
            >
              Contact
            </Link>
          </div>

          {/* Socials */}
          <div className="flex gap-6 text-sm text-muted">
            <a
              href="#"
              data-cursor="pointer"
              className="transition-colors duration-300 hover:text-foreground"
            >
              Instagram
            </a>
            <a
              href="#"
              data-cursor="pointer"
              className="transition-colors duration-300 hover:text-foreground"
            >
              TikTok
            </a>
            <a
              href="#"
              data-cursor="pointer"
              className="transition-colors duration-300 hover:text-foreground"
            >
              YouTube
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mx-auto mt-8 max-w-[1440px] text-center text-xs text-muted-dark">
          <p>&copy; {new Date().getFullYear()} Wrap City. Luxury Vinyl Styling. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
