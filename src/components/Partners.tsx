"use client";

import Image from "next/image";

type Collaborator = { name: string; logo: string };
type PartnersProps = { collaborators?: Collaborator[] };

/**
 * No fallback logos: the previous set belonged to another practice and
 * implying accreditations the practice does not hold is a real risk.
 * Add real affiliations in the Studio to bring this section back.
 */
export default function Partners({ collaborators = [] }: PartnersProps) {
  if (collaborators.length === 0) return null;

  return (
    <section className="border-y border-[color:var(--line)] bg-bone py-16">
      <div className="shell">
        <p className="eyebrow fade-in-up text-center">Affiliations</p>
        <div className="fade-in-up delay-200 mt-10 flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
          {collaborators.map((partner) => (
            <Image
              key={partner.name}
              src={partner.logo}
              alt={partner.name}
              width={140}
              height={70}
              className="h-11 w-auto object-contain opacity-45 grayscale transition-all duration-700 ease-soft hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
