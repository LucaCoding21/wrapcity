import type { Metadata } from "next";
import WorkGallery from "./work-gallery";

export const metadata: Metadata = {
  title: "Car Wrap Gallery",
  description:
    "Browse our car wrap gallery featuring color changes, fleet graphics & motorcycle wraps in South Surrey BC. 3M & Avery Dennison certified.",
  keywords: [
    "vehicle wrap portfolio",
    "car wrap gallery",
    "vinyl wrap examples",
    "color change wrap before after",
    "motorcycle wrap gallery",
    "commercial fleet wrap examples",
    "South Surrey vehicle wraps",
    "Surrey car wrap shop",
    "car wrap before and after",
    "vehicle wrap portfolio BC",
    "chrome delete before after",
    "fleet wrap examples Surrey",
  ],
  openGraph: {
    title: "Car Wrap Gallery | Wrap City South Surrey BC",
    description:
      "View our gallery of premium vehicle wraps, color changes, and custom vinyl graphics. Serving South Surrey & Greater Vancouver.",
    type: "website",
    images: [
      {
        url: "/images/wrapcity-thumbnail.jpg",
        width: 1920,
        height: 1080,
        alt: "Wrap City Portfolio - Premium Vehicle Wraps in South Surrey BC",
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
