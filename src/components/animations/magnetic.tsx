"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function Magnetic({
  children,
  strength = 0.3,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(ref.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (isTouch || !ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
