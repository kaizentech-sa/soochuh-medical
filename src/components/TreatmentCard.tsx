import Image from "next/image";
import Link from "next/link";
import { type Treatment, treatmentHref } from "@/data/treatments";
import { ArrowRight } from "./icons";

/**
 * Portrait photo card from `sm` up; a compact thumbnail row on phones so a
 * long list stays short.
 */
export default function TreatmentCard({ treatment, className = "" }: { treatment: Treatment; className?: string }) {
  return (
    <Link href={treatmentHref(treatment)} className={`group flex items-center gap-4 sm:block ${className}`}>
      <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-control bg-forest-100 sm:aspect-[4/5] sm:w-auto sm:rounded-surface">
        <Image
          src={treatment.image}
          alt={treatment.imageAlt}
          fill
          sizes="(max-width: 640px) 96px, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
        />
      </div>
      <div className="min-w-0 flex-1 sm:mt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.015em] text-ink sm:text-[19px]">{treatment.name}</h3>
          <span className="shrink-0 text-[15px] font-semibold text-forest-800">{treatment.price.from}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-[14px] text-ink-muted sm:mt-1.5 sm:text-[15px]">{treatment.summary}</p>
      </div>
      <ArrowRight size={18} className="shrink-0 text-forest-800 sm:hidden" />
    </Link>
  );
}
