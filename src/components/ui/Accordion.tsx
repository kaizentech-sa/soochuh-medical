import type { Faq } from "@/data/site";
import { Plus } from "../icons";

type AccordionProps = { items: Faq[]; openFirst?: boolean };

/** Native <details>: works without JavaScript and with a keyboard. */
export default function Accordion({ items, openFirst = false }: AccordionProps) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => (
        <details key={item.q} className="acc group" open={openFirst && i === 0}>
          <summary className="flex items-center justify-between gap-6 py-6">
            <span className="text-[18px] font-semibold leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-forest-700">
              {item.q}
            </span>
            <span className="acc-icon grid h-9 w-9 shrink-0 place-items-center rounded-full bg-mist text-forest-800">
              <Plus size={16} weight="bold" />
            </span>
          </summary>
          <p className="max-w-[60ch] pb-7 pr-12 text-ink-soft">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
