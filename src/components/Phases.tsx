"use client";

import Image from "next/image";

type SpecialisationCard = {
  image: string;
  title: string;
  subtitle?: string;
};

type PhasesProps = {
  cards?: SpecialisationCard[];
};

const fallbackCards: SpecialisationCard[] = [
  {
    image: "https://ext.same-assets.com/3349237986/1440105504.png",
    title: "Primary Care",
    subtitle: "Preventative care and ongoing health management.",
  },
  {
    image: "https://ext.same-assets.com/3349237986/1440105504.png",
    title: "Pediatrics",
    subtitle: "Specialised healthcare for infants, children, and adolescents.",
  },
  {
    image: "https://ext.same-assets.com/3349237986/1440105504.png",
    title: "Dermatology",
    subtitle: "Diagnosis and treatment for skin and hair conditions.",
  },
  {
    image: "https://ext.same-assets.com/3349237986/1440105504.png",
    title: "Cardiology",
    subtitle: "Heart and cardiovascular system assessment and care.",
  },
];

export default function Phases({ cards = [] }: PhasesProps) {
  const items = cards.length > 0 ? cards : fallbackCards;

  return (
    <section className="py-16 md:py-24 bg-[#3c4f5a]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4">
            OUR FIELDS OF HEALTHCARE
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base">
            We provide expert care across key areas of modern healthcare.
          </p>
          <div className="w-16 h-1 bg-[#5a7a7f] mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((card) => (
            <article
              key={`${card.title}-${card.subtitle ?? "card"}`}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative h-48">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-base font-semibold text-[#3c4f5a]">
                  {card.title}
                </h3>
                {card.subtitle && (
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {card.subtitle}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
