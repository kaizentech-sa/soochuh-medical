"use client";

import Image from "next/image";

const partners = [
  { name: "Slow Dentistry", logo: "https://ext.same-assets.com/3349237986/3011176184.webp" },
  { name: "Style Italiano", logo: "https://ext.same-assets.com/3349237986/76657964.webp" },
  { name: "SAAAD", logo: "https://ext.same-assets.com/3349237986/2469611337.jpeg" },
  { name: "Di Ceram", logo: "https://ext.same-assets.com/3349237986/2421002194.webp" },
  { name: "Ceramiart", logo: "https://ext.same-assets.com/3349237986/269480022.webp" },
  { name: "ITI", logo: "https://www.smithandvanlierop.co.za/images/ITI-2.jpg" },
];

export default function Partners() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h3 className="text-[#5a7a7f] text-sm font-medium tracking-widest uppercase mb-4">
            We work with the best, for you.
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            At Soochuh Medical, our clinicians are recognised by leading industry
            organisations and collaborate with trusted healthcare partners to
            deliver exceptional, patient-centred care.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 fade-in-up delay-200">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="partner-logo flex items-center justify-center"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={130}
                height={65}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
