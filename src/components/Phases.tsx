"use client";

import { useState } from "react";
import Image from "next/image";

const phases = [
  {
    id: 1,
    title: "DETAILED CONSULTATION",
    content:
      "Every smile transformation journey at our clinic begins with an in-depth consultation. We delve into your dental history, assess your current oral health and discuss your aesthetic aspirations. This phase involves using the latest digital tools, such as 3D scanning and radiographs, to gather comprehensive information.",
  },
  {
    id: 2,
    title: "PLANNING AND TESTING",
    content:
      "Using advanced digital smile design technology, we create detailed mock-ups of your future smile. This planning phase involves collaborative discussions with our extended team to ensure every aspect of your smile is perfect.",
  },
  {
    id: 3,
    title: "MINIMAL REMOVAL",
    content:
      "Our philosophy prioritises preserving your natural tooth structure. By using advanced techniques, we ensure minimal enamel removal, maintaining the strength and integrity of your teeth.",
  },
  {
    id: 4,
    title: "HOLISTIC RESTORATIVE APPROACH",
    content:
      "Our focus extends beyond mere aesthetics. We consider the overall health and functionality of your teeth, ensuring your new smile harmoniously complements your facial structure and functions seamlessly.",
  },
  {
    id: 5,
    title: "LONG-LASTING RESULTS",
    content:
      "Our commitment extends beyond the completion of your smile transformation. We provide ongoing guidance and support to help you maintain your new, radiant smile for years to come.",
  },
];

export default function Phases() {
  const [activePhase, setActivePhase] = useState(1);

  return (
    <section className="py-16 md:py-24 bg-[#3c4f5a]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4">
            CRAFTING YOUR PERFECT SMILE
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base">
            Embarking on a smile makeover journey with us is a collaborative and
            exciting experience. Here's what you can expect:
          </p>
          <div className="w-16 h-1 bg-[#5a7a7f] mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Accordion */}
          <div className="relative pl-6 md:pl-8">
            {/* Timeline line */}
            <div className="absolute left-2 md:left-3 top-0 bottom-0 w-0.5 bg-[#5a7a7f]" />

            {phases.map((phase) => (
              <div key={phase.id} className="relative mb-4 md:mb-6">
                {/* Timeline dot */}
                <div
                  className={`absolute left-[-4px] md:left-[-5px] w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-[#5a7a7f] transition-colors ${
                    activePhase === phase.id ? "bg-[#5a7a7f]" : "bg-[#3c4f5a]"
                  }`}
                />

                <div className="ml-4 md:ml-6">
                  <span className="text-[10px] md:text-xs text-white/60 font-medium tracking-wider">
                    PHASE-0{phase.id}
                  </span>

                  <button
                    type="button"
                    onClick={() => setActivePhase(phase.id)}
                    className="w-full text-left flex items-center justify-between py-2 md:py-3 border-b border-white/20"
                  >
                    <h3
                      className={`font-heading text-sm md:text-base font-semibold transition-colors ${
                        activePhase === phase.id
                          ? "text-white"
                          : "text-white/70"
                      }`}
                    >
                      {phase.title}
                    </h3>
                    <span
                      className={`w-6 h-6 md:w-8 md:h-8 rounded-full border border-white/30 flex items-center justify-center transition-transform ${
                        activePhase === phase.id ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activePhase === phase.id
                        ? "max-h-40 opacity-100 pt-3 md:pt-4"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-white/70 text-xs md:text-sm leading-relaxed">
                      {phase.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="relative hidden lg:block">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://ext.same-assets.com/3349237986/1440105504.png"
                alt="Detailed consultation"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#5a7a7f]/95 p-4 md:p-6">
                <span className="text-[10px] md:text-xs text-white/80 font-medium tracking-wider uppercase">
                  {activePhase}. {phases[activePhase - 1]?.title}
                </span>
                <p className="text-white text-xs md:text-sm mt-2 line-clamp-2">
                  {phases[activePhase - 1]?.content.slice(0, 100)}...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
