/**
 * Single source of truth for practice facts.
 *
 * VERIFIED : confirmed against a public source (Aug 2026).
 * DRAFT    : written or assumed by us as a sensible default. The practice
 *             has agreed to review these; see docs/client-follow-up.md.
 */

export const siteConfig = {
  name: "Soochuh Medical",
  // VERIFIED: @soochuh_medical Instagram bio
  tagline: "A good Soochuh keeps bonds together forever",
  positioning: "A doctor and dentist under one roof",

  // VERIFIED
  address: {
    line1: "208A Main Road",
    line2: "Diep River",
    city: "Cape Town",
    postalCode: "7800",
    region: "Western Cape",
    country: "South Africa",
  },
  addressText: "208A Main Road, Diep River, Cape Town",
  mapsQuery: "208A Main Road, Diep River, Cape Town, 7800",

  // VERIFIED
  phone: "064 534 6882",
  phoneIntl: "+27 64 534 6882",
  whatsapp: "27645346882",

  // DRAFT: no public practice email found
  email: "hello@soochuhmedical.co.za",

  instagram: "https://www.instagram.com/soochuh_medical/",

  // DRAFT: opening hours
  hours: [
    { days: "Monday to Friday", short: "Mon-Fri", time: "08:00 - 17:00", opens: "08:00", closes: "17:00", schema: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
    { days: "Saturday", short: "Sat", time: "08:30 - 13:00", opens: "08:30", closes: "13:00", schema: ["Saturday"] },
    { days: "Sunday & public holidays", short: "Sun", time: "Closed", opens: null, closes: null, schema: [] },
  ],

  // DRAFT: how bookings work
  booking: {
    whatsappReply: "We reply within 15 minutes during opening hours.",
    whatsappTip:
      "Send your name, whether you'd like to see the doctor or the dentist, and a few days and times that suit you.",
    emergency:
      "In pain? Tell us when you message. We keep same-day slots open for dental and medical emergencies.",
  },

  // DRAFT: headline review figures (replace with live Google data)
  rating: { score: "4.9", count: 120, source: "Google" },
} as const;

/** Pre-filled WhatsApp message so nervous patients don't face a blank box. */
export const defaultWhatsAppMessage =
  "Hi Soochuh Medical, I'd like to book an appointment.";

export type Practitioner = {
  slug: string;
  name: string;
  shortName: string;
  credentials: string;
  role: string;
  discipline: "medical" | "dental";
  image: string;
  imageAlt: string;
  /** Short line shown under the name. */
  focus: string;
  bio: string[];
  facts: { label: string; value: string }[];
  instagram?: string;
};

/**
 * Names, credentials and disciplines are VERIFIED. Portraits are stock
 * placeholders; bios, years and interests are DRAFT.
 */
export const practitioners: Practitioner[] = [
  {
    slug: "dr-nabeelah-nordien",
    name: "Dr Nabeelah Nordien",
    shortName: "Dr Nordien",
    credentials: "BChD, PDD (Aesthetics)",
    role: "Dentist",
    discipline: "dental",
    image:
      "https://images.unsplash.com/photo-1677195063105-276fd4b95b21?auto=format&fit=crop&w=1000&h=1200&q=80",
    imageAlt: "Portrait placeholder for Dr Nabeelah Nordien",
    focus: "Gentle general dentistry, nervous patients and natural-looking cosmetic work.",
    bio: [
      "Dr Nordien has spent close to a decade looking after families in Cape Town. Many of her patients arrive after years of avoiding the dentist, so she works at your pace: she explains each step before she starts, and you can ask her to stop at any time.",
      "She holds a postgraduate diploma in aesthetic dentistry and enjoys restoring worn or broken teeth so they look like your own.",
    ],
    facts: [
      { label: "Qualifications", value: "BChD, PDD (Aesthetics)" },
      { label: "Experience", value: "9+ years" },
      { label: "Special interests", value: "Anxious patients, children, cosmetic dentistry" },
      { label: "Languages", value: "English, Afrikaans" },
    ],
    instagram: "https://www.instagram.com/dr_nabs_dentistry/",
  },
  {
    slug: "dr-nadia-pietersen",
    name: "Dr Nadia Pietersen",
    shortName: "Dr Pietersen",
    credentials: "MBChB (Stellenbosch)",
    role: "General Practitioner",
    discipline: "medical",
    image:
      "https://images.unsplash.com/photo-1734002886107-168181bcd6a1?auto=format&fit=crop&w=1000&h=1200&q=80",
    imageAlt: "Portrait placeholder for Dr Nadia Pietersen",
    focus: "Family medicine, women's health, chronic care and in-room sedation.",
    bio: [
      "Dr Pietersen is a family doctor who qualified at Stellenbosch University. She sees everyone from babies to grandparents, and is known for taking the time to properly explain what is going on.",
      "She also looks after sedation and anaesthesia for dental patients in our rooms, so the person keeping you comfortable is a doctor you have already met.",
    ],
    facts: [
      { label: "Qualifications", value: "MBChB (Stellenbosch)" },
      { label: "Experience", value: "10+ years" },
      { label: "Special interests", value: "Women's health, chronic care, sedation" },
      { label: "Languages", value: "English, Afrikaans" },
    ],
    instagram: "https://www.instagram.com/drnadiapietersen/",
  },
];

export type Review = { text: string; author: string; when: string };

/**
 * PLACEHOLDER REVIEWS: written by us to show the layout. HPCSA rules only
 * allow genuine, unsolicited patient reviews, so these MUST be replaced with
 * real Google reviews (or removed) before the site goes live.
 */
export const reviews: Review[] = [
  { text: "I hadn't seen a dentist in six years because of nerves. Dr Nordien explained everything first and let me take breaks.", author: "Thandiwe M.", when: "2 weeks ago" },
  { text: "Booked on WhatsApp and seen the same afternoon. A doctor and dentist in one place is a huge help with three kids.", author: "Riaan V.", when: "1 month ago" },
  { text: "They told me the cost up front and wrote it down. No surprises at the end.", author: "Fatima A.", when: "1 month ago" },
  { text: "Dr Pietersen listened properly and never rushed me. I felt genuinely looked after.", author: "Lauren K.", when: "2 months ago" },
  { text: "My son was terrified of fillings. The team made it feel easy, and now he wants to go back.", author: "Ashraf S.", when: "3 months ago" },
];

export type Faq = { q: string; a: string };

/** DRAFT: general questions shown on the home page. */
export const generalFaqs: Faq[] = [
  {
    q: "I'm really nervous about the dentist. Can you help?",
    a: "Yes, and you're not alone. Tell us when you book. We'll give you a longer appointment, explain everything before we start, agree on a signal to stop, and go at your pace. If you need more help, we offer sedation in our rooms.",
  },
  {
    q: "Do you accept medical aid?",
    a: "We charge private rates. You pay on the day, and we send the claim to your medical aid for you so they can refund you according to your plan. We can also give you treatment codes beforehand so you can check your cover.",
  },
  {
    q: "How do I book?",
    a: "Call us or send a WhatsApp, whichever is easier. Tell us your name, whether you'd like to see the doctor or the dentist, and when suits you. We reply within 15 minutes during opening hours.",
  },
  {
    q: "Will I know the cost before treatment?",
    a: "Always. After your check-up we give you a written plan with the costs for each step. Nothing is done without your OK. Our guide prices are listed on the Fees page.",
  },
  {
    q: "Do you see children?",
    a: "Yes. Both our doctor and dentist see children. We recommend a first dental visit by your child's first birthday, and we make it short, gentle and fun.",
  },
  {
    q: "What if I have an emergency?",
    a: "WhatsApp or call us as soon as you can. We keep same-day slots for toothache, swelling, broken teeth and urgent medical problems. If it's life-threatening, call 10177 or go to your nearest emergency unit.",
  },
  {
    q: "Is there parking?",
    a: "Yes, there is street parking on Main Road and nearby side streets. We are a short walk from Diep River station.",
  },
];

export function telHref(number: string) {
  return `tel:${number.replace(/\s+/g, "")}`;
}

export function whatsAppHref(number: string = siteConfig.whatsapp, message?: string) {
  const base = `https://wa.me/${number.replace(/\D+/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mapsHref() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.mapsQuery)}`;
}
