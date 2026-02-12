"use client";

import { useEffect, useState } from "react";

export default function NoiseOverlay() {
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches || window.innerWidth < 768);
  }, []);

  // Skip rendering entirely on mobile — SVG feTurbulence is a GPU killer
  if (isTouch) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: "var(--z-noise)" }}
    >
      <svg className="h-full w-full opacity-[0.04]">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
