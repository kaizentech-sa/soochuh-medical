import Image from "next/image";
import Link from "next/link";
import { getTreatment, type Treatment, treatmentHref } from "@/data/treatments";
import { ArrowRight, Heartbeat, Smiley, Stethoscope } from "../icons";

const pick = (slug: string) => getTreatment(slug) as Treatment;

/**
 * The doctor's side of the practice as an asymmetric bento: one large
 * photo tile, one wide photo tile, three tinted text tiles. Five services,
 * five cells.
 */
export default function MedicalBento() {
  const gp = pick("gp-consultations");
  const chronic = pick("chronic-care");
  const small = [
    { t: pick("womens-health"), icon: Heartbeat, tone: "bg-gold-100" },
    { t: pick("family-and-child-health"), icon: Smiley, tone: "bg-mist" },
    { t: pick("health-checks"), icon: Stethoscope, tone: "border border-line bg-paper" },
  ];

  return (
    <section className="py-24 md:py-32">
      <div className="shell">
        <h2 data-reveal className="t-h2 max-w-[18ch]">
          Your family doctor, <span className="em">right next door.</span>
        </h2>
        <p data-reveal className="lede mt-5">
          Check-ups, coughs, chronic care and women&apos;s health, with a doctor who takes the time to explain.
        </p>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {/* Large photo tile */}
          <Link data-reveal href={treatmentHref(gp)} className="group flex flex-col overflow-hidden rounded-surface bg-mist lg:col-span-5 lg:row-span-2">
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:flex-1">
              <Image src={gp.image} alt={gp.imageAlt} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]" />
            </div>
            <TileText t={gp} big />
          </Link>

          {/* Wide photo tile */}
          <Link data-reveal href={treatmentHref(chronic)} className="group grid overflow-hidden rounded-surface bg-forest-800 text-white sm:grid-cols-2 lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-[260px]">
              <Image src={chronic.image} alt={chronic.imageAlt} fill sizes="(max-width: 1024px) 100vw, 30vw" className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]" />
            </div>
            <div className="flex flex-col justify-between gap-6 p-7">
              <div>
                <h3 className="t-h3 text-white">{chronic.name}</h3>
                <p className="mt-2 text-[15px] text-white/75">{chronic.summary}</p>
              </div>
              <p className="flex items-center justify-between text-[15px]">
                <span className="text-white/70">From <strong className="font-semibold text-white">{chronic.price.from}</strong></span>
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </p>
            </div>
          </Link>

          {/* Three tinted tiles */}
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
            {small.map(({ t, icon: Icon, tone }) => (
              <Link data-reveal key={t.slug} href={treatmentHref(t)} className={`group flex min-h-[170px] flex-col rounded-surface p-6 sm:min-h-[240px] ${tone}`}>
                <Icon size={30} className="text-forest-800" />
                <h3 className="mt-auto pt-8 text-[18px] font-semibold leading-snug tracking-[-0.015em] text-ink">{t.name}</h3>
                <p className="mt-1.5 flex items-center justify-between text-[15px] text-ink-muted">
                  <span>From <strong className="font-semibold text-forest-800">{t.price.from}</strong></span>
                  <ArrowRight size={18} className="text-forest-800 transition-transform group-hover:translate-x-1" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TileText({ t, big = false }: { t: Treatment; big?: boolean }) {
  return (
    <div className="flex items-end justify-between gap-6 p-7">
      <div>
        <h3 className={big ? "t-h3" : "text-[18px] font-semibold"}>{t.name}</h3>
        <p className="mt-2 max-w-[40ch] text-[15px] text-ink-muted">{t.summary}</p>
      </div>
      <span className="shrink-0 text-right text-[15px] text-ink-muted">
        From
        <br />
        <strong className="text-[20px] font-semibold text-forest-800">{t.price.from}</strong>
      </span>
    </div>
  );
}
