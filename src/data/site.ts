/**
 * Single source of truth for practice facts.
 *
 * Everything marked VERIFIED was confirmed against a public source in
 * Aug 2026. Everything marked CONFIRM is a placeholder the practice still
 * needs to sign off — it is deliberately conservative rather than invented.
 */

export const siteConfig = {
  name: "Soochuh Medical",
  // VERIFIED — @soochuh_medical Instagram bio
  tagline: "A good Soochuh keeps bonds together forever",
  positioning: "Medical & dental care under one roof",

  // VERIFIED — Nabs Dental Facebook, 5 Sep 2024 + Medpages/RecoMed listings
  address: {
    line1: "208A Main Road",
    line2: "Diep River",
    city: "Cape Town",
    region: "Western Cape",
    country: "South Africa",
  },
  addressText: "208A Main Road, Diep River, Cape Town",

  // VERIFIED — practice contact number listed for Dr Nordien
  phone: "064 534 6882",
  phoneIntl: "+27 64 534 6882",
  whatsapp: "27645346882",

  // CONFIRM — no public practice email found; placeholder only
  email: "",

  instagram: "https://www.instagram.com/soochuh_medical/",
  // CONFIRM — soochuh.com returned HTTP 404 in Aug 2026
  scrubsUrl: "https://www.soochuh.com/",

  // CONFIRM — opening hours not published anywhere public
  hours: [] as { days: string; time: string }[],
} as const;

export type Practitioner = {
  name: string;
  credentials?: string;
  role: string;
  discipline: "medical" | "dental" | "practice";
  bio: string;
  instagram?: string;
};

/** VERIFIED names, credentials and disciplines. Bios are CONFIRM placeholders. */
export const practitioners: Practitioner[] = [
  {
    name: "Dr Nabeelah Nordien",
    credentials: "BChD, PDD (Aesthetics)",
    role: "Dentist",
    discipline: "dental",
    bio:
      "Dr Nabeelah Nordien practises general and aesthetic dentistry at Soochuh Medical, with a postgraduate diploma in aesthetics and a focus on restorative and cosmetic treatment.",
    instagram: "https://www.instagram.com/dr_nabs_dentistry/",
  },
  {
    name: "Dr Nadia Pietersen",
    credentials: "MBChB",
    role: "General Practitioner",
    discipline: "medical",
    bio:
      "Dr Nadia Pietersen is a general practitioner who qualified at Stellenbosch University. She sees patients for general medical consultations, family care and women's health.",
    instagram: "https://www.instagram.com/drnadiapietersen/",
  },
];

/** CONFIRM — service list drawn from the practice's public posts; not a price list. */
export const dentalServices = [
  { title: "General dentistry", blurb: "Check-ups, fillings, extractions and everyday dental care." },
  { title: "Aesthetic dentistry", blurb: "Composite bonding, veneers and smile design." },
  { title: "Root canal treatment", blurb: "Endodontic treatment to save a compromised tooth." },
  { title: "Oral hygiene", blurb: "Scaling, polishing and preventive maintenance." },
  { title: "Teeth whitening", blurb: "Professionally supervised in-practice whitening." },
  { title: "Crowns & restorations", blurb: "Rebuilding damaged or worn teeth." },
];

export const medicalServices = [
  { title: "General consultations", blurb: "Acute illness, chronic care and referrals." },
  { title: "Women's health", blurb: "Screening, contraception and routine gynaecological care." },
  { title: "Family medicine", blurb: "Care for every age, from infants to grandparents." },
  { title: "Chronic care", blurb: "Ongoing management of long-term conditions." },
];

export function telHref(number: string) {
  return `tel:${number.replace(/\s+/g, "")}`;
}

export function whatsAppHref(number: string) {
  return `https://wa.me/${number.replace(/\D+/g, "")}`;
}
