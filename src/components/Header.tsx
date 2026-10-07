"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultWhatsAppMessage, siteConfig, telHref, whatsAppHref } from "@/data/site";
import { dentalTreatments, medicalTreatments, treatmentHref } from "@/data/treatments";
import Logo from "./ui/Logo";
import { CaretDown, List, Phone, WhatsappLogo, X } from "./icons";

const links = [
  { label: "Doctors", href: "/#doctors" },
  { label: "Fees", href: "/fees" },
  { label: "FAQs", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [overHero, setOverHero] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  // Shadow appears once the page has moved: observed, not scroll-polled.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Transparent over a full-bleed hero (home only) until the hero's end
  // passes under the bar. Pages without #hero-sentinel stay solid.
  // biome-ignore lint/correctness/useExhaustiveDependencies: re-check per route
  useEffect(() => {
    const el = document.getElementById("hero-sentinel");
    if (!el) {
      setOverHero(false);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting || entry.boundingClientRect.top > 72),
      { rootMargin: "-72px 0px 0px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMegaOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  const openMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  };

  const clear = overHero && !menuOpen && !megaOpen;
  const navLink = clear
    ? "text-white/90 hover:bg-white/10 hover:text-white"
    : "text-ink-soft hover:bg-mist hover:text-ink";

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-2 w-px" />
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          clear ? "bg-transparent" : "bg-paper/90 backdrop-blur-xl"
        } ${!clear && (scrolled || menuOpen) ? "shadow-[0_1px_0_0_var(--line)]" : ""}`}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-6">
          <Logo tone={clear ? "light" : "dark"} />

          <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1" aria-label="Main">
            <div className="relative" onMouseEnter={openMega} onMouseLeave={closeMega}>
              <button
                type="button"
                aria-expanded={megaOpen}
                aria-controls="treatments-menu"
                onClick={() => setMegaOpen((v) => !v)}
                className={`flex h-10 items-center gap-1.5 rounded-control px-3.5 text-[15px] font-medium transition-colors ${navLink}`}
              >
                Treatments
                <CaretDown size={14} weight="bold" className={`transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} />
              </button>

              {megaOpen && (
                <div id="treatments-menu" className="absolute left-0 top-full z-[60] w-[620px] pt-3">
                  <div className="grid grid-cols-[1.25fr_1fr] gap-10 rounded-surface border border-line bg-paper p-8 shadow-[0_40px_80px_-40px_rgba(18,53,42,0.45)]">
                    <MegaColumn title="Dentist" items={dentalTreatments.map((t) => ({ label: t.name, href: treatmentHref(t) }))} />
                    <div className="flex flex-col">
                      <MegaColumn title="Doctor" items={medicalTreatments.map((t) => ({ label: t.name, href: treatmentHref(t) }))} />
                      <Link href="/treatments" className="link mt-auto pt-6 text-[15px]">
                        All treatments
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex h-10 items-center rounded-control px-3.5 text-[15px] font-medium transition-colors ${navLink}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={telHref(siteConfig.phone)}
              className={`flex h-11 items-center gap-2 rounded-control px-4 text-[15px] font-semibold transition-colors ${
                clear ? "text-white hover:bg-white/10" : "text-forest-800 hover:bg-mist"
              }`}
            >
              <Phone size={18} />
              <span className="sr-only xl:not-sr-only">{siteConfig.phone}</span>
            </a>
            <a
              href={whatsAppHref(siteConfig.whatsapp, defaultWhatsAppMessage)}
              target="_blank"
              rel="noreferrer"
              className={`${clear ? "btn-gold" : "btn-primary"} min-h-[44px] px-5 text-[15px]`}
            >
              <WhatsappLogo size={18} weight="fill" />
              WhatsApp us
            </a>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className={`-mr-2 grid h-12 w-12 place-items-center rounded-control lg:hidden ${clear ? "text-white" : "text-ink"}`}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={26} /> : <List size={26} />}
          </button>
        </div>

        {menuOpen && (
          <div className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-paper lg:hidden">
            <div className="shell space-y-10 py-8">
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-2 text-[30px] font-semibold tracking-[-0.03em] text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <MobileGroup title="Dentist" items={dentalTreatments.map((t) => ({ label: t.name, href: treatmentHref(t) }))} />
              <MobileGroup title="Doctor" items={medicalTreatments.map((t) => ({ label: t.name, href: treatmentHref(t) }))} />
              <p className="text-[15px] text-ink-muted">{siteConfig.addressText}</p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

type NavItem = { label: string; href: string };

function MegaColumn({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div>
      <p className="text-[13px] font-semibold text-ink-muted">{title}</p>
      <ul className="mt-3 space-y-0.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="-mx-2 block rounded-[8px] px-2 py-1.5 text-[15px] font-medium text-ink transition-colors hover:bg-mist hover:text-forest-800"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileGroup({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <details className="acc group border-t border-line pt-5">
      <summary className="flex items-center justify-between">
        <span className="text-[17px] font-semibold text-ink">{title} treatments</span>
        <CaretDown size={18} className="text-forest-800 transition-transform group-open:rotate-180" />
      </summary>
      <ul className="mt-3 grid gap-x-6 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="block py-2.5 text-[16px] text-ink-soft">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
