import type { Metadata } from "next";
import WorkGallery from "./work-gallery";

export const metadata: Metadata = {
  title: "Vehicle Wrap Portfolio & Gallery",
  description:
    "Browse Wrap City's portfolio of premium vehicle wraps, motorcycle wraps, commercial fleet graphics, and color change transformations in South Surrey BC. See our 3M and Avery Dennison certified work.",
  keywords: [
    "vehicle wrap portfolio",
    "car wrap gallery",
    "vinyl wrap examples",
    "color change wrap before after",
    "motorcycle wrap gallery",
    "commercial fleet wrap examples",
    "South Surrey vehicle wraps",
    "Surrey car wrap shop",
  ],
  openGraph: {
    title: "Vehicle Wrap Portfolio | Wrap City South Surrey BC",
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
