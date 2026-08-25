"use client";

import Image from "next/image";
import Link from "next/link";

type SpecialisationCard = { image: string; title: string; subtitle?: string };
type PhasesProps = { cards?: SpecialisationCard[] };

const fallbackCards: SpecialisationCard[] = [
  {
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80",
    title: "General dentistry",
    subtitle: "Check-ups, fillings and the everyday work that keeps bigger problems away.",
  },
  {
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80",
    title: "Aesthetic dentistry",
    subtitle: "Bonding, veneers and smile design, planned tooth by tooth.",
  },
  {
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1000&q=80",
    title: "General practice",
    subtitle: "Acute illness, chronic conditions and referrals, handled in-house.",
  },
  {
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1000&q=80",
    title: "Women's health",
    subtitle: "Screening, contraception and routine care, without the lecture.",
  },
];

export default function Phases({ cards = [] }: PhasesProps) {
  const items = cards.length > 0 ? cards : fallbackCards;

  return (
    <section id="fields" className="section relative overflow-hidden bg-teal-950 text-white">
      {/* soft radial wash so the dark band does not read flat */}
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[560px] w-[560px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #008080 0%, transparent 70%)" }}
      />
      <div className="shell relative">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow fade-in-up text-teal-300">03 — Fields of care</p>
            <h2 className="display-lg fade-in-up delay-100 mt-5 font-display text-white">
              What we look after
            </h2>
          </div>
          <p className="fade-in-up delay-200 font-sans font-light text-white/65 md:col-span-5">
            Four areas cover most of what walks through the door. Anything outside
            them, we will tell you honestly and point you to the right person.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((card, i) => (
            <article
              key={`${card.title}-${i}`}
              className={`fade-in-up group delay-${(i % 4) * 100 || 100}`}
            >
              <Link href="#contact" className="block">
                <div className="img-zoom arch-soft relative aspect-[4/5] w-full bg-teal-900">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-90 transition-opacity duration-700 group-hover:opacity-100"
                  />
                </div>
                <h3 className="mt-6 font-display text-2xl text-white transition-colors duration-500 group-hover:text-teal-300">
                  {card.title}
                </h3>
                {card.subtitle && (
                  <p className="mt-3 font-sans text-[14px] font-light leading-relaxed text-white/60">
                    {card.subtitle}
                  </p>
                )}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
