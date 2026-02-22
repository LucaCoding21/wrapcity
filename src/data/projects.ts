export interface Project {
  slug: string;
  title: string;
  car: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  year: string;
}

export const projects: Project[] = [
  {
    slug: "midnight-lambo",
    title: "Midnight Phantom",
    car: "Lamborghini Huracán",
    category: "Color Change",
    description: "Full satin black wrap with gloss black accents and chrome delete.",
    image: "/images/portfolio/project-1.jpg",
    imageAlt:
      "Lamborghini Huracán with full satin black vinyl wrap and chrome delete by Wrap City South Surrey",
    year: "2024",
  },
  {
    slug: "rose-gold-g-wagon",
    title: "Rose Gold Majesty",
    car: "Mercedes G-Wagon",
    category: "Color Change",
    description: "Custom rose gold metallic wrap with PPF on high-impact areas.",
    image: "/images/portfolio/project-2.jpg",
    imageAlt:
      "Mercedes G-Wagon rose gold metallic color change wrap with paint protection film installed near White Rock BC",
    year: "2024",
  },
  {
    slug: "stealth-992",
    title: "Stealth Mode",
    car: "Porsche 911 GT3",
    category: "PPF",
    description: "Full body XPEL Stealth PPF for a satin finish over factory paint.",
    image: "/images/portfolio/project-3.jpg",
    imageAlt:
      "Porsche 911 GT3 with XPEL Stealth paint protection film for matte satin finish by Wrap City South Surrey BC",
    year: "2024",
  },
  {
    slug: "fleet-transform",
    title: "Fleet Transformation",
    car: "Commercial Fleet",
    category: "Commercial",
    description: "Complete fleet branding for 25 vehicles with custom graphics.",
    image: "/images/portfolio/project-4.jpg",
    imageAlt:
      "Commercial fleet vehicle wrap branding project with custom business graphics in Surrey BC",
    year: "2023",
  },
  {
    slug: "matte-army-urus",
    title: "Urban Warrior",
    car: "Lamborghini Urus",
    category: "Color Change",
    description: "Matte army green wrap with carbon fiber hood and mirror caps.",
    image: "/images/portfolio/project-5.jpg",
    imageAlt:
      "Lamborghini Urus matte army green vinyl wrap with carbon fiber accents wrapped at our South Surrey shop",
    year: "2023",
  },
  {
    slug: "chrome-delete-model-s",
    title: "Clean Slate",
    car: "Tesla Model S",
    category: "Chrome Delete",
    description: "Full chrome delete with satin black trim and tinted taillights.",
    image: "/images/portfolio/project-6.jpg",
    imageAlt:
      "Tesla Model S chrome delete with satin black vinyl trim wrap in Vancouver area",
    year: "2023",
  },
];

export const categories = [
  "All",
  "Color Change",
  "PPF",
  "Commercial",
  "Chrome Delete",
] as const;
