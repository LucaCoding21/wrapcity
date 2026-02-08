import Hero from "./(home)/sections/hero";
import TrustBar from "./(home)/sections/trust-bar";
import Services from "./(home)/sections/services";
import Portfolio from "./(home)/sections/portfolio";
import Process from "./(home)/sections/process";
import Testimonials from "./(home)/sections/testimonials";
import FAQ from "./(home)/sections/faq";
import FinalCTA from "./(home)/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Portfolio />
      <Services />
      <Process />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
