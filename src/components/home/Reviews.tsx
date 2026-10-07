import { reviews, siteConfig } from "@/data/site";
import { GoogleLogo, Star } from "../icons";

/**
 * The page's single marquee: breadth of voices, not one carousel slide.
 * Pauses on hover; static and swipeable under reduced motion.
 */
export default function Reviews() {
  const loop = [...reviews, ...reviews];
  return (
    <section id="reviews" className="overflow-hidden py-24 md:py-32">
      <div className="shell flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h2 data-reveal className="t-h2 max-w-[14ch]">
          Kind words <span className="em">from patients.</span>
        </h2>
        <div data-reveal className="flex items-center gap-3">
          <GoogleLogo size={28} className="text-ink" />
          <div>
            <p className="flex items-center gap-1.5 text-[17px] font-semibold text-ink">
              {siteConfig.rating.score}
              <span className="flex text-gold-500">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={15} weight="fill" />
                ))}
              </span>
            </p>
            <p className="text-[14px] text-ink-muted">{siteConfig.rating.count}+ Google reviews</p>
          </div>
        </div>
      </div>

      <div className="marquee-wrap rail mt-14 overflow-x-auto motion-safe:overflow-visible">
        <ul className="marquee flex w-max gap-4 px-5 sm:px-8">
          {loop.map((r, i) => (
            <li
              key={`${r.author}-${i}`}
              aria-hidden={i >= reviews.length}
              className="flex w-[340px] shrink-0 flex-col justify-between rounded-surface bg-mist p-7 sm:w-[400px]"
            >
              <blockquote className="text-[18px] leading-relaxed text-ink">&ldquo;{r.text}&rdquo;</blockquote>
              <p className="mt-6 text-[14px] text-ink-muted">
                <span className="font-semibold text-ink">{r.author}</span>, Google review
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
