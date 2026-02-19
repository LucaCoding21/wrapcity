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
    slug: "vehicle-wraps",
    title: "Vehicle Wraps",
    tagline: "Color Change Vinyl & Custom Automotive Wraps",
    description:
      "Color change vinyl, custom automotive wraps, printed graphics, chrome deletes, decals, and personal styling. Your vehicle, your vision — wrapped with precision.",
    icon: "wrap",
    image: "/images/jeep4.jpg",
    imageAlt:
      "Custom color change vehicle wrap with vinyl graphics by Wrap City",
  },
  {
    slug: "recreational-vehicle-wraps",
    title: "Recreational Vehicle Wraps",
    tagline: "Motorcycles, Trailers & Boats",
    description:
      "Vinyl wraps for motorcycles, sport bikes, Harley\u2019s, trailers, and boats, providing durable protection and long-lasting performance.",
    icon: "motorcycle",
    image: "/images/motorcycle.jpeg",
    imageAlt:
      "Custom Harley Davidson motorcycle wrap with glossy finish by Wrap City",
  },
  {
    slug: "fleet-graphics",
    title: "Fleet Graphics & Commercial Vehicle Branding",
    tagline: "Vans, Trucks, Semis & Service Fleets",
    description:
      "Mobile branding for businesses to increase visibility, maintain a professional appearance, and maximize ROI through effective on-the-go marketing.",
    icon: "truck",
    image: "/images/commercial-fleet.jpg",
    imageAlt:
      "Monster Energy commercial fleet van wrap with branded graphics by Wrap City",
  },
  {
    slug: "architectural-vinyl",
    title: "Architectural Vinyl & Interior Graphics",
    tagline: "Surface Transformations for Any Space",
    description:
      "Murals, floor/wall graphics, wayfinding, and window film for homes, businesses, events, and venues.",
    icon: "building",
    image: "/images/murals.jpeg",
    imageAlt:
      "Architectural vinyl and interior graphics for walls and surfaces",
  },
  {
    slug: "municipal-installations",
    title: "Municipal & Public Installations",
    tagline: "Public-Sector Ready",
    description:
      "Durable, weather-resistant vinyl for public spaces including electrical boxes, park features, civic buildings, wayfinding signage, and community murals. Available with anti-graffiti protection.",
    icon: "city",
    image: "/images/municpality.JPG",
    imageAlt:
      "Municipal vinyl wrap and public installation project by Wrap City",
  },
  {
    slug: "storefront-advertising",
    title: "Storefront & Window Advertising",
    tagline: "Cut Vinyl, Window Perf & Frosting",
    description:
      "Cut vinyl lettering, window perf, window frosting, and promotional displays. Maximize your storefront visibility with professional signage.",
    icon: "storefront",
    image: "/images/commercial.jpeg",
    imageAlt:
      "Storefront window graphics and vinyl lettering for business advertising",
  },
  {
    slug: "business-branding",
    title: "Complete Business Branding Packages",
    tagline: "Fleet + Storefront + Interior + Signage",
    description:
      "End-to-end branding solutions combining fleet graphics, storefront signage, interior graphics, and complete signage packages. One team, one cohesive brand across every touchpoint.",
    icon: "brand",
    image: "/images/architectural.jpg",
    imageAlt:
      "Complete business branding package with fleet wraps and storefront graphics",
  },
];
