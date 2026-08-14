"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { usePreloader } from "@/providers/preloader-provider";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const { isLoading, setComplete, isVideoReady, isAnimationDone, setAnimationDone } = usePreloader();
  const [wipeTimeline, setWipeTimeline] = useState<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current || !counterRef.current || !logoRef.current)
      return;

    // Shorter preloader on mobile to reduce time-to-interactive
    const mobile = window.innerWidth < 768;
    const counterDur = mobile ? 1.0 : 2.0;
    const logoStart = mobile ? 0.15 : 0.3;
    const wipeOutStart = mobile ? 1.0 : 2.0;

    const tl = gsap.timeline({
      onComplete: () => {
        setAnimationDone();
        // On mobile, complete immediately. On desktop, wait for video.
        if (mobile) {
          setComplete();
        }
      },
    });

    // Counter 0 -> 100
    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: counterDur,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(counter.value).toString();
        }
      },
    })
      // Logo reveal
      .fromTo(
        logoRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        logoStart
      )
      // Wipe out logo and counter
      .to(
        logoRef.current,
        { y: -30, opacity: 0, duration: 0.4, ease: "power3.in" },
        wipeOutStart
      )
      .to(
        counterRef.current,
        { opacity: 0, duration: 0.3, ease: "power3.in" },
        wipeOutStart
      );

    // On desktop, create a separate timeline for the final wipe that waits for video
    if (!mobile) {
      const wipeTl = gsap.timeline({ paused: true, onComplete: () => setComplete() });
      wipeTl.to(
        containerRef.current,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.8,
          ease: "power4.inOut",
        }
      );
      setWipeTimeline(wipeTl);
    } else {
      // On mobile, add the wipe to the main timeline
      tl.to(
        containerRef.current,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.8,
          ease: "power4.inOut",
        },
        mobile ? 1.1 : 2.2
      );
    }
  }, [setComplete, setAnimationDone]);

  // On desktop: play the wipe when video is ready AND animation is done (counter reached 100)
  useEffect(() => {
    if (wipeTimeline && isVideoReady && isAnimationDone) {
      wipeTimeline.play();
    }
  }, [wipeTimeline, isVideoReady, isAnimationDone]);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-background"
      style={{
        zIndex: "var(--z-preloader)",
        clipPath: "inset(0% 0% 0% 0%)",
      }}
    >
      {/* Logo */}
      <div ref={logoRef} className="mb-8 opacity-0">
        <Image
          src="/images/logo-new.png"
          alt="Wrap City - Vinyl Styling & Protection"
          width={400}
          height={172}
          className="h-32 w-auto md:h-36"
          priority
        />
      </div>

      {/* Counter */}
      <div className="absolute bottom-12 right-12">
        <span
          ref={counterRef}
          className="font-display text-8xl font-bold tabular-nums text-foreground/10 md:text-[12rem]"
        >
          0
        </span>
      </div>

      {/* Loading line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden bg-border">
        <div
          className="bg-gradient-accent h-full origin-left"
          style={{
            animation: "loadingLine 2s ease-in-out forwards",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes loadingLine {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
}
