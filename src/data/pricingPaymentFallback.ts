/** Shown when the Pricing & Payment Options document is missing or fields are empty. */

export type FallbackPricingOption = {
  title: string;
  description?: string;
  price?: string;
  notes?: string;
};

export type FallbackPaymentMethod = {
  name: string;
  /** Tailwind hue for a simple placeholder tile when no CMS logo exists */
  accentClass: string;
};

export const pricingPaymentFallback = {
  pageTitle: "Pricing & payment options",
  intro:
    "Transparent pricing and flexible ways to pay. Below is sample information for illustration; your clinician will confirm exact fees at your visit.",
  callout:
    "Medical aid, card payments, and instalment options can be discussed with reception — we are happy to help you plan.",
  paymentMethodsTitle: "Payment methods we accept",
  pricingOptions: [
    {
      title: "New patient consultation",
      description:
        "Comprehensive first visit including history review and personalised care plan outline.",
      price: "From R720",
      notes: "Medical aid rules may apply; bring your membership card.",
    },
    {
      title: "Standard follow-up",
      description: "Routine review and adjustments as recommended by your provider.",
      price: "From R480",
    },
    {
      title: "Minor procedure (example)",
      description: "Illustrative line item for a small in-room procedure.",
      price: "From R1 200",
      notes: "Final cost depends on complexity and materials.",
    },
  ] satisfies FallbackPricingOption[],
  paymentMethods: [
    { name: "Visa", accentClass: "bg-blue-700" },
    { name: "Mastercard", accentClass: "bg-orange-600" },
    { name: "SnapScan", accentClass: "bg-teal-600" },
    { name: "EFT / bank transfer", accentClass: "bg-slate-600" },
  ] satisfies FallbackPaymentMethod[],
};
