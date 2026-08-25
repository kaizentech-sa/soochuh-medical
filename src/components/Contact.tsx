"use client";

import Link from "next/link";
import { siteConfig, telHref, whatsAppHref } from "@/data/site";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";

type ContactPhone = { label?: string; number: string };

type ContactProps = {
  phoneNumbers?: ContactPhone[];
  whatsappNumber?: string;
  address?: string;
  email?: string;
  appointmentLink?: string;
};

export default function Contact({
  phoneNumbers = [],
  whatsappNumber,
  address,
  email,
  appointmentLink,
}: ContactProps) {
  const phones = phoneNumbers.length > 0 ? phoneNumbers : [{ number: siteConfig.phone }];
  const whatsapp = whatsappNumber || siteConfig.whatsapp;
  const contactAddress = address?.trim() || siteConfig.addressText;
  const contactEmail = email?.trim() || siteConfig.email;

  return (
    <section id="contact" className="section bg-teal-950 text-white">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <p className="eyebrow fade-in-up text-teal-300">07 — Get in touch</p>
          <h2 className="display-lg fade-in-up delay-100 mt-5 font-display text-white">
            Come and see us
          </h2>
          <p className="fade-in-up delay-200 lede mt-7 max-w-md text-white/70">
            WhatsApp is the quickest way to reach us. Call if it is urgent, and
            walk in if you are already on Main Road.
          </p>

          <div className="fade-in-up delay-300 mt-10 flex flex-wrap gap-3">
            <Link href={whatsAppHref(whatsapp)} target="_blank" className="btn bg-white px-8 py-4 text-teal-900 hover:bg-teal-500 hover:text-white">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
            </Link>
            <Link href={appointmentLink || telHref(phones[0].number)} className="btn border border-white/30 px-8 py-4 text-white hover:bg-white/10">
              Book a visit
            </Link>
          </div>
        </div>

        <dl className="fade-in-up delay-200 lg:col-span-6">
          <div className="border-t border-white/15 py-7">
            <dt className="flex items-center gap-3 font-sans text-[11px] uppercase tracking-eyebrow text-teal-300">
              <PinIcon className="h-4 w-4" /> Where to find us
            </dt>
            <dd className="mt-3 whitespace-pre-line font-display text-2xl text-white">{contactAddress}</dd>
          </div>

          <div className="border-t border-white/15 py-7">
            <dt className="flex items-center gap-3 font-sans text-[11px] uppercase tracking-eyebrow text-teal-300">
              <PhoneIcon className="h-4 w-4" /> Phone
            </dt>
            <dd className="mt-3 space-y-1">
              {phones.map((phone, i) => (
                <Link
                  key={`${phone.number}-${i}`}
                  href={telHref(phone.number)}
                  className="link-underline tap block font-display text-2xl text-white hover:text-teal-300"
                >
                  {phone.number}
                  {phone.label && (
                    <span className="ml-3 font-sans text-[11px] uppercase tracking-eyebrow text-white/50">
                      {phone.label}
                    </span>
                  )}
                </Link>
              ))}
            </dd>
          </div>

          {contactEmail && (
            <div className="border-t border-white/15 py-7">
              <dt className="flex items-center gap-3 font-sans text-[11px] uppercase tracking-eyebrow text-teal-300">
                <MailIcon className="h-4 w-4" /> Email
              </dt>
              <dd className="mt-3">
                <Link href={`mailto:${contactEmail}`} className="link-underline tap font-display text-2xl text-white hover:text-teal-300">
                  {contactEmail}
                </Link>
              </dd>
            </div>
          )}

          {siteConfig.hours.length > 0 && (
            <div className="border-y border-white/15 py-7">
              <dt className="font-sans text-[11px] uppercase tracking-eyebrow text-teal-300">Opening hours</dt>
              <dd className="mt-3 space-y-1 font-sans font-light text-white/75">
                {siteConfig.hours.map((h) => (
                  <p key={h.days}>
                    <span className="inline-block w-32">{h.days}</span>
                    {h.time}
                  </p>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}
