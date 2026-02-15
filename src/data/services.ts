export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  image: string;
  imageAlt: string;
}

export const services: Service[] = [
  {
    slug: "motorcycle-wraps",
    title: "Motorcycles, Toys & Boats",
    tagline: "Harley Davidson & Sport Bike Specialists",
    description:
      "Custom wraps for motorcycles, toys, and boats. From Harley Davidsons and sport bikes to ATVs, jet skis, and watercraft. Our single-installer approach ensures every curve and detail is wrapped with precision. Serving South Surrey and the Fraser Valley.",
    icon: "motorcycle",
    image: "/images/motorcycle.jpeg",
    imageAlt:
      "Custom Harley Davidson motorcycle wrap with glossy black and chrome finish in South Surrey BC",
  },
  {
    slug: "vehicle-wraps",
    title: "Vehicle Wraps",
    tagline: "Color Change & Matte Black Specialists",
    description:
      "Full color change wraps in matte black, satin, gloss, and specialty finishes. Unlike larger shops, we're a single-installer wrap shop. Your vehicle gets our complete attention, not an assembly line.",
    icon: "wrap",
    image: "/images/vehicle-wrap.jpg",
    imageAlt:
      "Full vehicle wrap on Ford Mustang with custom vinyl graphics by Wrap City",
  },
  {
    slug: "commercial-fleet-wraps",
    title: "Commercial Fleet Wraps",
    tagline: "South Surrey Fleet Graphics",
    description:
      "Commercial fleet wraps that turn your vehicles into mobile billboards. We serve businesses throughout South Surrey and the Fraser Valley with 3M and Avery Dennison certified installations.",
    icon: "truck",
    image: "/images/commercial.jpeg",
    imageAlt:
      "Commercial fleet van wrap with branded graphics for business advertising in Surrey BC",
  },
  {
    slug: "architectural-vinyl",
    title: "Architectural Vinyl",
    tagline: "Interior & Exterior Surfaces",
    description:
      "Architectural vinyl for walls, furniture, countertops, and accent features. A cost-effective alternative to painting or replacement with professional installation in South Surrey and surrounding areas.",
    icon: "building",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    imageAlt:
      "Modern office interior with architectural vinyl film applied to walls and surfaces",
  },
  {
    slug: "storefront-advertising",
    title: "Storefront Vinyl Graphics",
    tagline: "Window & Storefront Advertising",
    description:
      "Storefront vinyl graphics, window decals, and perforated vinyl that maximize your business visibility. Professional installation for South Surrey and White Rock businesses.",
    icon: "storefront",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80",
    imageAlt:
      "Storefront window graphics and vinyl signage for retail business advertising",
  },
  {
    slug: "municipal-projects",
    title: "Municipal Projects",
    tagline: "Community & Public Art",
    description:
      "Large scale wraps for municipal vehicles and public art installations. We partner with cities and organizations throughout the Fraser Valley to beautify public spaces with durable, warrantied vinyl.",
    icon: "city",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    imageAlt:
      "Large scale municipal vinyl wrap project for public art installation in Greater Vancouver",
  },
];
