import Image from "next/image";
import { practitioners, siteConfig, whatsAppHref } from "@/data/site";
import { InstagramLogo, ShieldCheck, WhatsappLogo } from "../icons";

/** Two clinicians, side by side and equal: the practice is both. */
export default function Doctors() {
  return (
    <section id="doctors" className="py-24 md:py-32">
      <div className="shell">
        <h2 data-reveal className="t-h2 max-w-[16ch]">
          The two people <span className="em">you&apos;ll see.</span>
        </h2>
        <p data-reveal className="lede mt-5">
          A small practice on purpose: the same friendly faces at every visit.
        </p>

        <div className="mt-14 grid gap-16 md:grid-cols-2 md:gap-10 lg:gap-16">
          {practitioners.map((doc, i) => (
            <article key={doc.slug} data-reveal className={i === 1 ? "md:mt-24" : ""}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-surface bg-forest-100">
                <Image
                  src={doc.image}
                  alt={doc.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="mt-7 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="t-h3">{doc.name}</h3>
                <p className="text-[15px] font-medium text-forest-700">{doc.role}</p>
              </div>
              <p className="mt-1 text-[15px] text-ink-muted">{doc.credentials}</p>
              <p className="mt-5 text-[19px] font-medium italic leading-snug text-forest-800">{doc.focus}</p>
              <p className="mt-4 text-ink-soft">{doc.bio[0]}</p>

              <dl className="mt-6 grid grid-cols-2 gap-4 text-[15px]">
                {doc.facts
                  .filter((f) => f.label === "Experience" || f.label === "Languages")
                  .map((f) => (
                    <div key={f.label}>
                      <dt className="text-ink-muted">{f.label}</dt>
                      <dd className="font-semibold text-ink">{f.value}</dd>
                    </div>
                  ))}
              </dl>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href={whatsAppHref(siteConfig.whatsapp, `Hi, I'd like to book an appointment with ${doc.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  <WhatsappLogo size={20} weight="fill" />
                  WhatsApp us
                </a>
                {doc.instagram && (
                  <a href={doc.instagram} target="_blank" rel="noreferrer" className="link text-[15px]">
                    <InstagramLogo size={18} /> Instagram
                  </a>
                )}
                <span className="flex items-center gap-1.5 text-[14px] text-ink-muted">
                  <ShieldCheck size={18} className="text-forest-700" /> HPCSA registered
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
