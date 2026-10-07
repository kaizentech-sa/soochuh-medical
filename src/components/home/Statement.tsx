"use client";

import { useLayoutEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "../motion/gsap";

/**
 * The practice's own promise, set large. Words fill in as you read down,
 * pacing the one sentence the client most wants patients to take away.
 */
export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (prefersReducedMotion() || !el) return;
    const { gsap, SplitText } = getGsap();
    const ctx = gsap.context(() => {
      const split = SplitText.create(el, { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 42%", scrub: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 md:py-36">
      <div className="shell">
        <p
          ref={ref}
          className="max-w-[22ch] text-[clamp(2rem,4.6vw,4rem)] font-semibold leading-[1.08] tracking-[-0.032em] text-ink"
        >
          We believe you should feel informed, comfortable and{" "}
          <span className="em">confident</span> every step of the way.
        </p>
      </div>
    </section>
  );
}
