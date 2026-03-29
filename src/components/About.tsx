"use client";

import Link from "next/link";

export default function About() {
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
          Located in the heart of Cape Town, our practice is a sanctuary of dental
          excellence, offering a unique blend of advanced technology, expert care,
          and a patient-centered approach. Led by the renowned Dr. Corné Smith
          and Dr. Jean van Lierop, our team is dedicated to providing personalised
          treatments that not only enhance your smile but also promote your overall
          well-being. Whether you&apos;re seeking a stunning smile makeover, expert
          endodontic care, or general dental services, we invite you to experience
          dentistry at its best.
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
