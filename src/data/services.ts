export interface Service {
  slug: string;
  title: string;
  tagline: string;
  bullets: string[];
  icon: string;
  image: string;
  imageAlt: string;
}

export const services: Service[] = [
  {
    slug: "automotive-vinyl-wraps",
    title: "Automotive Vinyl Wraps",
    tagline: "Change the Colour. Change the Look.",
    bullets: [
      "Full & partial colour change wraps",
      "Custom printed wraps & graphics",
      "Matte, satin, gloss, metallic & specialty finishes",
      "Chrome deletes & vinyl accents",
      "Custom decals & branding",
    ],
    icon: "wrap",
    image: "/images/jeep4.jpg",
    imageAlt:
      "Custom colour change vehicle wrap with vinyl graphics installed in Langley BC",
  },
  {
    slug: "paint-protection-film",
    title: "Paint Protection Film (PPF)",
    tagline: "Invisible, Self-Healing Protection",
    bullets: [
      "Full & partial paint protection",
      "Self-healing polyurethane film",
      "Protection from rock chips, scratches & road debris",
      "UV & environmental protection",
      "Precision-cut patterns & edge protection",
    ],
    icon: "shield",
    image: "/images/ppf-install.webp",
    imageAlt:
      "Paint protection film being applied to a black Jaguar F-Type at Wrap City in Langley BC",
  },
  {
    slug: "ceramic-coating",
    title: "Ceramic Coating",
    tagline: "Gloss, Protection & Easy Cleaning",
    bullets: [
      "Hydrophobic, chemical-resistant protection",
      "UV & contaminant protection",
      "Enhanced gloss & easier maintenance",
    ],
    icon: "sparkle",
    image: "/images/ceramic.webp",
    imageAlt:
      "Red Corvette with deep gloss finish after professional ceramic coating at Wrap City in Langley BC",
  },
  {
    slug: "marine-ppf",
    title: "Marine PPF",
    tagline: "Invisible Armour for Hulls & Topsides",
    bullets: [
      "Clear, seamless film for hulls & topsides",
      "Helps prevent dock rash, scratches & abrasion",
      "Preserves your vessel's finish & value for 10+ years",
    ],
    icon: "shield",
    image: "",
    imageAlt: "",
  },
  {
    slug: "marine-ceramic-coating",
    title: "Marine Ceramic Coating",
    tagline: "Gelcoat & Painted-Surface Protection",
    bullets: [
      "Gelcoat & painted-surface protection",
      "Hydrophobic & UV-resistant",
      "Helps prevent staining, oxidation & contamination",
      "Faster washdowns, less time on upkeep",
    ],
    icon: "sparkle",
    image: "",
    imageAlt: "",
  },
  {
    slug: "marine-vinyl-graphics",
    title: "Marine Vinyl & Graphics",
    tagline: "Wraps, Hull Lettering & Custom Graphics",
    bullets: [
      "Full & partial wraps",
      "Colour changes & custom graphics",
      "Hull lettering, striping & branding",
      "Marine-grade vinyl",
    ],
    icon: "wrap",
    image: "",
    imageAlt: "",
  },
  {
    slug: "architectural-interior",
    title: "Architectural & Interior",
    tagline: "Surface Film, Wall Graphics & Window Film",
    bullets: [
      "Surface film for cabinets, countertops, doors & millwork",
      "Wood, stone & specialty finishes",
      "Murals, feature walls & floor graphics",
      "Branding & wayfinding",
      "Frosted, decorative & perforated window film",
    ],
    icon: "building",
    image: "/images/murals.jpeg",
    imageAlt:
      "Architectural vinyl and interior graphics for walls and surfaces by Wrap City Langley",
  },
  {
    slug: "commercial-fleet-branding",
    title: "Commercial Fleet & Business Branding",
    tagline: "Fleet Wraps, Signage & Complete Branding",
    bullets: [
      "Full & partial wraps for vans, trucks & service vehicles",
      "Door graphics, decals, lettering & reflective graphics",
      "Trailer & equipment graphics",
      "Storefront graphics & window advertising",
      "Interior branding & complete branding packages",
    ],
    icon: "truck",
    image: "/images/commercial-fleet.jpg",
    imageAlt:
      "Monster Energy commercial fleet van wrap with branded graphics serving Greater Vancouver",
  },
];
