"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { EASE, getGsap, prefersReducedMotion } from "./gsap";

/**
 * Site-wide scroll reveals. Anything marked [data-reveal] eases up into place
 * once as it enters, in reading order (hierarchy, not decoration).
 * Content is only hidden after this runs, so no-JS and reduced-motion users
 * always see the full page.
 */
export default function MotionRoot() {
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-scan per route
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = getGsap();
    const root = document.documentElement;
    root.classList.add("gsap-ready");

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(items, { y: 28, opacity: 0 });
      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, opacity: 1, duration: 1, ease: EASE, stagger: 0.08, overwrite: true }),
      });
    });

    // Pinned sections add scroll length after the browser has already jumped
    // to any #hash, so re-measure and re-align to the anchor once they exist.
    const realign = () => {
      ScrollTrigger.refresh();
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      target?.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
    };
    const frame = requestAnimationFrame(() => requestAnimationFrame(realign));
    // Images and fonts change layout after first paint.
    window.addEventListener("load", realign);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", realign);
      ctx.revert();
      root.classList.remove("gsap-ready");
    };
  }, [pathname]);

  return null;
}
