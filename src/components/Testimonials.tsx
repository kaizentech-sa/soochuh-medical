"use client";

import { useState, useEffect } from "react";

type PatientStory = {
  text: string;
  author: string;
};

type TestimonialsProps = {
  stories?: PatientStory[];
};

const fallbackTestimonials: PatientStory[] = [
  {
    text: "Dr Smith and her team are excellent at putting one at ease. The initial consultation was great, with Dr Smith taking me through the work to be done and setting out treatment options clearly. They are meticulous and the quality of work done is absolutely amazing, with no pain and minimal discomfort while working on my teeth.",
    author: "Inge Gargan",
  },
  {
    text: "Jean Van Lierop is a miracle worker. Want a magic smile - he's your guy. Personable, clinical and efficient. Great sense of humour too. Would highly recommend this dentistry & team - world class!",
    author: "Chloe Foden",
  },
  {
    text: "Dr Smith has been our family dentist for the past 8 years... dealing with everything from routine dental checks to advanced restorative work. She and her team are always great. They are friendly, professional, and they offer the best and most up to date dental treatment available.",
    author: "Vanessa Persson",
  },
  {
    text: "I am absolutely thrilled with my outcome. Everyone was so professional, explained everything to me and the result is brilliant... There is a strict protocol for COVID-19 and I felt protected throughout the process.",
    author: "Janice Ludlam",
  },
  {
    text: "Dr Jean van Lierop did a cosmetic makeover of my front teeth using bonding. He was brilliant and my results were absolutely fantastic. I couldn't be happier. Would highly recommend him for any general/cosmetic dentistry.",
    author: "Toni Meyer",
  },
];

export default function Testimonials({ stories = [] }: TestimonialsProps) {
  const testimonials = stories.length > 0 ? stories : fallbackTestimonials;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= 1) {
      return undefined;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-[#5a7a7f]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center">
          <h3 className="text-[#b8d4d8] text-sm font-medium tracking-wider uppercase mb-8">
            Our Patient Stories
          </h3>

          <div className="relative">
            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Testimonial Content */}
            <div className="min-h-[200px] flex flex-col items-center justify-center">
              <p className="text-white text-lg md:text-xl leading-relaxed mb-8 transition-opacity duration-500">
                {testimonials[currentIndex].text}
              </p>
              <p className="text-white/80 font-medium">
                - {testimonials[currentIndex].author}
              </p>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  type="button"
                  key={`testimonial-dot-${index}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
