"use client";

import { useEffect, useState } from "react";

type PatientStory = { text: string; author: string };
type TestimonialsProps = { stories?: PatientStory[] };

/**
 * No hard-coded fallback quotes: the previous ones belonged to a different
 * practice. Populate Patient Stories in the Studio, or switch the source mode
 * to Google so real reviews load — until then the section stays out of the page.
 */
export default function Testimonials({ stories = [] }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const count = stories.length;

  useEffect(() => setIndex(0), [count]);

  useEffect(() => {
    if (count <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 8000);
    return () => clearInterval(t);
  }, [count]);

  if (count === 0) return null;

  const current = stories[index];

  return (
    <section id="testimonials" className="section bg-bone-deep">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow fade-in-up">In their words</p>

          <blockquote className="fade-in-up delay-100 mt-10">
            <p
              key={current.text}
              className="animate-fade font-display text-[1.6rem] leading-snug text-ink opacity-0 md:text-[2.1rem]"
            >
              <span className="text-teal-300">“</span>
              {current.text}
              <span className="text-teal-300">”</span>
            </p>
            <footer className="mt-8 font-sans text-[11px] uppercase tracking-eyebrow text-teal-700">
              {current.author}
            </footer>
          </blockquote>

          {count > 1 && (
            <div className="mt-12 flex items-center justify-center gap-8">
              <button
                type="button"
                aria-label="Previous review"
                onClick={() => setIndex((i) => (i - 1 + count) % count)}
                className="grid h-11 w-11 place-items-center rounded-full border border-teal-900/20 text-teal-700 transition-colors duration-500 hover:border-teal-500 hover:bg-teal-500 hover:text-white"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                {stories.map((story, i) => (
                  <button
                    key={`dot-${story.author}-${i}`}
                    type="button"
                    aria-label={`Review ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-px transition-all duration-700 ease-soft ${
                      i === index ? "w-10 bg-teal-500" : "w-5 bg-teal-900/25 hover:bg-teal-900/50"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next review"
                onClick={() => setIndex((i) => (i + 1) % count)}
                className="grid h-11 w-11 place-items-center rounded-full border border-teal-900/20 text-teal-700 transition-colors duration-500 hover:border-teal-500 hover:bg-teal-500 hover:text-white"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
