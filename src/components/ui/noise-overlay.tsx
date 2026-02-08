"use client";

export default function NoiseOverlay() {
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
