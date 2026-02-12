import type { Metadata } from "next";
import { Reddit_Sans, Reddit_Sans_Condensed } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/smooth-scroll-provider";
import PreloaderProvider from "@/providers/preloader-provider";
import Preloader from "@/components/preloader/preloader";
import Navigation from "@/components/navigation/navigation";
import Footer from "@/components/footer/footer";

import NoiseOverlay from "@/components/ui/noise-overlay";

const redditSans = Reddit_Sans({
  subsets: ["latin"],
  variable: "--font-reddit-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const redditSansCondensed = Reddit_Sans_Condensed({
  subsets: ["latin"],
  variable: "--font-reddit-sans-condensed",
  display: "swap",
  weight: ["400", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wrapcity.co"),
  title: {
    default: "Wrap City | Premium Vehicle Wraps & Vinyl Graphics in South Surrey, BC",
    template: "%s | Wrap City - Vehicle Wraps South Surrey BC",
  },
  description:
    "Wrap City offers premium vehicle wraps, motorcycle wraps, commercial fleet graphics, and architectural vinyl in South Surrey, BC. 3M & Avery Dennison certified installer. Get a free quote today!",
  keywords: [
    // Low volume, low competition (880-1,900 monthly searches)
    "car wrap vs painting",
    "car wrap warranty",
    "car wrap gallery",
    "car wrap samples",
    "car wrap calculator",
    // Location-specific long-tail (low competition)
    "car wrap South Surrey",
    "vehicle wrap South Surrey",
    "vinyl wrap installer South Surrey",
    "wrap shop Fraser Valley",
    "car wrap White Rock",
    // Service-specific long-tail (low-medium competition)
    "matte black wrap installer",
    "color change wrap shop",
    "chrome delete Tesla",
    "motorcycle wrap BC",
    "commercial fleet wrap Vancouver",
    "Harley Davidson wrap",
    // Niche/specialty (very low competition)
    "architectural vinyl South Surrey",
    "storefront vinyl graphics Surrey",
    "single installer car wrap",
    "single installer wrap shop BC",
    // Question-based long-tail
    "how long does car wrap last",
    "will car wrap damage paint",
  ],
  authors: [{ name: "Wrap City", url: "https://wrapcity.co" }],
  creator: "Wrap City",
  publisher: "Wrap City",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Wrap City | Premium Vehicle Wraps & Vinyl Graphics in South Surrey, BC",
    description:
      "Transform your vehicle with premium vinyl wraps from Wrap City. Serving South Surrey and the Greater Vancouver area. 3M & Avery Dennison certified.",
    url: "https://wrapcity.co",
    siteName: "Wrap City",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wrap City - Premium Vehicle Wraps in South Surrey BC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wrap City | Premium Vehicle Wraps in South Surrey, BC",
    description:
      "Transform your vehicle with premium vinyl wraps. 3M & Avery Dennison certified installer serving South Surrey & Vancouver.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://wrapcity.co",
  },
  category: "Automotive Services",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://wrapcity.co/#business",
      name: "Wrap City",
      image: "https://wrapcity.co/images/logo.png",
      description:
        "Wrap City is a single-installer vehicle wrapping shop specializing in premium vinyl wraps, motorcycle wraps, commercial fleet graphics, and architectural vinyl. 3M & Avery Dennison certified installer serving South Surrey and Greater Vancouver.",
      url: "https://wrapcity.co",
      telephone: "+1-604-510-2400",
      email: "taylor@wrapcity.co",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1312 184 St",
        addressLocality: "Langley Township",
        addressRegion: "BC",
        postalCode: "V2Z 1K2",
        addressCountry: "CA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 49.0456,
        longitude: -122.7011,
      },
      areaServed: [
        { "@type": "City", name: "Langley" },
        { "@type": "City", name: "Surrey" },
        { "@type": "City", name: "South Surrey" },
        { "@type": "City", name: "White Rock" },
        { "@type": "City", name: "Vancouver" },
        { "@type": "City", name: "Burnaby" },
        { "@type": "City", name: "Abbotsford" },
      ],
      sameAs: [
        "https://www.instagram.com/wrapcity604",
        "https://www.facebook.com/wrapcity604",
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
      priceRange: "$$",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.4",
        reviewCount: "50",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "AutoRepair",
      "@id": "https://wrapcity.co/#autorepair",
      name: "Wrap City Vehicle Wraps",
      serviceType: [
        "Vehicle Wraps",
        "Motorcycle Wraps",
        "Commercial Fleet Wraps",
        "Paint Protection Film",
        "Chrome Delete",
        "Color Change Wraps",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://wrapcity.co/#website",
      url: "https://wrapcity.co",
      name: "Wrap City",
      publisher: { "@id": "https://wrapcity.co/#business" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://wrapcity.co/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How long does a car wrap last?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our color change wraps last 5 to 7 years with proper care. The longevity depends on factors like sun exposure, washing habits, and how the vehicle is stored. We use only premium 3M and Avery Dennison materials with manufacturer warranty.",
          },
        },
        {
          "@type": "Question",
          name: "Will a car wrap damage my paint?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. When installed and removed by certified professionals, a wrap actually protects your factory paint. We use only premium 3M and Avery Dennison films designed to remove cleanly.",
          },
        },
        {
          "@type": "Question",
          name: "Car wrap vs painting: which is better?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Wrapping offers several advantages over painting: it's reversible, protects your original paint, costs less than a quality paint job, and can be completed faster. Plus, you can change colors again in the future without affecting your vehicle's value.",
          },
        },
        {
          "@type": "Question",
          name: "What is your car wrap warranty?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We back all our work with the manufacturer's warranty, typically 5-7 years for color change wraps. As a 3M and Avery Dennison certified installer, you're getting materials and installation that meet the highest industry standards.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer chrome delete for Tesla and other vehicles?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. Chrome delete is one of our most popular services, especially for Tesla owners. We wrap chrome trim in satin black, gloss black, or body-matched colors for a clean, modern look.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${redditSans.variable} ${redditSansCondensed.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background font-body text-foreground antialiased">
        <PreloaderProvider>
          <Preloader />
          <SmoothScrollProvider>
            <NoiseOverlay />

            <Navigation />
            <main className="relative bg-background" style={{ zIndex: 1 }}>
              {children}
            </main>
            <Footer />
          </SmoothScrollProvider>
        </PreloaderProvider>
      </body>
    </html>
  );
}
