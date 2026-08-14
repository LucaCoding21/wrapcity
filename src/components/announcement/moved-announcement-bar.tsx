"use client";

// Temporary "we've moved" banner for the Langley relocation.
// To retire it: delete this file, its render in layout.tsx, and the
// `--announcement-offset` style on the nav in navigation.tsx.

import { useEffect, useRef, useState } from "react";

const DISMISS_KEY = "wrapcity-moved-bar-dismissed";

export default function MovedAnnouncementBar() {
  const [visible, setVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY) !== "1") setVisible(true);
  }, []);

  // Keep --announcement-offset in sync so the fixed nav sits below the bar
  useEffect(() => {
    const root = document.documentElement;
    if (!visible) {
      root.style.setProperty("--announcement-offset", "0px");
      return;
    }
    const update = () => {
      root.style.setProperty(
        "--announcement-offset",
        `${barRef.current?.offsetHeight ?? 0}px`
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      root.style.setProperty("--announcement-offset", "0px");
    };
  }, [visible]);

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <div
      ref={barRef}
      className="fixed top-0 right-0 left-0 border-b border-white/10 bg-[#111013]"
      style={{ zIndex: "calc(var(--z-navigation) + 1)" }}
    >
      <div className="container-wide flex items-center justify-between gap-3 py-2.5 md:py-4">
        <p className="min-w-0 truncate text-xs text-white/70 md:text-sm">
          <span className="font-semibold text-white">
            We&apos;ve moved to Langley.
          </span>
          <span className="hidden sm:inline">
            {" "}
            Still serving Surrey, White Rock &amp; the Fraser Valley.
          </span>{" "}
          <a
            href="#contact"
            onClick={scrollToContact}
            className="font-medium text-white underline underline-offset-4 decoration-white/40 transition-colors hover:decoration-white"
          >
            Get directions
          </a>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="flex h-7 w-7 shrink-0 items-center justify-center text-white/40 transition-colors hover:text-white"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
