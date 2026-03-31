"use client";

import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
};

const fallbackGalleryImages: GalleryImage[] = [
  {
    src: "https://ext.same-assets.com/3349237986/4189049444.webp",
    alt: "Team photo",
  },
  {
    src: "https://ext.same-assets.com/3349237986/1117902268.webp",
    alt: "Photography session",
  },
  {
    src: "https://ext.same-assets.com/3349237986/2302185666.jpeg",
    alt: "X-ray analysis",
  },
  {
    src: "https://ext.same-assets.com/3349237986/1812034020.jpeg",
    alt: "Team collaboration",
  },
  {
    src: "https://ext.same-assets.com/3349237986/491121083.webp",
    alt: "Dental consultation",
  },
  {
    src: "https://ext.same-assets.com/3349237986/1072601824.webp",
    alt: "Healthcare specialist portrait",
  },
  {
    src: "https://ext.same-assets.com/3349237986/63651298.webp",
    alt: "Patient consultation room",
  },
];

type GalleryProps = {
  images?: GalleryImage[];
};

function repeatToLength<T>(items: T[], targetLength: number): T[] {
  if (items.length === 0) {
    return [];
  }
  const output: T[] = [];
  while (output.length < targetLength) {
    output.push(...items);
  }
  return output.slice(0, targetLength);
}

export default function Gallery({ images = [] }: GalleryProps) {
  const galleryImages = images.length > 0 ? images : fallbackGalleryImages;
  const setBase = repeatToLength(galleryImages, 7);
  const collageSets = [
    setBase.slice(0, 7),
    [setBase[2], setBase[3], setBase[4], setBase[5], setBase[6], setBase[0], setBase[1]],
    [setBase[1], setBase[3], setBase[5], setBase[0], setBase[6], setBase[2], setBase[4]],
  ];
  const sliderSets = [...collageSets, ...collageSets];

  return (
    <section id="gallery" className="relative py-10 bg-white overflow-hidden w-full">
      <div className="gallery-slider-track px-2 md:px-4">
        {sliderSets.map((set, setIndex) => (
          <article
            key={`collage-set-${setIndex}`}
            className="gallery-collage grid grid-cols-6 grid-rows-3 gap-2 md:gap-3 flex-shrink-0 w-[760px] md:w-[980px] h-[360px] md:h-[470px]"
          >
            <div className="gallery-item relative col-start-1 col-span-2 row-start-1 row-span-2 rounded-xl overflow-hidden">
              <Image src={set[0].src} alt={set[0].alt} fill className="object-cover" />
            </div>
            <div className="gallery-item relative col-start-3 col-span-2 row-start-1 row-span-1 rounded-xl overflow-hidden">
              <Image src={set[1].src} alt={set[1].alt} fill className="object-cover" />
            </div>
            <div className="gallery-item relative col-start-3 col-span-1 row-start-2 row-span-1 rounded-xl overflow-hidden">
              <Image src={set[2].src} alt={set[2].alt} fill className="object-cover" />
            </div>
            <div className="gallery-item relative col-start-5 col-span-2 row-start-1 row-span-2 rounded-xl overflow-hidden">
              <Image src={set[3].src} alt={set[3].alt} fill className="object-cover" />
            </div>
            <div className="gallery-item relative col-start-4 col-span-1 row-start-2 row-span-2 rounded-xl overflow-hidden">
              <Image src={set[4].src} alt={set[4].alt} fill className="object-cover" />
            </div>
            <div className="gallery-item relative col-start-1 col-span-3 row-start-3 row-span-1 rounded-xl overflow-hidden">
              <Image src={set[5].src} alt={set[5].alt} fill className="object-cover" />
            </div>
            <div className="gallery-item relative col-start-5 col-span-2 row-start-3 row-span-1 rounded-xl overflow-hidden">
              <Image src={set[6].src} alt={set[6].alt} fill className="object-cover" />
            </div>
          </article>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
    </section>
  );
}
