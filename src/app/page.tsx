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

type SpecialisationCard = {
  image: any;
  title: string;
  subtitle?: string;
};

type SpecialisationsData = {
  cards?: SpecialisationCard[];
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

async function getSpecialisationsData() {
  return client.fetch<SpecialisationsData>(
    `*[_type == "specialisations" && _id == "specialisations"][0]{
      cards[]{
        title,
        subtitle,
        "image": image.asset
      }
    }`,
  );
}

export default async function Home() {
  const [heroData, specialisationsData] = await Promise.all([
    getHeroData(),
    getSpecialisationsData(),
  ]);

  const heroSlides =
    heroData?.slideshowImages?.map((slide) => ({
      src: urlFor(slide.image).width(2200).height(1400).fit("crop").url(),
      alt: slide.alt || "Hero slideshow image",
      caption: slide.caption,
    })) ?? [];

  const specialisationCards =
    specialisationsData?.cards?.map((card) => ({
      image: urlFor(card.image).width(1000).height(700).fit("crop").url(),
      title: card.title,
      subtitle: card.subtitle,
    })) ?? [];

  return (
    <main className="min-h-screen">
      <ScrollAnimator />
      <Header />
      <div className="pt-20">
        <Hero slides={heroSlides} />
        <Services />
        <About />
        <Phases cards={specialisationCards} />
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
