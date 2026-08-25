"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig, telHref, whatsAppHref } from "@/data/site";
import { InstagramIcon, WhatsAppIcon } from "./icons";

const quickLinks = [
  { label: "Treatments", href: "#services" },
  { label: "Fields of care", href: "#fields" },
  { label: "What makes us different", href: "#difference" },
  { label: "Meet the team", href: "#team" },
  { label: "Pricing & payment options", href: "/pricing-and-payment-options" },
  { label: "Contact", href: "#contact" },
];

type FooterProps = { googleMapsShareLink?: string };

export default function Footer({ googleMapsShareLink }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--line)] bg-bone">
      <div className="shell grid gap-14 py-20 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <span className="relative block h-12 w-12">
              <Image src="/Untitled design.svg" alt="" fill className="object-contain" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-2xl text-ink">Soochuh</span>
              <span className="mt-0.5 block font-sans text-[9px] uppercase tracking-eyebrow text-teal-700">
                Medical
              </span>
            </span>
          </div>

          <p className="mt-7 max-w-sm font-sans font-light leading-relaxed text-ink-muted">
            A women-led medical and dental practice on Main Road in Diep River,
            Cape Town. One team, one address, two disciplines.
          </p>

          <p className="mt-6 font-display text-lg italic text-teal-700">
            “{siteConfig.tagline}”
          </p>
        </div>

        <nav className="md:col-span-3" aria-label="Footer">
          <h2 className="eyebrow">Explore</h2>
          <ul className="mt-6 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="link-underline tap font-sans text-[15px] font-light text-ink-soft hover:text-teal-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="eyebrow">Visit</h2>
          <address className="mt-6 not-italic font-sans font-light leading-relaxed text-ink-soft">
            {siteConfig.address.line1}
            <br />
            {siteConfig.address.line2}
            <br />
            {siteConfig.address.city}
          </address>

          <div className="mt-6 space-y-2">
            <Link href={telHref(siteConfig.phone)} className="link-underline block font-display text-xl text-ink hover:text-teal-500">
              {siteConfig.phone}
            </Link>
            {googleMapsShareLink && (
              <a
                href={googleMapsShareLink}
                target="_blank"
                rel="noreferrer"
                className="link-underline block font-sans text-[14px] text-teal-700"
              >
                Open in Google Maps →
              </a>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Soochuh Medical on Instagram"
              className="grid h-11 w-11 place-items-center rounded-full border border-teal-900/15 text-teal-700 transition-colors duration-500 hover:border-teal-500 hover:bg-teal-500 hover:text-white"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={whatsAppHref(siteConfig.whatsapp)}
              target="_blank"
              rel="noreferrer"
              aria-label="Message Soochuh Medical on WhatsApp"
              className="grid h-11 w-11 place-items-center rounded-full border border-teal-900/15 text-teal-700 transition-colors duration-500 hover:border-teal-500 hover:bg-teal-500 hover:text-white"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[color:var(--line)]">
        <div className="shell flex flex-col items-center justify-between gap-4 py-6 pb-24 md:flex-row md:pb-6">
          <p className="font-sans text-[13px] font-light text-ink-muted">
            © {year} Soochuh Medical. All rights reserved.
          </p>
          <p className="font-sans text-[13px] font-light text-ink-muted">
            <Link href="/privacy" className="link-underline hover:text-teal-500">Privacy</Link>
            <span className="mx-3 text-[color:var(--line)]">/</span>
            <Link href="/terms" className="link-underline hover:text-teal-500">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
