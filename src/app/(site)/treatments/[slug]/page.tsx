import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import TreatmentCard from "@/components/TreatmentCard";
import Accordion from "@/components/ui/Accordion";
import BookingButtons from "@/components/ui/BookingButtons";
import { CalendarBlank, Check, Clock, Heart } from "@/components/icons";
import { practitioners } from "@/data/site";
import { getTreatment, treatments } from "@/data/treatments";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) return {};
  return {
    title: `${t.name} in Diep River, Cape Town`,
    description: `${t.summary} From ${t.price.from}. Book on WhatsApp or by phone.`,
    openGraph: { images: [t.image] },
  };
}

export default async function TreatmentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) notFound();

  const clinicians = t.sharedCare ? practitioners : practitioners.filter((p) => p.discipline === t.category);
  const related = treatments.filter((x) => x.category === t.category && x.slug !== t.slug).slice(0, 3);
  const bookMessage = `Hi Soochuh Medical, I'd like to book an appointment for ${t.name.toLowerCase()}.`;
  const facts = [
    { icon: Clock, label: "Time", value: t.facts.time },
    { icon: CalendarBlank, label: "Visits", value: t.facts.visits },
    { icon: Heart, label: "Comfort", value: t.facts.comfort },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://soochuhmedical.co.za/" },
        { "@type": "ListItem", position: 2, name: "Treatments", item: "https://soochuhmedical.co.za/treatments" },
        { "@type": "ListItem", position: 3, name: t.name },
      ],
    },
  ];

  return (
    <>
      {/* Head: asymmetric split */}
      <section className="pb-16 pt-8 md:pt-12 lg:pb-24">
        <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="text-[14px] text-ink-muted">
              <Link href="/treatments" className="hover:text-ink">Treatments</Link>
              <span className="mx-2">/</span>
              <span>{t.category === "dental" ? "Dentist" : "Doctor"}</span>
            </nav>
            <h1 data-reveal className="t-display mt-6 max-w-[14ch]">{t.name}</h1>
            <p data-reveal className="mt-5 text-[clamp(1.25rem,2vw,1.6rem)] font-medium italic leading-snug text-forest-800">{t.tagline}</p>
            <p data-reveal className="lede mt-5">{t.summary}</p>
            <BookingButtons message={bookMessage} className="mt-9" />

            <dl className="mt-12 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-3">
                  <Icon size={22} className="mt-0.5 shrink-0 text-gold-700" />
                  <div>
                    <dt className="text-[14px] text-ink-muted">{label}</dt>
                    <dd className="font-semibold leading-snug text-ink">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[16/11] overflow-hidden rounded-surface bg-forest-100 lg:aspect-[4/5]">
              <Image
                src={t.image}
                alt={t.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                style={t.imagePosition ? { objectPosition: t.imagePosition } : undefined}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Body + sticky price */}
      <section className="border-t border-line py-16 md:py-24">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
          <article className="space-y-20 lg:col-span-8">
            <div data-reveal>
              <h2 className="t-h2">In simple terms</h2>
              <div className="mt-6 max-w-[62ch] space-y-5 text-[18px] leading-[1.75]">
                {t.simple.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </div>

            <div data-reveal className="rounded-surface bg-mist p-8 md:p-10">
              <h2 className="t-h3">It may help if you have</h2>
              <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {t.goodFor.map((g) => (
                  <li key={g} className="flex gap-3">
                    <Check size={20} weight="bold" className="mt-1 shrink-0 text-forest-800" />
                    <span className="text-ink">{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 data-reveal className="t-h2">What to expect</h2>
              <ol className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
                {t.steps.map((s, i) => (
                  <li key={s.title} data-reveal className="border-t-2 border-forest-800 pt-5">
                    <p className="text-[15px] font-semibold text-gold-700 tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.015em] text-ink">{s.title}</h3>
                    <p className="mt-2 text-ink-soft">{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div data-reveal>
              <h2 className="t-h2">Aftercare</h2>
              <ul className="mt-6 max-w-[62ch] space-y-4">
                {t.aftercare.map((a) => (
                  <li key={a} className="flex gap-4">
                    <span className="mt-[11px] h-[2px] w-4 shrink-0 bg-gold-500" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="faq">
              <h2 data-reveal className="t-h2">Questions</h2>
              <div data-reveal className="mt-8">
                <Accordion items={t.faqs} openFirst />
              </div>
            </div>
          </article>

          <aside className="lg:col-span-4">
            <div className="space-y-4 lg:sticky lg:top-[100px]">
              <div className="rounded-surface border border-line bg-paper p-7 shadow-[0_30px_60px_-44px_rgba(18,53,42,0.6)]">
                <p className="text-[14px] text-ink-muted">Guide price from</p>
                <p className="mt-1 text-[52px] font-semibold leading-none tracking-[-0.045em] text-forest-800 tabular-nums">{t.price.from}</p>
                {t.price.note && <p className="mt-4 text-[15px] text-ink-soft">{t.price.note}</p>}
                <p className="mt-4 border-t border-line pt-4 text-[14px] text-ink-muted">
                  Written quote before treatment. We claim from your medical aid for you.
                </p>
                <BookingButtons message={bookMessage} stack className="mt-6" />
                <Link href="/fees" className="link mt-5 text-[15px]">
                  All fees
                </Link>
              </div>

              <div className="rounded-surface bg-mist p-6">
                <p className="text-[14px] text-ink-muted">{t.sharedCare ? "Your care team" : "Who you'll see"}</p>
                <ul className="mt-4 space-y-4">
                  {clinicians.map((c) => (
                    <li key={c.slug} className="flex items-center gap-4">
                      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-control bg-forest-100">
                        <Image src={c.image} alt="" fill sizes="56px" className="object-cover object-top" />
                      </span>
                      <div>
                        <p className="font-semibold leading-tight text-ink">{c.name}</p>
                        <p className="text-[14px] text-ink-muted">{c.role}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="t-h2">Related treatments</h2>
            <Link href="/treatments" className="link">All treatments</Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3">
            {related.map((r, i) => (
              // Two-up on tablets: drop the third so no card sits alone.
              <TreatmentCard key={r.slug} treatment={r} className={i === 2 ? "sm:max-lg:hidden" : ""} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand message={bookMessage} />

      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
