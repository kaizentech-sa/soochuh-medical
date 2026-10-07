import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";

/*
  One family, used with intent: Instrument Sans carries both the bold display
  headlines and the body. Emphasis is its own italic, never a second typeface.
*/
const sans = Instrument_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Soochuh Medical | Doctor & Dentist in Diep River, Cape Town",
    template: "%s | Soochuh Medical",
  },
  description:
    "A doctor and dentist under one roof at 208A Main Road, Diep River, Cape Town. Gentle dentistry, family medicine, clear prices and easy booking by WhatsApp or phone.",
  keywords: [
    "dentist Diep River",
    "doctor Diep River",
    "GP Diep River",
    "dentist Cape Town Southern Suburbs",
    "nervous patient dentist Cape Town",
    "sedation dentist Cape Town",
  ],
  metadataBase: new URL("https://soochuhmedical.co.za"),
  openGraph: {
    title: "Soochuh Medical | Doctor & Dentist in Diep River, Cape Town",
    description:
      "A warm, welcoming practice where a doctor and dentist work under one roof. Book on WhatsApp or by phone.",
    locale: "en_ZA",
    type: "website",
  },
  icons: { icon: "/Untitled design.svg" },
};

export const viewport: Viewport = {
  themeColor: "#FCFDFB",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "Dentist"],
  name: siteConfig.name,
  telephone: siteConfig.phoneIntl,
  email: siteConfig.email,
  url: "https://soochuhmedical.co.za",
  priceRange: "R450-R18,000",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.line1,
    addressLocality: siteConfig.address.line2,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: "ZA",
  },
  openingHoursSpecification: siteConfig.hours
    .filter((h) => h.opens)
    .map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.schema, opens: h.opens, closes: h.closes })),
  sameAs: [siteConfig.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" className={sans.variable} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint so the hero can pre-hide. */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: one-line class flag
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
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
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded-control focus:bg-forest-800 focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
