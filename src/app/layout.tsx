import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/providers/smooth-scroll-provider";
import PreloaderProvider from "@/providers/preloader-provider";
import Preloader from "@/components/preloader/preloader";
import Navigation from "@/components/navigation/navigation";
import Footer from "@/components/footer/footer";

import NoiseOverlay from "@/components/ui/noise-overlay";

const clashDisplay = localFont({
  src: "../fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  display: "swap",
  weight: "200 700",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: "900",
  variable: "--font-roboto",
  display: "swap",
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
    <html lang="en" className={`${clashDisplay.variable} ${inter.variable} ${roboto.variable}`}>
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
