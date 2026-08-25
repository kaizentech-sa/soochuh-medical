"use client";

import Image from "next/image";
import Link from "next/link";

type DifferenceProps = {
  whatMakesUsDifferentDescription?: string;
  whatMakesUsDifferentButtonLink?: string;
  whatMakesUsDifferentImageSrc?: string;
  whatMakesUsDifferentImageAlt?: string;
  nextVisitDescription?: string;
  nextVisitButtonLink?: string;
  nextVisitImageSrc?: string;
  nextVisitImageAlt?: string;
};

const DEFAULT_WHAT_MAKES_US_DIFFERENT =
  "Most practices are built around throughput. This one is built around the conversation. Our clinicians share notes, share a building, and share the view that you should leave understanding exactly what was done and why.";

const DEFAULT_NEXT_VISIT =
  "We start by listening. Then we examine, explain what we have found in language you can repeat to someone else, and set out your options with the costs attached. Nothing goes ahead until you say so.";

const FALLBACK_WHAT_IMAGE =
  "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=80";
const FALLBACK_NEXT_IMAGE =
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=80";

const visitSteps = [
  { n: "01", t: "We listen", d: "You talk, we take notes. No clock on the wall." },
  { n: "02", t: "We examine", d: "A full look, with anything we find shown to you on screen." },
  { n: "03", t: "We explain", d: "Options and costs, written down before you commit." },
];

export default function Difference({
  whatMakesUsDifferentDescription,
  whatMakesUsDifferentButtonLink,
  whatMakesUsDifferentImageSrc,
  whatMakesUsDifferentImageAlt,
  nextVisitDescription,
  nextVisitButtonLink,
  nextVisitImageSrc,
  nextVisitImageAlt,
}: DifferenceProps) {
  const whatImageSrc = whatMakesUsDifferentImageSrc || FALLBACK_WHAT_IMAGE;
  const whatImageAlt = whatMakesUsDifferentImageAlt?.trim() || "Inside Soochuh Medical";
  const nextImageSrc = nextVisitImageSrc || FALLBACK_NEXT_IMAGE;
  const nextImageAlt = nextVisitImageAlt?.trim() || "A consultation at Soochuh Medical";

  return (
    <section id="difference" className="section bg-white">
      <div className="shell space-y-28 md:space-y-40">
        {/* What makes us different */}
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="slide-in-left order-2 lg:order-1">
            <p className="eyebrow">04 — The difference</p>
            <h2 className="display-md mt-5 max-w-md font-display">
              Built around the
              <span className="italic text-teal-500"> conversation</span>
            </h2>
            <p className="lede mt-7 max-w-prose">
              {whatMakesUsDifferentDescription || DEFAULT_WHAT_MAKES_US_DIFFERENT}
            </p>
            <Link
              href={whatMakesUsDifferentButtonLink || "#team"}
              className="btn-outline mt-9"
            >
              Meet the clinicians
            </Link>
          </div>

          <div className="slide-in-right order-1 lg:order-2">
            <div className="img-zoom arch relative mx-auto aspect-[4/5] w-full max-w-lg bg-bone-deep">
              <Image src={whatImageSrc} alt={whatImageAlt} fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
            </div>
          </div>
        </div>

        {/* What to expect */}
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="slide-in-left">
            <div className="img-zoom relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-[10px_200px_10px_200px] bg-bone-deep">
              <Image src={nextImageSrc} alt={nextImageAlt} fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
            </div>
          </div>

          <div className="slide-in-right">
            <p className="eyebrow">05 — Your first visit</p>
            <h2 className="display-md mt-5 max-w-md font-display">
              What to expect
            </h2>
            <p className="lede mt-7 max-w-prose">
              {nextVisitDescription || DEFAULT_NEXT_VISIT}
            </p>

            <ol className="mt-10 space-y-px bg-[color:var(--line)]">
              {visitSteps.map((s) => (
                <li key={s.n} className="flex gap-6 bg-white py-5">
                  <span className="font-sans text-[11px] tabular-nums tracking-eyebrow text-teal-300">{s.n}</span>
                  <span>
                    <span className="block font-display text-xl text-ink">{s.t}</span>
                    <span className="mt-1 block font-sans text-[14px] font-light text-ink-muted">{s.d}</span>
                  </span>
                </li>
              ))}
            </ol>

            <Link href={nextVisitButtonLink || "#contact"} className="btn-primary mt-10">
              Book your first visit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
