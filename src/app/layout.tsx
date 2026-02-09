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
  title: {
    default: "Wrap City | Luxury Vinyl Styling",
    template: "%s | Wrap City",
  },
  description:
    "Premium car wrapping, paint protection film, and ceramic coating services. Transform your vehicle with Wrap City.",
  openGraph: {
    title: "Wrap City | Luxury Vinyl Styling",
    description:
      "Premium car wrapping, paint protection film, and ceramic coating services.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${redditSans.variable} ${redditSansCondensed.variable}`}>
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
