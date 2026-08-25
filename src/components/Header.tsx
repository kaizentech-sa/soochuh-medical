"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, telHref, whatsAppHref } from "@/data/site";
import { ChevronIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";

type HeaderProps = {
  mainPhoneNumber?: string;
  whatsappNumber?: string;
  appointmentLink?: string;
  healthcareFields?: string[];
  googleMapsShareLink?: string;
  /** Pages without a full-bleed hero start in the solid state. */
  solid?: boolean;
};

type NavLink = { label: string; href: string };
type NavItem = { label: string; href?: string; dropdown?: NavLink[] };

export default function Header({
  mainPhoneNumber,
  whatsappNumber,
  appointmentLink,
  healthcareFields = [],
  googleMapsShareLink,
  solid = false,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(solid);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const phone = mainPhoneNumber || siteConfig.phone;
  const whatsapp = whatsappNumber || siteConfig.whatsapp;
  const bookHref = appointmentLink || "#contact";

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const treatments: NavLink[] =
    healthcareFields.length > 0
      ? healthcareFields.map((field) => ({ label: field, href: "#services" }))
      : [
          { label: "General dentistry", href: "#services" },
          { label: "Aesthetic dentistry", href: "#services" },
          { label: "Root canal treatment", href: "#services" },
          { label: "Oral hygiene", href: "#services" },
          { label: "Teeth whitening", href: "#services" },
          { label: "General practice & family medicine", href: "#services" },
        ];

  const navItems: NavItem[] = [
    { label: "Treatments", dropdown: treatments },
    {
      label: "The practice",
      dropdown: [
        { label: "What makes us different", href: "#difference" },
        { label: "Meet the team", href: "#team" },
        { label: "Inside the practice", href: "#gallery" },
      ],
    },
    { label: "Reviews", href: "#testimonials" },
    {
      label: "Patients",
      dropdown: [
        { label: "Your first visit", href: "#difference" },
        { label: "Pricing & payment options", href: "/pricing-and-payment-options" },
      ],
    },
    { label: "Contact", href: "#contact" },
  ];

  const onLight = scrolled || mobileMenuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility strip — address and phone, always available */}
      <div
        className={`hidden border-b transition-colors duration-500 lg:block ${
          onLight
            ? "border-transparent bg-teal-900 text-white/80"
            : "border-white/15 bg-teal-950/25 text-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="shell flex items-center justify-between py-2 font-sans text-[11px] uppercase tracking-eyebrow">
          <a
            href={googleMapsShareLink || "#contact"}
            target={googleMapsShareLink ? "_blank" : undefined}
            rel="noreferrer"
            className="link-underline flex items-center gap-2 hover:text-white"
          >
            <PinIcon className="h-3.5 w-3.5" />
            {siteConfig.addressText}
          </a>
          <div className="flex items-center gap-6">
            <span className="hidden xl:inline">{siteConfig.positioning}</span>
            <Link href={telHref(phone)} className="link-underline flex items-center gap-2 hover:text-white">
              <PhoneIcon className="h-3.5 w-3.5" />
              {phone}
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`transition-all duration-500 ${
          onLight ? "bg-bone/95 shadow-[0_1px_0_0_var(--line)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="shell flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3" aria-label="Soochuh Medical — home">
            <span
              className={`relative block h-11 w-11 shrink-0 transition-opacity duration-500 ${
                onLight ? "" : "brightness-0 invert"
              }`}
            >
              <Image
                src="/Untitled design.svg"
                alt=""
                fill
                className="object-contain"
                priority
              />
            </span>
            <span className="leading-none">
              <span
                className={`block font-display text-xl tracking-tight transition-colors duration-500 ${
                  onLight ? "text-ink" : "text-white"
                }`}
              >
                Soochuh
              </span>
              <span
                className={`mt-0.5 block font-sans text-[9px] uppercase tracking-eyebrow transition-colors duration-500 ${
                  onLight ? "text-teal-700" : "text-white/70"
                }`}
              >
                Medical
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href || "#"}
                  className={`flex items-center gap-1.5 py-3 font-sans text-[12px] uppercase tracking-eyebrow transition-colors duration-300 ${
                    onLight ? "text-ink-soft hover:text-teal-500" : "text-white/85 hover:text-white"
                  }`}
                >
                  {item.label}
                  {item.dropdown && <ChevronIcon className="h-2.5 w-2.5" />}
                </Link>
                {item.dropdown && activeDropdown === item.label && (
                  <div className="absolute left-1/2 top-full min-w-[268px] -translate-x-1/2 border border-[color:var(--line)] bg-bone p-2 shadow-[0_24px_60px_-40px_rgba(11,58,56,0.55)]">
                    {item.dropdown.map((sub) => {
                      const external = sub.href.startsWith("http");
                      const cls =
                        "block px-4 py-2.5 font-sans text-[13px] text-ink-soft transition-colors duration-300 hover:bg-teal-50 hover:text-teal-700";
                      return external ? (
                        <a key={sub.label} href={sub.href} target="_blank" rel="noreferrer" className={cls}>
                          {sub.label}
                        </a>
                      ) : (
                        <Link key={sub.label} href={sub.href} className={cls}>
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href={whatsAppHref(whatsapp)}
              target="_blank"
              aria-label="Message Soochuh Medical on WhatsApp"
              className={`grid h-10 w-10 place-items-center rounded-full border transition-colors duration-500 ${
                onLight
                  ? "border-teal-900/20 text-teal-700 hover:border-teal-500 hover:bg-teal-500 hover:text-white"
                  : "border-white/35 text-white hover:bg-white hover:text-teal-900"
              }`}
            >
              <WhatsAppIcon className="h-4 w-4" />
            </Link>
            <Link
              href={bookHref}
              className={`btn px-6 py-3.5 ${
                onLight
                  ? "bg-teal-900 text-white hover:bg-teal-500"
                  : "bg-white text-teal-900 hover:bg-teal-500 hover:text-white"
              }`}
            >
              Book a visit
            </Link>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className={`-mr-2 p-2 lg:hidden ${onLight ? "text-ink" : "text-white"}`}
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="h-[calc(100dvh-72px)] overflow-y-auto bg-bone lg:hidden">
          <div className="shell space-y-8 py-8">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  <>
                    <p className="eyebrow mb-3">{item.label}</p>
                    <ul className="space-y-3 border-l border-[color:var(--line)] pl-4">
                      {item.dropdown.map((sub) => (
                        <li key={sub.label}>
                          <Link
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="font-display text-lg text-ink"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={item.href || "#"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-display text-2xl text-ink"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="space-y-3 border-t border-[color:var(--line)] pt-8">
              <Link href={bookHref} onClick={() => setMobileMenuOpen(false)} className="btn-primary w-full">
                Book a visit
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Link href={telHref(phone)} className="btn-outline w-full">
                  <PhoneIcon className="h-4 w-4" /> Call
                </Link>
                <Link href={whatsAppHref(whatsapp)} target="_blank" className="btn-outline w-full">
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </Link>
              </div>
              <p className="pt-4 font-sans text-sm text-ink-muted">{siteConfig.addressText}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
