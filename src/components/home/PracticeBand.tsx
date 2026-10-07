"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { getGsap, prefersReducedMotion } from "../motion/gsap";

const practiceImage =
  "https://images.unsplash.com/photo-1721045028160-3637f5063047?auto=format&fit=crop&w=2400&h=1300&q=80";

/**
 * A full-width look inside the practice (the reference site opens its
 * reception the same way). The frame widens and the photo settles as it
 * scrolls in: an invitation in, not a gimmick.
 */
export default function PracticeBand() {
  const wrap = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !wrap.current) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "top 25%", scrub: true },
      });
      tl.fromTo("[data-band-frame]", { clipPath: "inset(0% 7% 0% 7% round 20px)" }, { clipPath: "inset(0% 0% 0% 0% round 20px)", ease: "none" })
        .fromTo("[data-band-img]", { scale: 1.18 }, { scale: 1, ease: "none" }, 0);
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className="shell">
      <div data-band-frame className="relative aspect-[4/3] overflow-hidden rounded-surface bg-forest-100 sm:aspect-[16/9] lg:aspect-[21/9]">
        <div data-band-img className="absolute inset-0">
          <Image
            src={practiceImage}
            alt="The calm, light reception area at the practice"
            fill
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
