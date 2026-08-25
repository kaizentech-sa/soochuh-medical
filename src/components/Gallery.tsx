"use client";

import Image from "next/image";

type GalleryImage = { src: string; alt: string };
type GalleryProps = { images?: GalleryImage[] };

/**
 * Deliberately no fallback imagery. This section claims to show the inside of
 * the practice, so stock photography here would misrepresent it. Upload real
 * photographs in the Studio and the strip appears.
 */
export default function Gallery({ images = [] }: GalleryProps) {
  if (images.length === 0) return null;

  // Duplicate the set so the marquee loops seamlessly at -50%.
  const track = [...images, ...images];

  return (
    <section id="gallery" className="relative w-full overflow-hidden bg-bone py-20">
      <div className="shell mb-10">
        <p className="eyebrow fade-in-up">Inside the practice</p>
      </div>

      <div className="marquee-track">
        {track.map((image, i) => (
          <figure
            key={`${image.src}-${i}`}
            className={`img-zoom relative shrink-0 overflow-hidden rounded-[6px] bg-bone-deep ${
              i % 3 === 0
                ? "h-[300px] w-[220px] md:h-[420px] md:w-[300px]"
                : i % 3 === 1
                  ? "h-[240px] w-[320px] md:h-[330px] md:w-[460px]"
                  : "h-[270px] w-[270px] md:h-[380px] md:w-[380px]"
            }`}
          >
            <Image src={image.src} alt={image.alt} fill sizes="460px" className="object-cover" />
          </figure>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bone to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bone to-transparent" />
    </section>
  );
}
