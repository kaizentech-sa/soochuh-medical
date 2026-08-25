"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, telHref, whatsAppHref } from "@/data/site";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "./icons";

type HeroSlide = { src: string; alt: string; caption?: string };

type HeroProps = {
  slides?: HeroSlide[];
  mainPhoneNumber?: string;
  whatsappNumber?: string;
  appointmentLink?: string;
};

const fallbackSlide: HeroSlide = {
  src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2200&q=80",
  alt: "Treatment room at Soochuh Medical",
};

const trustMarks = [
  "Women-led practice",
  "Medical & dental, one address",
  "Diep River, Cape Town",
];

export default function Hero({
  slides = [],
  mainPhoneNumber,
  whatsappNumber,
  appointmentLink,
}: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const phone = mainPhoneNumber || siteConfig.phone;
  const whatsapp = whatsappNumber || siteConfig.whatsapp;

  const slideshow = useMemo(
    () => (slides.length > 0 ? slides : [fallbackSlide]),
    [slides],
  );

  useEffect(() => {
    if (slideshow.length <= 1) return;
    const timer = window.setInterval(
      () => setActiveSlide((i) => (i + 1) % slideshow.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, [slideshow.length]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-teal-950">
      {/* Cross-fading background */}
      <div className="absolute inset-0">
        {slideshow.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-[1600ms] ease-soft"
            style={{ opacity: i === activeSlide ? 1 : 0 }}
            aria-hidden={i !== activeSlide}
          >
            <Image
              src={slide.src}
              alt={i === 0 ? slide.alt : ""}
              fill
              sizes="100vw"
              className="scale-105 object-cover object-center"
              priority={i === 0}
            />
          </div>
        ))}
        {/*
          Three stacked scrims. The flat base is what makes the hero robust to
          whatever image the CMS serves — bright illustrations included — while
          the directional gradients keep depth on the right-hand side.
        */}
        <div className="absolute inset-0 bg-teal-950/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/95 via-teal-950/75 to-teal-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950/85 via-teal-950/15 to-teal-950/60" />
      </div>

      <div className="shell relative flex min-h-[100svh] flex-col justify-end pb-14 pt-40 md:justify-center md:pb-24 md:pt-44">
        <div className="max-w-2xl">
          <p className="animate-fade font-sans text-[11px] uppercase tracking-eyebrow text-teal-200 opacity-0 [animation-delay:200ms]">
            Diep River · Cape Town
          </p>

          <h1 className="animate-rise display-xl mt-6 font-display text-white opacity-0 [animation-delay:320ms]">
            Care that takes
            <span className="block italic text-teal-100">its time</span>
          </h1>

          <p className="animate-rise lede mt-7 max-w-xl !text-white/95 opacity-0 [animation-delay:460ms]">
            Soochuh Medical is a women-led practice on Main Road, where a doctor and
            a dentist work under one roof. Unhurried appointments, plain language,
            and treatment planned around your life — not the other way round.
          </p>

          <div className="animate-rise mt-10 flex flex-wrap items-center gap-3 opacity-0 [animation-delay:600ms]">
            <Link href={appointmentLink || "#contact"} className="btn bg-white px-8 py-4 text-teal-900 hover:bg-teal-500 hover:text-white">
              Book a visit <ArrowIcon className="h-4 w-4" />
            </Link>
            <Link
              href={whatsAppHref(whatsapp)}
              target="_blank"
              className="btn border border-white/35 px-8 py-4 text-white hover:bg-white/10"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
            </Link>
            <Link href={telHref(phone)} className="btn ml-1 gap-2 px-2 py-3 text-white/75 hover:text-white">
              <PhoneIcon className="h-4 w-4" /> {phone}
            </Link>
          </div>

          <ul className="animate-fade mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6 opacity-0 [animation-delay:760ms]">
            {trustMarks.map((mark) => (
              <li
                key={mark}
                className="font-sans text-[11px] uppercase tracking-eyebrow text-white/75"
              >
                {mark}
              </li>
            ))}
          </ul>
        </div>

        {/* Slide indicators */}
        {slideshow.length > 1 && (
          <div className="absolute bottom-10 right-6 hidden items-center gap-3 md:right-10 md:flex">
            {slideshow.map((slide, i) => (
              <button
                key={`dot-${slide.src}`}
                type="button"
                aria-label={`Show image ${i + 1}`}
                onClick={() => setActiveSlide(i)}
                className={`h-px transition-all duration-700 ease-soft ${
                  i === activeSlide ? "w-14 bg-white" : "w-7 bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
