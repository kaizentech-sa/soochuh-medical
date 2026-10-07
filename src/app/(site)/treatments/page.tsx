import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHead from "@/components/PageHead";
import TreatmentCard from "@/components/TreatmentCard";
import { dentalTreatments, medicalTreatments } from "@/data/treatments";

export const metadata: Metadata = {
  title: "Treatments",
  description: "Dental and medical treatments at Soochuh Medical in Diep River, explained simply with clear guide prices.",
};

const groups = [
  { id: "dentist", title: "With the dentist", items: dentalTreatments },
  { id: "doctor", title: "With the doctor", items: medicalTreatments },
];

export default function TreatmentsPage() {
  return (
    <>
      <PageHead
        title={
          <>
            Treatments, <span className="em">explained simply.</span>
          </>
        }
        intro="Every treatment in plain language, with what to expect and a guide price."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          {groups.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="btn-secondary">
              {g.title}
            </a>
          ))}
        </div>
      </PageHead>

      {groups.map((g) => (
        <section key={g.id} id={g.id} className="py-16 md:py-24">
          <div className="shell">
            <h2 className="t-h2">{g.title}</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4">
              {g.items.map((t) => (
                <TreatmentCard key={t.slug} treatment={t} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <CtaBand />
    </>
  );
}
