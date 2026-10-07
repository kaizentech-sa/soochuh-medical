/**
 * Fees, medical aid and payment: all DRAFT, pending the practice's review.
 * Treatment prices live on each treatment in ./treatments so they are only
 * written once; this file holds the extras and the money policies.
 */

export const feeExtras = [
  { name: "Emergency consultation (dental or medical)", price: "R650" },
  { name: "Single X-ray", price: "R250" },
  { name: "Full-mouth panoramic X-ray", price: "R650" },
  { name: "Fissure sealants (per tooth)", price: "R380" },
  { name: "Night guard / grinding splint", price: "R2,800" },
  { name: "Sick note (with consultation)", price: "No extra charge" },
];

export const medicalAid = {
  summary:
    "We are a private-rate practice. You pay on the day, and we submit the claim to your medical aid for you. They then refund you directly, according to your plan.",
  points: [
    "We submit claims to all major South African medical schemes.",
    "Ask us for treatment codes before your visit to check your cover.",
    "For bigger treatment, we help you get pre-authorisation.",
  ],
  schemes: [
    "Discovery Health",
    "Bonitas",
    "Momentum Health",
    "Medshield",
    "Fedhealth",
    "Bestmed",
    "GEMS",
    "Profmed",
    "Polmed",
    "CompCare",
  ],
};

export const paymentMethods = [
  "Card (Visa, Mastercard)",
  "Tap to pay",
  "SnapScan & Zapper",
  "EFT",
  "Cash",
];

export const paymentPlan = {
  title: "Spread the cost",
  text: "Treatment over R5,000? You can split it into up to three interest-free monthly payments, on approval. Just ask us.",
};

export const feePromises = [
  { title: "Prices before we begin", text: "You get a written quote after your consultation. Nothing is done without your OK." },
  { title: "No surprise extras", text: "If something changes during treatment, we stop and talk to you first." },
  { title: "Help with your medical aid", text: "We send the claim for you and give you the codes to check your cover." },
];
