import { siteConfig } from "@/data/site";
import { Clock, GoogleLogo, Receipt, ShieldCheck } from "../icons";

/* Mock figure until the practice connects its Google profile (see docs/client-follow-up.md). */
const items = [
  { icon: GoogleLogo, title: `${siteConfig.rating.score} on Google`, text: `From ${siteConfig.rating.count}+ patient reviews` },
  { icon: ShieldCheck, title: "Medical aid, handled", text: "We send the claim for you" },
  { icon: Receipt, title: "Prices in writing", text: "Before any treatment starts" },
  { icon: Clock, title: "Same-day emergencies", text: "Toothache or a sick child" },
];

/** Trust signals live here, directly under the hero, not inside it. */
export default function ProofStrip() {
  return (
    <section aria-label="Why patients trust us" className="border-y border-line">
      <ul className="shell grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {items.map(({ icon: Icon, title, text }, i) => (
          <li
            key={title}
            data-reveal
            className={[
              "flex items-start gap-4 py-6 sm:py-8",
              i > 0 ? "border-t border-line sm:border-t-0" : "",
              i % 2 === 1 ? "sm:border-l sm:border-line sm:pl-8" : "",
              i >= 2 ? "sm:border-t xl:border-t-0" : "",
              i === 2 ? "xl:border-l xl:pl-8" : "",
            ].join(" ")}
          >
            <Icon size={26} className="mt-0.5 shrink-0 text-forest-800" />
            <div>
              <p className="font-semibold leading-snug text-ink">{title}</p>
              <p className="mt-0.5 text-[15px] text-ink-muted">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
