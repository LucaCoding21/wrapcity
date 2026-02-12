"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  ScrollTrigger.config({
    limitCallbacks: true,
    syncInterval: 100,
  });

  const mm = gsap.matchMedia();

  mm.add("(max-width: 767px), (hover: none)", () => {
    gsap.defaults({ ease: "power2.out", duration: 0.5 });
  });

  mm.add("(min-width: 768px) and (hover: hover)", () => {
    gsap.defaults({ ease: "power3.out", duration: 0.8 });
  });
}

export { gsap, ScrollTrigger, SplitText };
