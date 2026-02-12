"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ImageRevealProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  revealDirection?: "left" | "right" | "up" | "down";
  parallax?: boolean;
  parallaxSpeed?: number;
}

export default function ImageReveal({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  containerClassName,
  revealDirection = "up",
  parallax = false,
  parallaxSpeed = 0.2,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const clipPaths: Record<string, { from: string; to: string }> = {
      left: {
        from: "inset(0% 100% 0% 0%)",
        to: "inset(0% 0% 0% 0%)",
      },
      right: {
        from: "inset(0% 0% 0% 100%)",
        to: "inset(0% 0% 0% 0%)",
      },
      up: {
        from: "inset(100% 0% 0% 0%)",
        to: "inset(0% 0% 0% 0%)",
      },
      down: {
        from: "inset(0% 0% 100% 0%)",
        to: "inset(0% 0% 0% 0%)",
      },
    };

    const mobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (mobile) {
        // Mobile: simple opacity fade instead of expensive clip-path + scale
        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      } else {
        // Desktop: full reveal animation
        gsap.fromTo(
          containerRef.current,
          { clipPath: clipPaths[revealDirection].from },
          {
            clipPath: clipPaths[revealDirection].to,
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        // Counter-scale (Ken Burns)
        gsap.fromTo(
          imageRef.current,
          { scale: 1.3 },
          {
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        // Parallax (desktop only)
        if (parallax) {
          gsap.to(imageRef.current, {
            yPercent: parallaxSpeed * 100,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [revealDirection, parallax, parallaxSpeed]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${containerClassName || ""}`}>
      <div ref={imageRef} className="h-full w-full">
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className={`object-cover ${className || ""}`}
            sizes="100vw"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width || 1200}
            height={height || 800}
            priority={priority}
            className={className}
          />
        )}
      </div>
    </div>
  );
}
