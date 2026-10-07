import BookingSection from "@/components/home/BookingSection";
import DentalRail from "@/components/home/DentalRail";
import Doctors from "@/components/home/Doctors";
import FaqSection from "@/components/home/FaqSection";
import FirstVisit from "@/components/home/FirstVisit";
import Hero from "@/components/home/Hero";
import Location from "@/components/home/Location";
import MedicalBento from "@/components/home/MedicalBento";
import PracticeBand from "@/components/home/PracticeBand";
import Pricing from "@/components/home/Pricing";
import ProofStrip from "@/components/home/ProofStrip";
import Reviews from "@/components/home/Reviews";
import Statement from "@/components/home/Statement";
import WhyUs from "@/components/home/WhyUs";
import { generalFaqs } from "@/data/site";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: generalFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/**
 * Ordered the way the practice asked: welcome, then booking, then
 * treatments. Trust (promise, practice, people, price, reviews) follows.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <BookingSection />
      <DentalRail />
      <MedicalBento />
      <Statement />
      <PracticeBand />
      <WhyUs />
      <FirstVisit />
      <Doctors />
      <Pricing />
      <Reviews />
      <FaqSection />
      <Location />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
