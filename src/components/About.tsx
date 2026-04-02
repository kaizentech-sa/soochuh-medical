"use client";

import Link from "next/link";

const DEFAULT_WHO_WE_ARE_DESCRIPTION =
  "Soochuh Medical is a modern healthcare practice at Newlands on Main in Cape Town. We bring together experienced clinicians and a patient-first approach so you receive thoughtful, coordinated care. Whether you need a routine consultation, ongoing support, or guidance on your next steps, we focus on clear communication, evidence-based practice, and making sure you feel comfortable throughout your visit.";

type AboutProps = {
  description?: string;
};

export default function About({ description }: AboutProps) {
  const body =
    description?.trim() || DEFAULT_WHO_WE_ARE_DESCRIPTION;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-[#5a7a7f] font-semibold mb-4 fade-in-up">
          Who we are
        </h2>
        <div className="heading-decorator justify-center mb-10 fade-in-up delay-100">
          <span className="bar-main" />
          <span className="bar-secondary" />
        </div>

        <p className="text-gray-600 text-lg leading-relaxed mb-8 fade-in-up delay-200">
          {body}
        </p>

        <div className="fade-in-up delay-300">
          <Link
            href="#team"
            className="inline-block bg-[#5a7a7f] text-white px-10 py-3 rounded-sm font-medium hover:bg-[#3c4f5a] transition-colors tracking-wide"
          >
            Read More
          </Link>
        </div>
      </div>
    </section>
  );
}
