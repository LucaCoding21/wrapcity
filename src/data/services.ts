export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
}

export const services: Service[] = [
  {
    slug: "color-change",
    title: "Color Change Wraps",
    tagline: "Transform Your Vision",
    description:
      "Complete color transformation using premium cast vinyl. Choose from hundreds of colors and finishes including matte, satin, gloss, metallic, and chrome.",
    features: [
      "Full & partial wraps",
      "Premium 3M & Avery Dennison films",
      "Matte, satin, gloss & metallic finishes",
      "5-7 year durability",
      "Fully reversible",
    ],
    image: "/images/services/color-change.jpg",
  },
  {
    slug: "ppf",
    title: "Paint Protection Film",
    tagline: "Invisible Armor",
    description:
      "Shield your vehicle's paint from rock chips, scratches, and UV damage with optically clear XPEL Ultimate Plus self-healing film.",
    features: [
      "XPEL Ultimate Plus certified",
      "Self-healing technology",
      "10-year manufacturer warranty",
      "Full front or full body coverage",
      "Maintains factory paint value",
    ],
    image: "/images/services/ppf.jpg",
  },
  {
    slug: "commercial",
    title: "Commercial Fleet",
    tagline: "Brand In Motion",
    description:
      "Turn your fleet into mobile billboards. Custom designed, precision installed graphics that maintain a professional appearance across your entire fleet.",
    features: [
      "Custom design services",
      "Fleet consistency guarantee",
      "Volume pricing",
      "National installation network",
      "Fleet management support",
    ],
    image: "/images/services/commercial.jpg",
  },
  {
    slug: "ceramic-coating",
    title: "Ceramic Coating",
    tagline: "The Ultimate Shield",
    description:
      "Professional-grade ceramic coatings that provide unmatched gloss, hydrophobic protection, and UV resistance for years.",
    features: [
      "Gtechniq Crystal Serum Ultra",
      "9H hardness rating",
      "Up to 9 years protection",
      "Extreme hydrophobic effect",
      "Enhanced gloss & depth",
    ],
    image: "/images/services/ceramic.jpg",
  },
];
