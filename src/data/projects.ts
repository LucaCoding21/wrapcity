export interface Project {
  slug: string;
  title: string;
  car: string;
  category: string;
  description: string;
  image: string;
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
    year: "2024",
  },
  {
    slug: "rose-gold-g-wagon",
    title: "Rose Gold Majesty",
    car: "Mercedes G-Wagon",
    category: "Color Change",
    description: "Custom rose gold metallic wrap with PPF on high-impact areas.",
    image: "/images/portfolio/project-2.jpg",
    year: "2024",
  },
  {
    slug: "stealth-992",
    title: "Stealth Mode",
    car: "Porsche 911 GT3",
    category: "PPF",
    description: "Full body XPEL Stealth PPF for a satin finish over factory paint.",
    image: "/images/portfolio/project-3.jpg",
    year: "2024",
  },
  {
    slug: "fleet-transform",
    title: "Fleet Transformation",
    car: "Commercial Fleet",
    category: "Commercial",
    description: "Complete fleet branding for 25 vehicles with custom graphics.",
    image: "/images/portfolio/project-4.jpg",
    year: "2023",
  },
  {
    slug: "matte-army-urus",
    title: "Urban Warrior",
    car: "Lamborghini Urus",
    category: "Color Change",
    description: "Matte army green wrap with carbon fiber hood and mirror caps.",
    image: "/images/portfolio/project-5.jpg",
    year: "2023",
  },
  {
    slug: "chrome-delete-model-s",
    title: "Clean Slate",
    car: "Tesla Model S",
    category: "Chrome Delete",
    description: "Full chrome delete with satin black trim and tinted taillights.",
    image: "/images/portfolio/project-6.jpg",
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
