"use client";

import Image from "next/image";

const galleryImages = [
  {
    src: "https://ext.same-assets.com/3349237986/4189049444.webp",
    alt: "Team photo",
    className: "row-span-2",
  },
  {
    src: "https://ext.same-assets.com/3349237986/1117902268.webp",
    alt: "Photography session",
    className: "",
  },
  {
    src: "https://ext.same-assets.com/3349237986/2302185666.jpeg",
    alt: "X-ray analysis",
    className: "",
  },
  {
    src: "https://ext.same-assets.com/3349237986/1812034020.jpeg",
    alt: "Team collaboration",
    className: "",
  },
  {
    src: "https://ext.same-assets.com/3349237986/491121083.webp",
    alt: "Dental consultation",
    className: "",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {/* Large image on left */}
          <div className="row-span-2 gallery-item">
            <Image
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              width={600}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top right images */}
          <div className="gallery-item">
            <Image
              src={galleryImages[1].src}
              alt={galleryImages[1].alt}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="gallery-item">
            <Image
              src={galleryImages[2].src}
              alt={galleryImages[2].alt}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom right images */}
          <div className="gallery-item">
            <Image
              src={galleryImages[3].src}
              alt={galleryImages[3].alt}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="gallery-item">
            <Image
              src={galleryImages[4].src}
              alt={galleryImages[4].alt}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
