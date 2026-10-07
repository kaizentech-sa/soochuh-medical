import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy & POPIA",
  robots: { index: false },
};

/** DRAFT: a plain-language POPIA notice for the practice (and its lawyer) to review. */
export default function PrivacyPage() {
  return (
    <>
      <PageHead title="Privacy & POPIA" intro="How we look after your personal and health information." />
      <section className="py-16 md:py-24">
        <div className="shell max-w-3xl space-y-6 text-[17px] leading-[1.8]">
          <p>
            Soochuh Medical respects your privacy and handles your personal and health information in line
            with the Protection of Personal Information Act (POPIA) and the HPCSA's rules on confidentiality.
          </p>
          <h2 className="t-h3 pt-4">What we collect</h2>
          <p>
            Your contact details, medical aid details and the health information you share with us or that
            we record during your care. If you message us on WhatsApp, we keep that conversation as part
            of your booking record.
          </p>
          <h2 className="t-h3 pt-4">How we use it</h2>
          <p>
            Only to provide your care, manage appointments, submit medical aid claims and meet our legal
            obligations. We never sell your information or use it for unrelated marketing.
          </p>
          <h2 className="t-h3 pt-4">Your rights</h2>
          <p>
            You may ask to see or correct the information we hold about you at any time. Contact us on{" "}
            {siteConfig.phone} or {siteConfig.email}.
          </p>
        </div>
      </section>
    </>
  );
}
