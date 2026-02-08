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
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-medium uppercase tracking-widest overflow-hidden transition-all duration-500";

  const variants = {
    primary:
      "bg-gradient-accent text-background hover:opacity-90",
    outline:
      "border border-accent/30 text-accent-light hover:border-accent hover:bg-accent/10",
    ghost: "text-foreground hover:text-accent-light",
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
    "rounded-full",
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
          {children}
        </Link>
      ) : (
        <button
          data-cursor="pointer"
          className={combinedClassName}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </Magnetic>
  );

  return content;
}
