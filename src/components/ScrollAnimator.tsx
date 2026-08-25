"use client";

import { useEffect } from "react";

const SELECTOR = ".fade-in-up, .fade-in, .slide-in-left, .slide-in-right";
/** Nothing stays hidden longer than this, whatever the observer does. */
const SAFETY_MS = 2500;

export default function ScrollAnimator() {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Reduced motion or no IntersectionObserver: leave everything visible.
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      return;
    }

    // Opting in here is what allows the CSS to hide anything at all, so a
    // script that never runs can't leave the page blank.
    root.classList.add("reveal-ready");

    const reveal = (el: Element) => el.classList.add("visible");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    const elements = Array.from(document.querySelectorAll(SELECTOR));
    for (const el of elements) {
      observer.observe(el);
    }

    // If the observer never fires (throttled tab, offscreen render, an
    // element scrolled past before observation), reveal whatever should
    // already be on screen. Content further down still animates normally.
    const safety = window.setTimeout(() => {
      for (const el of elements) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          reveal(el);
          observer.unobserve(el);
        }
      }
    }, SAFETY_MS);

    // Background tabs throttle timers and stop firing intersections, so
    // sweep again the moment the page is looked at.
    const sweep = () => {
      if (document.visibilityState !== "visible") return;
      for (const el of elements) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          reveal(el);
          observer.unobserve(el);
        }
      }
    };
    document.addEventListener("visibilitychange", sweep);

    return () => {
      window.clearTimeout(safety);
      document.removeEventListener("visibilitychange", sweep);
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
