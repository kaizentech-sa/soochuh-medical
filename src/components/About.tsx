"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";

const DEFAULT_WHO_WE_ARE_DESCRIPTION =
  "Soochuh Medical grew out of a simple frustration: healthcare that treats people as appointments. We are a women-led practice on Main Road in Diep River, where a general practitioner and a dentist work alongside each other. That means your medical and dental care sit in one place, with one team, and nobody has to repeat their story twice.";

const SECOND_PARAGRAPH =
  "We keep appointment lists short on purpose. You will be told what is happening, what it will cost, and what your options are — before anything begins.";

type AboutProps = { description?: string };

const pillars = [
  { k: "Led by women", v: "A practice built by clinicians who know what it is to be talked over in a consulting room." },
  { k: "Unhurried", v: "Longer appointment slots, so questions get answered properly." },
  { k: "Plain language", v: "No jargon, no surprises on the invoice." },
];

export default function About({ description }: AboutProps) {
  const body = description?.trim() || DEFAULT_WHO_WE_ARE_DESCRIPTION;

  return (
    <section id="about" className="section bg-white">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="slide-in-left arch relative aspect-[3/4] w-full max-w-md bg-bone-deep">
            <Image
              src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=1200&q=80"
              alt="A clinician in conversation with a patient"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <p className="fade-in-up delay-200 mt-6 max-w-md font-display text-lg italic text-teal-700">
            “{siteConfig.tagline}”
          </p>
        </div>

        <div className="lg:col-span-7">
          <p className="eyebrow fade-in-up">02 — Who we are</p>
          <h2 className="display-lg fade-in-up delay-100 mt-5 max-w-xl font-display">
            A practice that
            <span className="italic text-teal-500"> listens first</span>
          </h2>

          <p className="lede fade-in-up delay-200 mt-8 max-w-prose">{body}</p>
          <p className="fade-in-up delay-300 mt-5 max-w-prose font-sans font-light text-ink-muted">
            {SECOND_PARAGRAPH}
          </p>

          <dl className="fade-in-up delay-400 mt-12 grid gap-px border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.k} className="bg-white p-6">
                <dt className="font-sans text-[11px] uppercase tracking-eyebrow text-teal-700">{p.k}</dt>
                <dd className="mt-3 font-sans text-[14px] font-light leading-relaxed text-ink-muted">{p.v}</dd>
              </div>
            ))}
          </dl>

          <div className="fade-in-up delay-500 mt-10">
            <Link href="#team" className="btn-ghost link-underline">
              Meet the team →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
