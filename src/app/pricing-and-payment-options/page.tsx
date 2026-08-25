import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactBar from "@/components/ContactBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { pricingPaymentFallback } from "@/data/pricingPaymentFallback";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";

export const metadata: Metadata = {
  // The root layout appends "| Soochuh Medical" via the title template.
  title: "Pricing & payment options",
  description:
    "Pricing information and payment methods at Soochuh Medical, 208A Main Road, Diep River, Cape Town.",
};

type ContactSectionHeader = {
  phoneNumbers?: { label?: string; number: string; isMain?: boolean }[];
  whatsappNumber?: string;
  googleMapsShareLink?: string;
} | null;

type PricingPaymentDoc = {
  pageTitle?: string;
  intro?: string;
  callout?: string;
  paymentMethodsTitle?: string;
  pricingOptions?: {
    title?: string;
    description?: string;
    price?: string;
    notes?: string;
  }[];
  paymentMethods?: { name?: string; logo?: any }[];
} | null;

async function getContactForHeader() {
  return client.fetch<ContactSectionHeader>(
    `*[_type == "contactSection" && _id == "contactSection"][0]{
      phoneNumbers[]{ label, number, isMain },
      whatsappNumber,
      googleMapsShareLink
    }`,
  );
}

async function getAppointmentLink() {
  const row = await client.fetch<{ appointmentLink?: string } | null>(
    `*[_type == "appointmentSettings" && _id == "appointmentSettings"][0]{ appointmentLink }`,
  );
  return row?.appointmentLink;
}

async function getPricingPaymentPage() {
  return client.fetch<PricingPaymentDoc>(
    `*[_type == "pricingPaymentPage" && _id == "pricingPaymentPage"][0]{
      pageTitle,
      intro,
      callout,
      paymentMethodsTitle,
      pricingOptions[]{ title, description, price, notes },
      paymentMethods[]{ name, "logo": logo.asset }
    }`,
  );
}

