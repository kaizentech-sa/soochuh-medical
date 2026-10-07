import { defaultWhatsAppMessage, siteConfig, telHref, whatsAppHref } from "@/data/site";
import { ArrowUpRight, Phone, WhatsappLogo } from "../icons";

/** Straight after the welcome: the two ways to book, as two unequal tiles. */
export default function BookingSection() {
  return (
    <section id="book" className="py-24 md:py-32">
      <div className="shell">
        <h2 data-reveal className="t-h2 max-w-[16ch]">
          Booking takes a minute. <span className="em">No forms, no apps.</span>
        </h2>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <a
            data-reveal
            href={whatsAppHref(siteConfig.whatsapp, defaultWhatsAppMessage)}
            target="_blank"
            rel="noreferrer"
            className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-surface bg-forest-800 p-8 text-white transition-colors duration-500 hover:bg-forest-700 md:p-10 lg:col-span-7"
          >
            <div className="flex items-start justify-between">
              <WhatsappLogo size={40} weight="fill" className="text-gold-300" />
              <ArrowUpRight size={28} className="transition-transform duration-500 ease-soft group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
            <div>
              <p className="text-[clamp(1.9rem,3.4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]">WhatsApp us</p>
              <p className="mt-3 max-w-[44ch] text-[17px] text-white/80">{siteConfig.booking.whatsappTip}</p>
              <p className="mt-5 text-[15px] font-medium text-gold-300">{siteConfig.booking.whatsappReply}</p>
            </div>
          </a>

          <a
            data-reveal
            href={telHref(siteConfig.phone)}
            className="group flex min-h-[260px] flex-col justify-between rounded-surface bg-mist p-8 transition-colors duration-500 hover:bg-forest-100 md:p-10 lg:col-span-5"
          >
            <div className="flex items-start justify-between text-forest-800">
              <Phone size={40} />
              <ArrowUpRight size={28} className="transition-transform duration-500 ease-soft group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
            <div>
              <p className="text-[clamp(1.9rem,3.4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">Call us</p>
              <p className="mt-3 text-[17px] text-ink-soft">Prefer to talk? Our front desk will find a time that suits you.</p>
              <p className="mt-5 text-[20px] font-semibold tracking-[-0.01em] text-forest-800">{siteConfig.phone}</p>
            </div>
          </a>
        </div>

        <div data-reveal className="mt-8 flex flex-col gap-x-10 gap-y-3 border-t border-line pt-6 text-[15px] md:flex-row md:items-center">
          <dl className="flex flex-wrap gap-x-8 gap-y-1">
            {siteConfig.hours.map((h) => (
              <div key={h.days} className="flex gap-2">
                <dt className="text-ink-muted">{h.short}</dt>
                <dd className="font-semibold text-ink">{h.time}</dd>
              </div>
            ))}
          </dl>
          <p className="text-ink-muted md:ml-auto">{siteConfig.booking.emergency}</p>
        </div>
      </div>
    </section>
  );
}
