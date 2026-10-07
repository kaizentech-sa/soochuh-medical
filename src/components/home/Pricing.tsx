import Link from "next/link";
import { getTreatment, type Treatment } from "@/data/treatments";
import { ArrowRight } from "../icons";

const highlights = ["consultation-and-x-rays", "professional-dental-cleaning", "fillings", "gp-consultations"].map(
  (slug) => getTreatment(slug) as Treatment,
);

/** Cost is one of the three things patients worry about most, so it gets real numbers, big. */
export default function Pricing() {
  return (
    <section id="fees" className="bg-mist py-24 md:py-32">
      <div className="shell">
        <h2 data-reveal className="t-h2 max-w-[18ch]">
          Clear prices, <span className="em">before we begin.</span>
        </h2>
        <p data-reveal className="lede mt-5">
          Guide prices are listed openly, and you always get a written quote first. We claim from your
          medical aid for you.
        </p>

        <div className="mt-14 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {highlights.map((t, i) => (
            <Link
              key={t.slug}
              data-reveal
              href={`/treatments/${t.slug}`}
              className={`group pr-6 ${i % 2 === 1 ? "border-l border-forest-200 pl-6" : ""} ${i === 2 ? "lg:border-l lg:border-forest-200 lg:pl-6" : ""}`}
            >
              <p className="text-[clamp(2.4rem,4.4vw,3.6rem)] font-semibold leading-none tracking-[-0.04em] text-forest-800 tabular-nums">
                {t.price.from}
              </p>
              <p className="mt-4 font-semibold text-ink group-hover:text-forest-700">{t.name}</p>
              <p className="mt-0.5 text-[15px] text-ink-muted">{t.category === "dental" ? "Dentist" : "Doctor"}, guide price</p>
            </Link>
          ))}
        </div>

        <div data-reveal className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href="/fees" className="btn-primary">
            See all fees <ArrowRight size={18} />
          </Link>
          <p className="text-[15px] text-ink-muted">Card, tap, SnapScan, EFT or cash. Payment plans for larger treatment.</p>
        </div>
      </div>
    </section>
  );
}
