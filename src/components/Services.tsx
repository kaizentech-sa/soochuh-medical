"use client";

import Image from "next/image";
import Link from "next/link";
import { dentalServices, medicalServices } from "@/data/site";
import { ArrowIcon } from "./icons";

type ServiceItem = {
  icon: string;
  title: string;
  description?: string;
  href?: string;
};

type ServicesProps = { items?: ServiceItem[] };

/** Falls back to the practice's own service list rather than a stock grid. */
const fallbackServices: ServiceItem[] = [
  ...dentalServices.map((s) => ({ icon: "", title: s.title, description: s.blurb, href: "#contact" })),
  ...medicalServices.slice(0, 3).map((s) => ({ icon: "", title: s.title, description: s.blurb, href: "#contact" })),
];

export default function Services({ items = [] }: ServicesProps) {
  const services = items.length > 0 ? items : fallbackServices;

  return (
    <section id="services" className="section bg-bone">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow fade-in-up">01 — What we do</p>
            <h2 className="display-lg fade-in-up delay-100 mt-5 font-display">
              Two disciplines,
              <span className="italic text-teal-500"> one waiting room</span>
            </h2>
          </div>
          <p className="lede fade-in-up delay-200 md:col-span-5">
            A GP and a dentist in the same practice means fewer referrals, shorter
            waits, and a team that already knows your history.
          </p>
        </div>

        <div className="rule fade-in-up delay-200 mt-14" />

        {/* Numbered editorial rows — legible without relying on stock imagery */}
        <ul className="mt-2">
          {services.map((service, index) => (
            <li key={service.title}>
              <Link
                href={service.href || "#contact"}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-[color:var(--line)] py-7 transition-colors duration-500 ease-soft hover:bg-white md:gap-10 md:px-4"
              >
                <span className="font-sans text-[11px] tabular-nums tracking-eyebrow text-teal-300">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="grid gap-1.5 md:grid-cols-[minmax(0,22rem)_1fr] md:items-baseline md:gap-10">
                  <span className="flex items-center gap-4">
                    {service.icon && (
                      <span className="relative hidden h-9 w-9 shrink-0 sm:block">
                        <Image src={service.icon} alt="" fill className="object-contain" />
                      </span>
                    )}
                    <span className="font-display text-2xl leading-tight text-ink transition-colors duration-500 group-hover:text-teal-500 md:text-[1.75rem]">
                      {service.title}
                    </span>
                  </span>
                  {service.description && (
                    <span className="font-sans text-[15px] font-light text-ink-muted">
                      {service.description}
                    </span>
                  )}
                </span>

                <ArrowIcon className="h-5 w-5 -translate-x-2 text-teal-300 opacity-0 transition-all duration-500 ease-soft group-hover:translate-x-0 group-hover:text-teal-500 group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="fade-in-up mt-14">
          <Link href="#contact" className="btn-outline">
            Not sure what you need? Ask us
          </Link>
        </div>
      </div>
    </section>
  );
}
