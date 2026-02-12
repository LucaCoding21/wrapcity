import Hero from "./(home)/sections/hero";
import GoogleReviews from "./(home)/sections/google-reviews";
import Services from "./(home)/sections/services";
import About from "./(home)/sections/about";
import Gallery from "./(home)/sections/gallery";
import FacebookPosts from "./(home)/sections/facebook-posts";
import FAQ from "./(home)/sections/faq";
import Contact from "./(home)/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <GoogleReviews />
      <Services />
      <About />
      <Gallery />
      <FacebookPosts />
      <FAQ />
      <Contact />
    </>
  );
}
