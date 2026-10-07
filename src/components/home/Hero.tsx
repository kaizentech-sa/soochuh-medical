"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Pause, Play } from "../icons";
import BookingButtons from "../ui/BookingButtons";
import { EASE, getGsap, prefersReducedMotion } from "../motion/gsap";

/*
  Placeholder footage: Pexels video 5892123 (free licence), mirrored and
  re-encoded to 1.9 MB / 0.8 MB. Swap for the practice's own film when shot.
*/
const VIDEO_LARGE = "/media/hero-1920.mp4";
const VIDEO_SMALL = "/media/hero-1280.mp4";
const POSTER = "/media/hero-poster.jpg";

/**
 * Full-bleed film hero, after the reference site's opening reel: the
 * practice in motion behind one bold line. Copy sits at the bottom over a
 * forest-green fade so the faces in the frame stay clear.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  // Respect reduced motion and data-saver: keep the still poster instead.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (prefersReducedMotion() || saveData) {
      v.removeAttribute("autoplay");
      v.pause();
    } else {
      v.play().catch(() => {});
    }
    const sync = () => setPlaying(!v.paused);
    v.addEventListener("play", sync);
    v.addEventListener("pause", sync);
    sync();
    return () => {
      v.removeEventListener("play", sync);
      v.removeEventListener("pause", sync);
    };
  }, []);

  useLayoutEffect(() => {
    const el = root.current;
    const h1 = el?.querySelector("h1");
    if (prefersReducedMotion() || !el || !h1) return;
    const { gsap, SplitText } = getGsap();
    const ctx = gsap.context(() => {
      gsap.set("[data-hero]", { opacity: 1 });
      const split = SplitText.create(h1, { type: "lines", mask: "lines" });
      gsap
        .timeline({ defaults: { ease: EASE } })
        .fromTo("[data-hero-media]", { scale: 1.12 }, { scale: 1, duration: 2.4 }, 0)
        .from(split.lines, { yPercent: 110, duration: 1.3, stagger: 0.1 }, 0.25)
        .from("[data-hero-copy]", { y: 20, opacity: 0, duration: 1.1, stagger: 0.1 }, 0.75);

      // On the way out the film drifts and the copy lifts away: a hand-off
      // to the page, not a hard cut.
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } })
        .to("[data-hero-media]", { yPercent: 12, ease: "none" }, 0)
        .to("[data-hero-content]", { yPercent: -18, opacity: 0, ease: "none" }, 0);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative -mt-[72px] flex min-h-[100svh] flex-col justify-end overflow-hidden bg-forest-950"
    >
      <div data-hero data-hero-media aria-hidden="true" className="absolute inset-0">
        <video
          ref={video}
          className="h-full w-full object-cover object-[56%_35%]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
          tabIndex={-1}
        >
          <source src={VIDEO_SMALL} type="video/mp4" media="(max-width: 899px)" />
          <source src={VIDEO_LARGE} type="video/mp4" />
        </video>
      </div>

      {/* Tint + fades: brand-tinted, top for the nav, bottom for the copy. */}
      <div aria-hidden="true" className="absolute inset-0 bg-forest-950/25" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[34%] bg-gradient-to-b from-forest-950/60 to-transparent" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-forest-950/95 via-forest-950/60 to-transparent sm:h-[64%]"
      />

      <div data-hero-content className="shell relative pb-8 pt-28 sm:pb-14 sm:pt-40 lg:pb-16">
        <h1
          data-hero
          className="text-[clamp(2.2rem,10.5vw,2.9rem)] font-semibold leading-[1.02] tracking-[-0.04em] !text-white [text-wrap:wrap] sm:text-[clamp(3.4rem,7vw,7.25rem)]"
        >
          A doctor and dentist,
          <br />
          <span className="font-medium italic text-gold-300">under one roof.</span>
        </h1>
        <div className="mt-6 flex flex-col gap-6 border-t border-white/20 pt-6 sm:mt-8 sm:gap-7 sm:pt-7 lg:flex-row lg:items-end lg:justify-between">
          <p data-hero data-hero-copy className="max-w-[42ch] text-[16px] leading-relaxed text-white/85 sm:text-[19px]">
            A warm, welcoming practice where you&apos;re listened to, taken seriously and cared for in a way
            that suits you.
          </p>
          <div data-hero data-hero-copy className="shrink-0">
            <BookingButtons tone="dark" />
          </div>
        </div>
      </div>

      {/* WCAG 2.2.2: moving media longer than 5s needs a pause control. */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background video" : "Play background video"}
        className="absolute right-5 top-[88px] z-[1] grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-forest-950/30 text-white backdrop-blur-md transition-colors hover:bg-forest-950/60 sm:right-8 lg:bottom-8 lg:top-auto"
      >
        {playing ? <Pause size={16} weight="fill" /> : <Play size={16} weight="fill" />}
      </button>

      {/* Marks the hero's end for the header's transparent state. */}
      <div id="hero-sentinel" aria-hidden="true" className="absolute bottom-[72px] left-0 h-px w-px" />
    </section>
  );
}
