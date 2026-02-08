"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [isBlend, setIsBlend] = useState(false);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    const follower = followerRef.current;
    if (!dot || !follower) return;

    const xTo = gsap.quickTo(follower, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(follower, "y", { duration: 0.5, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (!target) return;

      const cursorType = (target as HTMLElement).dataset.cursor;

      switch (cursorType) {
        case "pointer":
          gsap.to(follower, {
            scale: 1.5,
            duration: 0.3,
            ease: "power3.out",
          });
          break;
        case "view":
          setLabel("View");
          gsap.to(follower, {
            scale: 2.5,
            duration: 0.3,
            ease: "power3.out",
          });
          break;
        case "drag":
          setLabel("Drag");
          gsap.to(follower, {
            scale: 2.5,
            duration: 0.3,
            ease: "power3.out",
          });
          break;
        case "blend":
          setIsBlend(true);
          gsap.to(follower, {
            scale: 6,
            duration: 0.4,
            ease: "power3.out",
          });
          break;
        default:
          break;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (!target) return;

      setLabel("");
      setIsBlend(false);
      gsap.to(follower, { scale: 1, duration: 0.3, ease: "power3.out" });
    };

    const handleMouseDown = () => {
      gsap.to(dot, { scale: 0.8, duration: 0.15 });
      gsap.to(follower, { scale: 0.8, duration: 0.15 });
    };

    const handleMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.15 });
      gsap.to(follower, { scale: 1, duration: 0.15 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Don't render on touch devices (SSR safe)
  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 hidden md:block"
        style={{
          zIndex: "var(--z-cursor)",
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: "50%",
          backgroundColor: "#f5f5f5",
          transform: "translate(-100px, -100px)",
        }}
      />
      {/* Follower */}
      <div
        ref={followerRef}
        className="pointer-events-none fixed top-0 left-0 hidden items-center justify-center md:flex"
        style={{
          zIndex: "var(--z-cursor)",
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: "50%",
          border: "1px solid rgba(245, 245, 245, 0.3)",
          transform: "translate(-100px, -100px)",
          mixBlendMode: isBlend ? "difference" : "normal",
          backgroundColor: isBlend ? "#f5f5f5" : "transparent",
          transition: "background-color 0.3s, mix-blend-mode 0.3s",
        }}
      >
        {/* Label */}
        {label && (
          <span
            ref={labelRef}
            className="text-xs font-medium whitespace-nowrap"
            style={{ fontSize: 10, letterSpacing: "0.05em" }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
}
