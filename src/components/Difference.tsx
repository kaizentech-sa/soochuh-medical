"use client";

import Image from "next/image";
import Link from "next/link";

type DifferenceProps = {
  whatMakesUsDifferentDescription?: string;
  whatMakesUsDifferentButtonLink?: string;
  nextVisitDescription?: string;
  nextVisitButtonLink?: string;
};

const DEFAULT_WHAT_MAKES_US_DIFFERENT =
  "At Soochuh Medical, we combine clinical expertise with a welcoming, calm environment. Our team works collaboratively so you receive consistent, well-informed care across your visits—time to understand your needs and goals, not rushed appointments.";

const DEFAULT_NEXT_VISIT =
  "At your visit, we review your information, discuss your concerns, and work with you to plan the most appropriate next steps for your health and well-being.";

export default function Difference({
  whatMakesUsDifferentDescription,
  whatMakesUsDifferentButtonLink,
  nextVisitDescription,
  nextVisitButtonLink,
}: DifferenceProps) {
  return (
    <section id="difference" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* What Makes Us Different */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="absolute -left-8 -top-8 w-64 h-64 bg-[#e8f0f1] rounded-full opacity-50" />
            <div className="relative rounded-full overflow-hidden w-80 h-80 mx-auto lg:mx-0">
              <Image
                src="https://ext.same-assets.com/3349237986/1072601824.webp"
                alt="Soochuh Medical care team"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-20 top-0 w-96 h-96 bg-[#f5f5f5] rounded-full opacity-50" />
            <div className="relative">
              <h2 className="font-heading text-3xl md:text-4xl text-[#5a7a7f] font-semibold mb-6">
                What Makes Us Different
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {whatMakesUsDifferentDescription || DEFAULT_WHAT_MAKES_US_DIFFERENT}
              </p>
              <Link
                href={whatMakesUsDifferentButtonLink || "#team"}
                className="inline-block border border-[#5a7a7f] text-[#5a7a7f] px-6 py-3 rounded-sm font-medium hover:bg-[#5a7a7f] hover:text-white transition-colors"
              >
                Click To Find Out More
              </Link>
            </div>
          </div>
        </div>

        {/* What To Expect */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -left-20 top-0 w-96 h-96 bg-[#e8f0f1] rounded-full opacity-30" />
            <div className="relative">
              <h2 className="font-heading text-3xl md:text-4xl text-[#5a7a7f] font-semibold mb-6">
                What To Expect At Your Next Visit
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {nextVisitDescription || DEFAULT_NEXT_VISIT}
              </p>
              <Link
                href={nextVisitButtonLink || "#contact"}
                className="inline-block border border-[#5a7a7f] text-[#5a7a7f] px-6 py-3 rounded-sm font-medium hover:bg-[#5a7a7f] hover:text-white transition-colors"
              >
                Click To Find Out More
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="absolute -right-8 -top-8 w-64 h-64 bg-[#e8f0f1] rounded-full opacity-50" />
            <div className="relative rounded-full overflow-hidden w-80 h-80 mx-auto lg:ml-auto lg:mr-0">
              <Image
                src="https://ext.same-assets.com/3349237986/63651298.webp"
                alt="Patient consultation at Soochuh Medical"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
