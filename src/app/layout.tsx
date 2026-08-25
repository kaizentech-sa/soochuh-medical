import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: {
    default: "Soochuh Medical | Doctor & Dentist in Diep River, Cape Town",
    template: "%s | Soochuh Medical",
  },
  description:
    "Soochuh Medical is a women-led medical and dental practice at 208A Main Road, Diep River, Cape Town. General practice, family medicine, general and aesthetic dentistry under one roof.",
  keywords: [
    "dentist Diep River",
    "dentist Cape Town",
    "GP Diep River",
    "aesthetic dentistry Cape Town",
    "women-led medical practice Cape Town",
  ],
  metadataBase: new URL("https://soochuhmedical.co.za"),
  openGraph: {
    title: "Soochuh Medical | Doctor & Dentist in Diep River, Cape Town",
    description:
      "A women-led medical and dental practice in Diep River, Cape Town. Unhurried care, modern dentistry, one address.",
    locale: "en_ZA",
    type: "website",
  },
  icons: { icon: "/Untitled design.svg" },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "Dentist"],
  name: siteConfig.name,
  telephone: siteConfig.phoneIntl,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.line1,
    addressLocality: siteConfig.address.line2,
    addressRegion: siteConfig.address.region,
    addressCountry: "ZA",
  },
  sameAs: [siteConfig.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/*
          Jost stands in for Futura PT (the geometric sans that gives the
          reference clinics their calm, modern voice); Fraunces adds the
          editorial warmth the brand needs as a women-led practice.
        */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..500&family=Jost:ital,wght@0,300..600;1,300..400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:bg-teal-900 focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
