import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHead from "@/components/PageHead";
import { Check, ShieldCheck, Wallet } from "@/components/icons";
import { feeExtras, feePromises, medicalAid, paymentMethods, paymentPlan } from "@/data/fees";
import { getTreatment, type Treatment, treatmentHref } from "@/data/treatments";

export const metadata: Metadata = {
  title: "Fees & medical aid",
  description:
    "Guide prices for dental and medical treatment at Soochuh Medical, Diep River, and how medical aid claims and payment work.",
};

const t = (slug: string) => getTreatment(slug) as Treatment;

/* Long lists are grouped into small clusters, not one long ruled table. */
const groups = [
  { title: "Check-ups and cleaning", items: [t("consultation-and-x-rays"), t("professional-dental-cleaning")] },
  { title: "Repairs and pain relief", items: [t("fillings"), t("extractions"), t("root-canal-therapy")] },
  { title: "Rebuilding and replacing teeth", items: [t("crowns-and-bridges"), t("dentures")] },
  { title: "Cosmetic", items: [t("veneers"), t("teeth-whitening")] },
  { title: "Comfort and sedation", items: [t("sedation"), t("general-anaesthesia")], wide: true },
  {
    title: "With the doctor",
    items: [t("gp-consultations"), t("chronic-care"), t("womens-health"), t("family-and-child-health"), t("health-checks")],
  },
];

function PriceRow({ name, price, note, href }: { name: string; price: string; note?: string; href?: string }) {
  const label = href ? (
    <Link href={href} className="font-semibold text-ink hover:text-forest-700">
      {name}
    </Link>
  ) : (
    <span className="font-semibold text-ink">{name}</span>
  );
  return (
    <li className="py-3">
      <div className="flex items-baseline gap-3">
        {label}
        <span aria-hidden="true" className="h-px flex-1 translate-y-[-4px] border-b border-dotted border-forest-300" />
        <span className="shrink-0 font-semibold text-forest-800 tabular-nums">{price}</span>
      </div>
      {note && <p className="mt-0.5 text-[14px] text-ink-muted">{note}</p>}
    </li>
  );
}

export default function FeesPage() {
  return (
    <>
      <PageHead
        title={
          <>
            Clear prices, <span className="em">before we begin.</span>
          </>
        }
        intro="Guide prices for 2026. Your final cost depends on your needs, and you'll always get it in writing first."
      >
        <ul className="mt-10 flex flex-col gap-x-10 gap-y-3 lg:flex-row">
          {feePromises.map((p) => (
            <li key={p.title} className="flex items-center gap-2.5 font-medium text-ink">
              <Check size={20} weight="bold" className="text-forest-800" />
              {p.title}
            </li>
          ))}
        </ul>
      </PageHead>

      <section className="py-16 md:py-24">
        <div className="shell grid gap-16 lg:grid-cols-12">
          <div className="grid gap-x-12 gap-y-14 md:grid-cols-2 lg:col-span-8">
            {groups.map((g) => (
              <div key={g.title} className={g.items.length > 3 || "wide" in g ? "md:col-span-2" : ""}>
                <h2 className="t-h3">{g.title}</h2>
                <ul className={`mt-4 ${g.items.length > 3 || "wide" in g ? "grid gap-x-12 md:grid-cols-2" : ""}`}>
                  {g.items.map((item) => (
                    <PriceRow key={item.slug} name={item.name} price={`from ${item.price.from}`} note={item.price.note} href={treatmentHref(item)} />
                  ))}
                </ul>
              </div>
            ))}
            <div className="md:col-span-2">
              <h2 className="t-h3">Other fees</h2>
              <ul className="mt-4 grid gap-x-12 md:grid-cols-2">
                {feeExtras.map((f) => (
                  <PriceRow key={f.name} name={f.name} price={f.price} />
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="space-y-4 lg:sticky lg:top-[100px]">
              <div className="rounded-surface bg-mist p-8">
                <ShieldCheck size={32} className="text-forest-800" />
                <h2 className="t-h3 mt-5">Medical aid</h2>
                <p className="mt-3 text-[15px] text-ink-soft">{medicalAid.summary}</p>
                <ul className="mt-5 space-y-2.5 text-[15px] text-ink-soft">
                  {medicalAid.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-forest-800" />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[14px] text-ink-muted">
                  We claim from {medicalAid.schemes.slice(0, -1).join(", ")} and {medicalAid.schemes.at(-1)}, among others.
                </p>
              </div>

              <div className="rounded-surface border border-line p-8">
                <Wallet size={30} className="text-forest-800" />
                <h2 className="t-h3 mt-5">Ways to pay</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {paymentMethods.map((m) => (
                    <li key={m} className="rounded-control bg-mist px-3 py-1.5 text-[14px] font-medium text-ink">
                      {m}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-semibold text-ink">{paymentPlan.title}</p>
                <p className="mt-1 text-[15px] text-ink-soft">{paymentPlan.text}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        title="Questions about cost?"
        text="Ask us before you book. We're happy to talk through prices, medical aid cover or a payment plan."
        message="Hi Soochuh Medical, I have a question about fees."
      />
    </>
  );
}
