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
      "Color change vinyl, custom automotive wraps, printed graphics, chrome deletes, decals, and personal styling. Your vehicle, your vision, wrapped with precision.",
    icon: "wrap",
    image: "/images/jeep4.jpg",
    imageAlt:
      "Custom color change vehicle wrap with vinyl graphics installed in Langley BC",
  },
  {
    slug: "paint-protection-film",
    title: "Paint Protection Film (PPF)",
    tagline: "Invisible, Self-Healing Protection",
    description:
      "Transparent, self-healing urethane film that shields your paint from rock chips, road debris, scratches, and UV damage. A real physical barrier that preserves factory paint and resale value, invisible once installed.",
    icon: "shield",
    image: "/images/ppf-install.webp",
    imageAlt:
      "Paint protection film being applied to a black Jaguar F-Type at Wrap City in Langley BC",
  },
  {
    slug: "ceramic-coating",
    title: "Ceramic Coating",
    tagline: "Gloss, Protection & Easy Cleaning",
    description:
      "Professional nano-ceramic coating that bonds to paint, vinyl, PPF, and marine surfaces. Repels water and grime, resists UV, deepens gloss, and makes washing dramatically easier. Available in 1, 3, and 5-year packages for vehicles and boats.",
    icon: "sparkle",
    image: "/images/ceramic.webp",
    imageAlt:
      "Red Corvette with deep gloss finish after professional ceramic coating at Wrap City in Langley BC",
  },
  {
    slug: "marine-recreational",
    title: "Marine & Recreational",
    tagline: "Boats, Motorcycles & Trailers",
    description:
      "Vinyl wraps and protection for boats, personal watercraft, motorcycles, and trailers. Durable, UV-resistant finishes built for the water and the road.",
    icon: "motorcycle",
    image: "/images/motorcycle.jpeg",
    imageAlt:
      "Custom Harley Davidson motorcycle wrap with glossy finish by Wrap City Langley BC",
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
      "Monster Energy commercial fleet van wrap with branded graphics serving Greater Vancouver",
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
      "Architectural vinyl and interior graphics for walls and surfaces by Wrap City Langley",
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
      "Storefront window graphics and vinyl lettering for business advertising in Surrey BC",
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
      "Complete business branding package with fleet wraps and storefront graphics by Wrap City",
  },
];
