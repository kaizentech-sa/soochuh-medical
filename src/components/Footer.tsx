import Link from "next/link";
import { mapsHref, siteConfig, telHref, whatsAppHref } from "@/data/site";
import { dentalTreatments, medicalTreatments, treatmentHref } from "@/data/treatments";
import Logo from "./ui/Logo";
import { InstagramLogo, WhatsappLogo } from "./icons";

/** Light footer: the page keeps one theme top to bottom. */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-mist">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-[30ch] text-[15px] text-ink-soft">
            A doctor and dentist under one roof, on Main Road in Diep River, Cape Town.
          </p>
          <p className="mt-4 text-[15px] italic text-forest-800">&ldquo;{siteConfig.tagline}&rdquo;</p>
          <div className="mt-6 flex gap-2">
            <a href={whatsAppHref()} target="_blank" rel="noreferrer" aria-label="WhatsApp Soochuh Medical" className="grid h-11 w-11 place-items-center rounded-control bg-paper text-forest-800 transition-colors hover:bg-forest-100">
              <WhatsappLogo size={20} weight="fill" />
            </a>
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" aria-label="Soochuh Medical on Instagram" className="grid h-11 w-11 place-items-center rounded-control bg-paper text-forest-800 transition-colors hover:bg-forest-100">
              <InstagramLogo size={20} />
            </a>
          </div>
        </div>

        <nav aria-label="Treatments" className="grid grid-cols-2 gap-8 lg:col-span-5">
          <FooterList title="Dentist" items={dentalTreatments.map((t) => ({ label: t.name, href: treatmentHref(t) }))} />
          <FooterList title="Doctor" items={medicalTreatments.map((t) => ({ label: t.name, href: treatmentHref(t) }))} />
        </nav>

        <div className="lg:col-span-3">
          <p className="text-[14px] font-semibold text-ink">Visit</p>
          <address className="mt-3 not-italic text-[15px] text-ink-soft">
            {siteConfig.address.line1}, {siteConfig.address.line2}
            <br />
            {siteConfig.address.city}
          </address>
          <a href={mapsHref()} target="_blank" rel="noreferrer" className="link mt-2 text-[15px]">
            Get directions
          </a>
          <a href={telHref(siteConfig.phone)} className="mt-6 block text-[20px] font-semibold tracking-[-0.01em] text-ink hover:text-forest-700">
            {siteConfig.phone}
          </a>
          <ul className="mt-4 space-y-1 text-[14px] text-ink-soft">
            {siteConfig.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.short}</span>
                <span className="font-medium text-ink">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-3 py-6 pb-28 text-[14px] text-ink-muted md:flex-row md:justify-between md:pb-6">
          <p>&copy; {year} Soochuh Medical</p>
          <p className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/fees" className="hover:text-ink">Fees & medical aid</Link>
            <Link href="/privacy" className="hover:text-ink">Privacy & POPIA</Link>
            <span>Emergency: call 10177</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-[14px] font-semibold text-ink">{title}</p>
      <ul className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-[15px] text-ink-soft transition-colors hover:text-forest-800">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
