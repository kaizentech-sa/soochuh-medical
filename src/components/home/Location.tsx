import { mapsHref, siteConfig, telHref } from "@/data/site";
import { ArrowUpRight } from "../icons";

/** Full-width map first (the reference site's "Serving…" block), details in a row beneath. */
export default function Location() {
  return (
    <section id="contact" className="pb-24 md:pb-32">
      <div className="shell">
        <h2 data-reveal className="t-h2 max-w-[18ch]">
          Find us on Main Road, <span className="em">Diep River.</span>
        </h2>

        <div data-reveal className="relative mt-12 aspect-[4/3] overflow-hidden rounded-surface border border-line bg-mist sm:aspect-[16/9] lg:aspect-[21/8]">
          <iframe
            title="Map showing Soochuh Medical on Main Road, Diep River"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.mapsQuery)}&z=16&output=embed`}
            className="absolute inset-0 h-full w-full grayscale-[40%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div data-reveal>
            <p className="text-[15px] text-ink-muted">Address</p>
            <p className="mt-1 text-[19px] font-semibold text-ink">{siteConfig.addressText}</p>
            <a href={mapsHref()} target="_blank" rel="noreferrer" className="link mt-3 text-[15px]">
              Get directions <ArrowUpRight size={16} />
            </a>
          </div>
          <div data-reveal>
            <p className="text-[15px] text-ink-muted">Phone and email</p>
            <a href={telHref(siteConfig.phone)} className="mt-1 block text-[19px] font-semibold text-ink hover:text-forest-700">
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="mt-1 block text-ink-soft hover:text-forest-700">
              {siteConfig.email}
            </a>
          </div>
          <div data-reveal>
            <p className="text-[15px] text-ink-muted">Opening hours</p>
            <dl className="mt-1 space-y-1">
              {siteConfig.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-6">
                  <dt className="text-ink-soft">{h.days}</dt>
                  <dd className="font-semibold text-ink">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
