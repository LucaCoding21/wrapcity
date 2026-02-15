import Hero from "./(home)/sections/hero";
import QuickContact from "./(home)/sections/quick-contact";
import GoogleReviews from "./(home)/sections/google-reviews";
import Services from "./(home)/sections/services";
import About from "./(home)/sections/about";
import TrustBuilder from "./(home)/sections/trust-builder";
import Gallery from "./(home)/sections/gallery";
import FacebookPosts from "./(home)/sections/facebook-posts";
import FAQ from "./(home)/sections/faq";
import Contact from "./(home)/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickContact />
      <GoogleReviews />
      <Services />
      <About />
      <TrustBuilder />
      <Gallery />
      <FacebookPosts />
      <FAQ />
      <Contact />
    </>
  );
}
