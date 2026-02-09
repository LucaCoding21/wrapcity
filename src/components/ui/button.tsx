"use client";

import Link from "next/link";
import { ReactNode } from "react";
import Magnetic from "@/components/animations/magnetic";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  skewed?: boolean;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  skewed = false,
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-semibold uppercase tracking-widest overflow-hidden transition-all duration-300";

  const variants = {
    primary:
      "bg-power-red text-white hover:bg-power-red-dark",
    outline:
      "border border-power-red/50 text-power-red hover:border-power-red hover:bg-power-red/10",
    ghost: "text-white hover:text-power-red",
  };

  const sizes = {
    sm: "px-5 py-2 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-sm",
  };

  const combinedClassName = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    skewed ? "btn-skewed" : "",
    className
  );

  const content = (
    <Magnetic strength={0.15}>
      {href ? (
        <Link
          href={href}
          data-cursor="pointer"
          className={combinedClassName}
        >
          {skewed ? <span>{children}</span> : children}
        </Link>
      ) : (
        <button
          data-cursor="pointer"
          className={combinedClassName}
          onClick={onClick}
        >
          {skewed ? <span>{children}</span> : children}
        </button>
      )}
    </Magnetic>
  );

  return content;
}
