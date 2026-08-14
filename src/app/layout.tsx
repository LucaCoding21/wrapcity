import type { Metadata } from "next";
import { Reddit_Sans, Reddit_Sans_Condensed } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScrollProvider from "@/providers/smooth-scroll-provider";
import PreloaderProvider from "@/providers/preloader-provider";
import Preloader from "@/components/preloader/preloader";
import Navigation from "@/components/navigation/navigation";
import MovedAnnouncementBar from "@/components/announcement/moved-announcement-bar";
import Footer from "@/components/footer/footer";

import NoiseOverlay from "@/components/ui/noise-overlay";

const redditSans = Reddit_Sans({
  subsets: ["latin"],
  variable: "--font-reddit-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const redditSansCondensed = Reddit_Sans_Condensed({
  subsets: ["latin"],
  variable: "--font-reddit-sans-condensed",
  display: "swap",
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wrapcity.co"),
  title: {
    default: "Vehicle Wraps, PPF & Ceramic Coating | Wrap City Langley BC",
    template: "%s | Wrap City - Vehicle Wraps Langley BC",
  },
  description:
    "Premium car wraps, PPF, ceramic coating & fleet graphics in Langley, BC. 3M & Avery Dennison certified installer serving Surrey, White Rock & the Fraser Valley. Get a free quote!",
  keywords: [
    // Low volume, low competition (880-1,900 monthly searches)
    "car wrap vs painting",
    "car wrap warranty",
    "car wrap gallery",
    "car wrap samples",
    "car wrap calculator",
    // Location-specific long-tail (low competition)
    "car wrap Langley",
    "vehicle wrap Langley",
    "vinyl wrap installer Langley",
    "wrap shop Fraser Valley",
    "car wrap White Rock",
    "car wrap Surrey",
    // Service-specific long-tail (low-medium competition)
    "matte black wrap installer",
    "color change wrap shop",
    "chrome delete Tesla",
    "motorcycle wrap BC",
    "commercial fleet wrap Vancouver",
    "Harley Davidson wrap",
    // Protection services (new in-house offerings)
    "paint protection film Langley",
    "PPF installer Langley BC",
    "ceramic coating Langley",
    "boat wrap Fraser Valley",
    "marine wrap BC",
    // Niche/specialty (very low competition)
    "architectural vinyl Langley",
    "storefront vinyl graphics Surrey",
    "single installer car wrap",
    "single installer wrap shop BC",
    // Question-based long-tail
    "how long does car wrap last",
    "will car wrap damage paint",
    // Additional low-competition, location-specific
    "vinyl wrap near me Langley",
    "best car wrap shop Surrey BC",
    "Tesla wrap Surrey BC",
    "truck wrap Langley BC",
    "van wrap Surrey BC",
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
    title: "Vehicle Wraps, PPF & Ceramic Coating | Wrap City Langley BC",
    description:
      "Transform your vehicle with premium vinyl wraps, PPF & ceramic coating from Wrap City in Langley, BC. Serving Surrey, White Rock & the Fraser Valley. 3M & Avery Dennison certified.",
    url: "https://wrapcity.co",
    siteName: "Wrap City",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1920,
        height: 1080,
        alt: "Wrap City - Vinyl Styling & Protection in Langley BC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vehicle Wraps, PPF & Ceramic Coating | Wrap City Langley BC",
    description:
      "Transform your vehicle with premium vinyl wraps, PPF & ceramic coating. 3M & Avery Dennison certified installer in Langley, serving Surrey & the Fraser Valley.",
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
      image: "https://wrapcity.co/images/logo-new.png",
      description:
        "Wrap City is a single-installer vinyl and protection studio in Langley, BC specializing in premium vehicle wraps, paint protection film, ceramic coating, marine wraps, commercial fleet graphics, and architectural vinyl. 3M & Avery Dennison certified installer proudly serving Langley, Surrey, White Rock, South Surrey and the Fraser Valley.",
      url: "https://wrapcity.co",
      telephone: "+1-604-510-2400",
      email: "taylor@wrapcity.co",
      address: {
        "@type": "PostalAddress",
        streetAddress: "106-20058 Industrial Ave",
        addressLocality: "Langley",
        addressRegion: "BC",
        postalCode: "V3A 4K7",
        addressCountry: "CA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 49.107,
        longitude: -122.655,
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
        "Paint Protection Film",
        "Ceramic Coating",
        "Boat & Marine Wraps",
        "Motorcycle Wraps",
        "Commercial Fleet Wraps",
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
          name: "Do you offer PPF or ceramic coating?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We install paint protection film and professional ceramic coating in-house at our Langley studio. PPF is a transparent, self-healing film that shields paint from rock chips and road debris, and our ceramic coating packages are available in 1, 3, and 5-year options for vehicles and boats.",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H3X4SFKGXC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H3X4SFKGXC');
          `}
        </Script>
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

            <MovedAnnouncementBar />
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
