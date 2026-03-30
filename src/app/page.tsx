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
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";

type HeroSlide = {
  image: any;
  alt?: string;
  caption?: string;
};

type HeroData = {
  slideshowImages?: HeroSlide[];
} | null;

async function getHeroData() {
  return client.fetch<HeroData>(`*[_type == "hero" && _id == "hero"][0]{
    slideshowImages[]{
      alt,
      caption,
      "image": asset
    }
  }`);
}

export default async function Home() {
  const heroData = await getHeroData();

  const heroSlides =
    heroData?.slideshowImages?.map((slide) => ({
      src: urlFor(slide.image).width(2200).height(1400).fit("crop").url(),
      alt: slide.alt || "Hero slideshow image",
      caption: slide.caption,
    })) ?? [];

  return (
    <main className="min-h-screen">
      <ScrollAnimator />
      <Header />
      <div className="pt-20">
        <Hero slides={heroSlides} />
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
