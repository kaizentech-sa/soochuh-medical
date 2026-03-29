"use client";

import { useEffect } from "react";

export default function ScrollAnimator() {
  useEffect(() => {
    const observe = () => {
      const elements = document.querySelectorAll(
        ".fade-in-up, .fade-in, .slide-in-left, .slide-in-right"
      );
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              io.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );
      for (const el of elements) io.observe(el);
      return io;
    };

    // Small delay so elements are painted before observing
    const timer = setTimeout(() => {
      const io = observe();
      return () => io.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
