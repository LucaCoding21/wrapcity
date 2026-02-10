export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  image: string;
}

export const services: Service[] = [
  {
    slug: "motorcycle-wraps",
    title: "Motorcycle Wraps",
    tagline: "Two Wheel Transformation",
    description:
      "Custom motorcycle wraps that make your bike stand out. From sport bikes to cruisers, we deliver precision wraps that protect and personalize your ride.",
    icon: "motorcycle",
    image: "/images/motorcycle.jpeg",
  },
  {
    slug: "vehicle-wraps",
    title: "Vehicle Wraps",
    tagline: "Complete Transformation",
    description:
      "Full and partial vehicle wraps in matte, gloss, satin, chrome, and specialty finishes. Transform your car, truck, or SUV with premium cast vinyl.",
    icon: "wrap",
    image: "/images/vehicle-wrap.jpg",
  },
  {
    slug: "commercial-fleet-wraps",
    title: "Commercial Fleet Wraps",
    tagline: "Brand In Motion",
    description:
      "Branded vehicle wraps for businesses, fleet graphics, and promotional vehicles. Turn your fleet into mobile billboards that work 24/7.",
    icon: "truck",
    image: "/images/commercial.jpeg",
  },
  {
    slug: "architectural-vinyl",
    title: "Architectural Vinyl",
    tagline: "Surface Reinvention",
    description:
      "Transform interior and exterior surfaces with architectural vinyl films. Perfect for walls, furniture, countertops, and accent features.",
    icon: "building",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    slug: "storefront-advertising",
    title: "Storefront Advertising",
    tagline: "Maximum Visibility",
    description:
      "Eye-catching window graphics, perforated vinyl, and storefront wraps that turn your business into a 24/7 advertising powerhouse.",
    icon: "storefront",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80",
  },
  {
    slug: "municipal-projects",
    title: "Municipal Projects",
    tagline: "Community Impact",
    description:
      "Large scale wraps for municipal vehicles, public art installations, and community projects. We work with cities and organizations to beautify public spaces.",
    icon: "city",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
  },
];
