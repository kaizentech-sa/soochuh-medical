import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Phases from "@/components/Phases";
import Difference from "@/components/Difference";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import Team from "@/components/Team";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ContactBar from "@/components/ContactBar";
import ScrollAnimator from "@/components/ScrollAnimator";

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollAnimator />
      <Header />
      <div className="pt-20">
        <Hero />
        <Services />
        <About />
        <Phases />
        <Difference />
        <Testimonials />
        <Gallery />
        <Team />
        <Partners />
        <Contact />
        <Footer />
      </div>
      <ContactBar />
    </main>
  );
}
