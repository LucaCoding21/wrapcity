import type { Metadata } from "next";
import WorkGallery from "./work-gallery";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Browse our portfolio of premium car wraps, paint protection film, and vinyl transformations.",
};

export default function WorkPage() {
  return <WorkGallery />;
}
