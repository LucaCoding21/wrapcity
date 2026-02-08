export interface Testimonial {
  quote: string;
  author: string;
  car: string;
  service: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "The attention to detail is unreal. My Huracán looks like it rolled out of a custom factory. Every edge, every curve — flawless.",
    author: "Marcus Chen",
    car: "Lamborghini Huracán",
    service: "Color Change Wrap",
  },
  {
    quote:
      "I was nervous about wrapping a brand new car, but the team made the entire process seamless. The PPF is completely invisible and gives me total peace of mind.",
    author: "Sarah Mitchell",
    car: "Porsche 911 GT3",
    service: "Paint Protection Film",
  },
  {
    quote:
      "We wrapped our entire delivery fleet of 30 vans. The quality is consistent across every single vehicle, and the turnaround time was incredible.",
    author: "David Park",
    car: "Commercial Fleet",
    service: "Fleet Wrapping",
  },
];