export default async function PricingAndPaymentOptionsPage() {
  const [contactSectionData, appointmentLink, pricingDoc] = await Promise.all([
    getContactForHeader(),
    getAppointmentLink(),
    getPricingPaymentPage(),
  ]);

  const contactPhones = contactSectionData?.phoneNumbers ?? [];
  const selectedMainPhone = contactPhones.find((phone) => phone.isMain)?.number;
  const mainPhoneNumber = selectedMainPhone || contactPhones[0]?.number;
  const whatsappNumber = contactSectionData?.whatsappNumber;

  const pageTitle =
    pricingDoc?.pageTitle?.trim() || pricingPaymentFallback.pageTitle;
  const intro = pricingDoc?.intro?.trim() || pricingPaymentFallback.intro;
  const callout =
    pricingDoc?.callout?.trim() || pricingPaymentFallback.callout;
  const paymentMethodsTitle =
    pricingDoc?.paymentMethodsTitle?.trim() ||
    pricingPaymentFallback.paymentMethodsTitle;

  const cmsOptions =
    pricingDoc?.pricingOptions?.filter((o) => o.title?.trim()) ?? [];
  const pricingOptions =
    cmsOptions.length > 0 ? cmsOptions : pricingPaymentFallback.pricingOptions;

  const cmsPayments =
    pricingDoc?.paymentMethods?.filter((p) => p.name?.trim() && p.logo) ?? [];
  const useCmsPayments = cmsPayments.length > 0;

  return (
    <main className="min-h-screen">
      <Header
        solid
        mainPhoneNumber={mainPhoneNumber}
        whatsappNumber={whatsappNumber}
        appointmentLink={appointmentLink}
        healthcareFields={[]}
        googleMapsShareLink={contactSectionData?.googleMapsShareLink}
      />

      <div id="main" className="pt-28 md:pt-32">
        {/* Page head */}
        <section className="bg-bone pb-16 pt-10 md:pb-24">
          <div className="shell max-w-3xl">
            <p className="eyebrow">Patients</p>
            <h1 className="display-lg mt-5 font-display">{pageTitle}</h1>
            <div className="rule mt-8" />
            <p className="lede mt-8">{intro}</p>
            {callout ? (
              <p className="mt-8 border-l-2 border-teal-500 bg-teal-50 px-6 py-5 font-sans font-light leading-relaxed text-teal-900">
                {callout}
              </p>
            ) : null}
          </div>
        </section>

        {/* Fee guide */}
        <section className="border-t border-[color:var(--line)] bg-white py-20 md:py-28">
          <div className="shell">
            <p className="eyebrow">Fee guide</p>
            <div className="rule mt-6" />
            <ul className="mt-2">
              {pricingOptions.map((option, index) => (
                <li
                  key={`${option.title ?? "option"}-${index}`}
                  className="grid grid-cols-[auto_1fr] items-start gap-6 border-b border-[color:var(--line)] py-8 md:grid-cols-[auto_minmax(0,20rem)_1fr_auto] md:items-baseline md:gap-10"
                >
                  <span className="font-sans text-[11px] tabular-nums tracking-eyebrow text-teal-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-2xl text-ink">{option.title}</h2>
                  <div className="col-span-2 md:col-span-1">
                    {option.description ? (
                      <p className="font-sans text-[15px] font-light text-ink-muted">
                        {option.description}
                      </p>
                    ) : null}
                    {option.notes ? (
                      <p className="mt-2 font-sans text-[13px] font-light text-ink-muted/80">
                        {option.notes}
                      </p>
                    ) : null}
                  </div>
                  {option.price ? (
                    <p className="col-span-2 font-display text-xl text-teal-700 md:col-span-1 md:text-right">
                      {option.price}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Payment methods */}
        <section className="bg-bone py-20 md:py-28">
          <div className="shell">
            <p className="eyebrow">{paymentMethodsTitle}</p>
            <div className="mt-10 flex flex-wrap gap-6">
              {useCmsPayments
                ? cmsPayments.map((method) => (
                    <div key={method.name} className="flex w-[150px] flex-col items-center gap-3">
                      <div className="grid h-20 w-full place-items-center border border-[color:var(--line)] bg-white p-3">
                        <Image
                          src={urlFor(method.logo!).width(280).height(140).fit("max").url()}
                          alt={method.name ?? "Payment method"}
                          width={200}
                          height={80}
                          className="max-h-12 w-auto object-contain"
                        />
                      </div>
                      <span className="text-center font-sans text-[12px] text-ink-muted">
                        {method.name}
                      </span>
                    </div>
                  ))
                : pricingPaymentFallback.paymentMethods.map((method) => (
                    <div key={method.name} className="flex w-[150px] flex-col items-center gap-3">
                      <div className="grid h-20 w-full place-items-center border border-dashed border-teal-200 bg-white font-display text-2xl text-teal-300">
                        {method.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-center font-sans text-[12px] text-ink-muted">
                        {method.name}
                      </span>
                    </div>
                  ))}
            </div>
            {!useCmsPayments ? (
              <p className="mt-8 max-w-xl font-sans text-[13px] font-light text-ink-muted">
                Placeholders. Upload payment logos in Sanity Studio under{" "}
                <strong className="font-medium">Pricing &amp; Payment Page</strong> to replace them.
              </p>
            ) : null}
          </div>
        </section>

        {/* Close */}
        <section className="border-t border-[color:var(--line)] bg-white py-16">
          <div className="shell flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <p className="max-w-md font-display text-2xl text-ink">
              Still not sure what a visit will cost? Ask us before you book.
            </p>
            <div className="flex gap-3">
              <Link href="/#contact" className="btn-primary">Get in touch</Link>
              <Link href="/" className="btn-outline">Back to home</Link>
            </div>
          </div>
        </section>

        <Footer googleMapsShareLink={contactSectionData?.googleMapsShareLink} />
      </div>

      <ContactBar
        mainPhoneNumber={mainPhoneNumber}
        whatsappNumber={whatsappNumber}
        appointmentLink={appointmentLink}
      />
    </main>
  );
}
