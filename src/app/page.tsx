import Hero from "./(home)/sections/hero";
import QuickContact from "./(home)/sections/quick-contact";
import GoogleReviews from "./(home)/sections/google-reviews";
import Services from "./(home)/sections/services";
import About from "./(home)/sections/about";
import TrustBuilder from "./(home)/sections/trust-builder";
import Gallery from "./(home)/sections/gallery";
import BeforeAfter from "./(home)/sections/before-after";
import FacebookPosts from "./(home)/sections/facebook-posts";
import FAQ from "./(home)/sections/faq";
import Contact from "./(home)/sections/contact";
import Inventory from "./(home)/sections/inventory";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickContact />
      <GoogleReviews />
      <Services />
      <About />
      <BeforeAfter />
      <TrustBuilder />
      <Gallery />
      <FacebookPosts />
      <FAQ />
      <Contact />
      <Inventory />
    </>
  );
}
