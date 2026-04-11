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
  title: "Pricing & payment options | Soochuh Medical",
  description:
    "Pricing information and payment methods at Soochuh Medical, Newlands, Cape Town.",
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
        mainPhoneNumber={mainPhoneNumber}
        whatsappNumber={whatsappNumber}
        appointmentLink={appointmentLink}
        healthcareFields={[]}
        googleMapsShareLink={contactSectionData?.googleMapsShareLink}
      />

      <div className="pt-20">
        <section className="py-14 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-sm text-[#5a7a7f] font-medium uppercase tracking-wider mb-3">
              Patient corner
            </p>
            <h1 className="font-heading text-3xl md:text-4xl text-[#3c4f5a] font-semibold mb-4">
              {pageTitle}
            </h1>
            <div className="heading-decorator justify-center mb-8">
              <span className="bar-main" />
              <span className="bar-secondary" />
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">{intro}</p>
            {callout ? (
              <p className="mt-8 text-left md:text-center rounded-sm bg-[#eef4f5] border border-[#d0dfe2] text-[#3c4f5a] px-5 py-4 text-base leading-relaxed">
                {callout}
              </p>
            ) : null}
          </div>
        </section>

        <section className="py-14 bg-[#fafafa]">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-heading text-2xl text-[#5a7a7f] font-semibold text-center mb-10">
              Fee guide
            </h2>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pricingOptions.map((option, index) => (
                <li
                  key={`${option.title ?? "option"}-${index}`}
                  className="bg-white rounded-sm border border-gray-200 p-6 shadow-sm flex flex-col"
                >
                  <h3 className="font-heading text-lg font-semibold text-[#3c4f5a] mb-2">
                    {option.title}
                  </h3>
                  {option.description ? (
                    <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
                      {option.description}
                    </p>
                  ) : (
                    <div className="flex-1" />
                  )}
                  {option.price ? (
                    <p className="text-[#5a7a7f] font-semibold text-lg mb-1">
                      {option.price}
                    </p>
                  ) : null}
                  {option.notes ? (
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {option.notes}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-heading text-2xl text-[#5a7a7f] font-semibold text-center mb-10">
              {paymentMethodsTitle}
            </h2>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {useCmsPayments
                ? cmsPayments.map((method) => (
                    <div
                      key={method.name}
                      className="flex flex-col items-center gap-2 w-[140px]"
                    >
                      <div className="relative h-16 w-full flex items-center justify-center rounded-sm border border-gray-200 bg-white p-2">
                        <Image
                          src={urlFor(method.logo!).width(280).height(140).fit("max").url()}
                          alt={method.name ?? "Payment method"}
                          width={200}
                          height={80}
                          className="max-h-12 w-auto object-contain"
                        />
                      </div>
                      <span className="text-xs text-center text-gray-600">
                        {method.name}
                      </span>
                    </div>
                  ))
                : pricingPaymentFallback.paymentMethods.map((method) => (
                    <div
                      key={method.name}
                      className="flex flex-col items-center gap-2 w-[140px]"
                    >
                      <div
                        className={`h-16 w-full rounded-sm flex items-center justify-center text-white text-sm font-semibold shadow-sm ${method.accentClass}`}
                      >
                        {method.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-xs text-center text-gray-600">
                        {method.name}
                      </span>
                    </div>
                  ))}
            </div>
            {!useCmsPayments ? (
              <p className="text-center text-sm text-gray-500 mt-8 max-w-xl mx-auto">
                Upload payment logos in Sanity Studio under{" "}
                <strong>Pricing &amp; Payment Page</strong> to replace these
                placeholders.
              </p>
            ) : null}
          </div>
        </section>

        <section className="py-10 bg-[#fafafa] border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <Link
              href="/"
              className="text-[#5a7a7f] font-medium hover:text-[#3c4f5a] underline-offset-4 hover:underline"
            >
              ← Back to home
            </Link>
          </div>
        </section>

        <Footer />
      </div>

      <ContactBar
        mainPhoneNumber={mainPhoneNumber}
        whatsappNumber={whatsappNumber}
      />
    </main>
  );
}
