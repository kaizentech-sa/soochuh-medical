"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig, telHref, whatsAppHref } from "@/data/site";
import { PhoneIcon, WhatsAppIcon } from "./icons";

type ContactBarProps = {
  mainPhoneNumber?: string;
  whatsappNumber?: string;
  appointmentLink?: string;
};

/**
 * Mobile-first action dock. The previous full-width bar covered the page
 * footer on every screen size; this sits out of the way on desktop and
 * gives thumbs a target on phones.
 */
export default function ContactBar({
  mainPhoneNumber,
  whatsappNumber,
  appointmentLink,
}: ContactBarProps) {
  const [visible, setVisible] = useState(false);
  const phone = mainPhoneNumber || siteConfig.phone;
  const whatsapp = whatsappNumber || siteConfig.whatsapp;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Phones: sticky action bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-teal-950/95 backdrop-blur-md transition-transform duration-500 ease-soft md:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Link href={telHref(phone)} className="flex flex-col items-center gap-1 py-3 text-white/85 active:bg-white/10">
          <PhoneIcon className="h-4 w-4" />
          <span className="font-sans text-[10px] uppercase tracking-eyebrow">Call</span>
        </Link>
        <Link href={whatsAppHref(whatsapp)} target="_blank" className="flex flex-col items-center gap-1 border-x border-white/10 py-3 text-white/85 active:bg-white/10">
          <WhatsAppIcon className="h-4 w-4" />
          <span className="font-sans text-[10px] uppercase tracking-eyebrow">WhatsApp</span>
        </Link>
        <Link href={appointmentLink || "#contact"} className="flex flex-col items-center gap-1 bg-teal-500 py-3 text-white active:bg-teal-600">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-sans text-[10px] uppercase tracking-eyebrow">Book</span>
        </Link>
      </div>

      {/* Desktop: single unobtrusive WhatsApp affordance */}
      <Link
        href={whatsAppHref(whatsapp)}
        target="_blank"
        aria-label="Message Soochuh Medical on WhatsApp"
        className={`fixed bottom-8 right-8 z-40 hidden h-14 w-14 place-items-center rounded-full bg-teal-900 text-white shadow-[0_18px_40px_-18px_rgba(8,32,31,0.8)] transition-all duration-500 ease-soft hover:bg-teal-500 md:grid ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <WhatsAppIcon className="h-6 w-6" />
      </Link>
    </>
  );
}
