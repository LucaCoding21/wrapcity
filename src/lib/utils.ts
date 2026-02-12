import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

export function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none)").matches;
}
