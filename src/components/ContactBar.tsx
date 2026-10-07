"use client";

import { useEffect, useRef, useState } from "react";
import { defaultWhatsAppMessage, siteConfig, telHref, whatsAppHref } from "@/data/site";
import { Phone, WhatsappLogo } from "./icons";

/**
 * Phones: a two-button booking dock once the hero has scrolled away.
 * Desktop: one floating WhatsApp button. Visibility is driven by an
 * IntersectionObserver on a marker 600px down the page, not a scroll listener.
 */
export default function ContactBar() {
  const [visible, setVisible] = useState(false);
  const marker = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marker.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const wa = whatsAppHref(siteConfig.whatsapp, defaultWhatsAppMessage);

  return (
    <>
      <div ref={marker} aria-hidden="true" className="pointer-events-none absolute left-0 top-[600px] h-px w-px" />
      <div
        className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-paper/95 p-2.5 backdrop-blur-xl transition-transform duration-500 ease-soft md:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
      >
        <a href={telHref(siteConfig.phone)} className="btn-secondary min-h-[50px] px-3">
          <Phone size={19} /> Call
        </a>
        <a href={wa} target="_blank" rel="noreferrer" className="btn-primary min-h-[50px] px-3">
          <WhatsappLogo size={20} weight="fill" /> WhatsApp us
        </a>
      </div>

      <a
        href={wa}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp us"
        className={`fixed bottom-6 right-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-forest-800 text-white shadow-[0_18px_40px_-16px_rgba(13,39,30,0.7)] transition-[opacity,transform,background-color] duration-500 ease-soft hover:bg-forest-700 md:grid ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <WhatsappLogo size={28} weight="fill" />
      </a>
    </>
  );
}
