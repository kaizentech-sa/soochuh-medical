"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { defaultWhatsAppMessage, siteConfig, whatsAppHref } from "@/data/site";
import { dentalTreatments, treatmentHref } from "@/data/treatments";
import { ArrowRight, WhatsappLogo } from "../icons";
import { getGsap } from "../motion/gsap";

/**
 * Eleven treatments without an eleven-card scroll. On desktop the section
 * pins and the rail pans sideways as you scroll; on touch screens and with
 * reduced motion it is a native swipe rail with snap points.
 */
export default function DentalRail() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = track.current;
    const section = wrap.current;
    if (!el || !section) return;
    const { gsap } = getGsap();
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => el.scrollWidth - window.innerWidth;
      gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 72px",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={wrap} id="treatments" className="overflow-hidden bg-paper py-16 lg:flex lg:min-h-[calc(100dvh-72px)] lg:flex-col lg:justify-center lg:py-10">
      <div className="shell">
        <p data-reveal className="label">The dentist</p>
        <h2 data-reveal className="t-h2 mt-4 max-w-[20ch]">
          Dental care, <span className="em">explained simply.</span>
        </h2>
        <p data-reveal className="lede mt-4">
          Every treatment in plain language, with a guide price up front.
        </p>
      </div>

      <div className="rail mt-10 snap-x snap-mandatory scroll-pl-5 overflow-x-auto sm:scroll-pl-8 lg:snap-none lg:overflow-visible">
        <div
          ref={track}
          className="flex w-max gap-5 pl-5 pr-5 sm:pl-8 sm:pr-8 lg:pl-[max(calc((100vw-1400px)/2+3rem),3rem)] lg:pr-[max(calc((100vw-1400px)/2+3rem),3rem)]"
        >
          {dentalTreatments.map((t) => (
            <Link
              key={t.slug}
              href={treatmentHref(t)}
              className="group flex w-[78vw] max-w-[300px] shrink-0 snap-start flex-col lg:w-[clamp(210px,calc((100dvh-470px)*0.8),300px)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-surface bg-forest-100">
                <Image
                  src={t.image}
                  alt={t.imageAlt}
                  fill
                  sizes="300px"
                  className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="text-[19px] font-semibold leading-snug tracking-[-0.015em] text-ink">{t.name}</h3>
                <span className="shrink-0 text-[15px] font-semibold text-forest-800">{t.price.from}</span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-[15px] text-ink-muted">{t.summary}</p>
            </Link>
          ))}

          <a
            href={whatsAppHref(siteConfig.whatsapp, defaultWhatsAppMessage)}
            target="_blank"
            rel="noreferrer"
            className="group flex w-[78vw] max-w-[300px] shrink-0 snap-start flex-col justify-between rounded-surface bg-gold-100 p-7 lg:w-[clamp(210px,calc((100dvh-470px)*0.8),300px)]"
          >
            <WhatsappLogo size={36} weight="fill" className="text-forest-800" />
            <div>
              <p className="text-[24px] font-semibold leading-tight tracking-[-0.02em] text-ink">Not sure what you need?</p>
              <p className="mt-3 text-[15px] text-ink-soft">
                Tell us what&apos;s bothering you and we&apos;ll book the right appointment.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-forest-800">
                WhatsApp us <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
