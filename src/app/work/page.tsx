import type { Metadata } from "next";
import WorkGallery from "./work-gallery";

export const metadata: Metadata = {
  title: "Car Wrap Gallery",
  description:
    "Browse our car wrap gallery featuring color changes, fleet graphics & motorcycle wraps in Langley BC. 3M & Avery Dennison certified.",
  keywords: [
    "vehicle wrap portfolio",
    "car wrap gallery",
    "vinyl wrap examples",
    "color change wrap before after",
    "motorcycle wrap gallery",
    "commercial fleet wrap examples",
    "Langley vehicle wraps",
    "Surrey car wrap shop",
    "car wrap before and after",
    "vehicle wrap portfolio BC",
    "chrome delete before after",
    "fleet wrap examples Surrey",
  ],
  openGraph: {
    title: "Car Wrap Gallery | Wrap City Langley BC",
    description:
      "View our gallery of premium vehicle wraps, color changes, and custom vinyl graphics. Serving Langley, Surrey & the Fraser Valley.",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1920,
        height: 1080,
        alt: "Wrap City Portfolio - Premium Vehicle Wraps in Langley BC",
      },
    ],
  },
  alternates: {
    canonical: "https://wrapcity.co/work",
  },
};

export default function WorkPage() {
  return <WorkGallery />;
}
