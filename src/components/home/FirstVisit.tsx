"use client";

import { useLayoutEffect, useRef } from "react";
import { getGsap } from "../motion/gsap";

const steps = [
  { title: "Say hello", text: "WhatsApp or call. Tell us what you need, and whether you're nervous. We find a time that suits you." },
  { title: "Talk first", text: "Your visit starts with a conversation. We listen to your worries before anything else happens." },
  { title: "Get a clear plan", text: "We explain what we found in plain language and give you a written plan with prices." },
  { title: "Go at your pace", text: "Treatment starts only when you're ready. Raise your hand and we pause, every time." },
];

/**
 * The page's one deliberate colour block (the reference site's bold band).
 * A gold line draws down the steps as you read them, so the sequence is felt.
 */
export default function FirstVisit() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        "[data-line]",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-steps]", start: "top 70%", end: "bottom 60%", scrub: true } },
      );
      for (const step of gsap.utils.toArray<HTMLElement>("[data-step]")) {
        gsap.fromTo(
          step,
          { opacity: 0.3 },
          { opacity: 1, ease: "none", scrollTrigger: { trigger: step, start: "top 75%", end: "top 55%", scrub: true } },
        );
      }
    }, ref);
    return () => mm.revert();
  }, []);

  return (
    <section ref={ref} id="first-visit" className="bg-forest-900 py-24 text-white md:py-36">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[120px]">
            <p className="label !text-gold-300">Your first visit</p>
            <h2 className="t-h2 mt-4 max-w-[13ch] !text-white">
              Four calm steps. <span className="font-medium italic text-gold-300">You lead each one.</span>
            </h2>
          </div>
        </div>

        <ol data-steps className="relative lg:col-span-7">
          <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-white/15" />
          <span aria-hidden="true" data-line className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-gold-500" />
          {steps.map((s) => (
            <li key={s.title} data-step className="relative pb-16 pl-12 last:pb-0">
              <span aria-hidden="true" className="absolute left-0 top-[12px] h-[15px] w-[15px] rounded-full border-2 border-gold-500 bg-forest-900" />
              <h3 className="text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold leading-tight tracking-[-0.025em] !text-white">
                {s.title}
              </h3>
              <p className="mt-3 max-w-[46ch] text-[18px] leading-relaxed text-white/75">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
