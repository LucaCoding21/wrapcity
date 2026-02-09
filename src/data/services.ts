export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string;
}

export const services: Service[] = [
  {
    slug: "full-vehicle-wraps",
    title: "Full Vehicle Wraps",
    tagline: "Complete Transformation",
    description:
      "Complete color change wraps in matte, gloss, satin, chrome, and specialty finishes. Transform your vehicle's entire appearance with premium cast vinyl.",
    features: [
      "Matte, satin, gloss & metallic finishes",
      "Premium 3M & Avery Dennison films",
      "5-7 year durability",
      "Fully reversible - protects original paint",
    ],
    icon: "wrap",
  },
  {
    slug: "partial-wraps",
    title: "Partial Wraps & Accents",
    tagline: "Subtle Customization",
    description:
      "Roof wraps, mirror caps, racing stripes, hood wraps, and custom accent work. Perfect for adding personality without a full transformation.",
    features: [
      "Roof and hood wraps",
      "Racing stripes & graphics",
      "Mirror cap & trim wraps",
      "Chrome delete packages",
    ],
    icon: "accent",
  },
  {
    slug: "ppf",
    title: "Paint Protection Film",
    tagline: "Invisible Armor",
    description:
      "Invisible self-healing film that shields your paint from rock chips, scratches, and road debris. XPEL certified installation.",
    features: [
      "XPEL Ultimate Plus certified",
      "Self-healing technology",
      "10-year manufacturer warranty",
      "Full front or full body coverage",
    ],
    icon: "shield",
  },
  {
    slug: "ceramic-coating",
    title: "Ceramic Coating",
    tagline: "Long-Lasting Protection",
    description:
      "Long-lasting hydrophobic protection for a deep, showroom-quality shine. Professional-grade ceramic coatings that last for years.",
    features: [
      "Gtechniq Crystal Serum Ultra",
      "9H hardness rating",
      "Up to 9 years protection",
      "Extreme hydrophobic effect",
    ],
    icon: "droplet",
  },
  {
    slug: "commercial-fleet",
    title: "Commercial & Fleet Wraps",
    tagline: "Brand In Motion",
    description:
      "Branded vehicle wraps for businesses, fleet graphics, and promotional vehicles. Turn your fleet into mobile billboards.",
    features: [
      "Custom design services",
      "Fleet consistency guarantee",
      "Volume pricing available",
      "National installation network",
    ],
    icon: "truck",
  },
  {
    slug: "custom-design",
    title: "Custom Design",
    tagline: "Your Vision, Realized",
    description:
      "Bespoke designs, liveries, and graphic wraps. From concept to completion, we bring your unique vision to life.",
    features: [
      "In-house design team",
      "3D mockup previews",
      "Unlimited revisions",
      "One-of-a-kind creations",
    ],
    icon: "pencil",
  },
];
