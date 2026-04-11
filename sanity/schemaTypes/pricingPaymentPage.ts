import { defineField, defineType } from "sanity";

export const pricingPaymentPageType = defineType({
  name: "pricingPaymentPage",
  title: "Pricing & Payment Options",
  type: "document",
  initialValue: () => ({
    pageTitle: "Pricing & payment options",
    intro:
      "Transparent pricing and flexible ways to pay. Below is a sample of common services; final quotes are confirmed at your consultation.",
    callout:
      "Medical aid claims and payment plans can be discussed with our front desk team.",
    paymentMethodsTitle: "Payment methods we accept",
    pricingOptions: [
      {
        _type: "pricingOption",
        title: "General consultation",
        description: "Initial assessment and treatment planning with a clinician.",
        price: "From R650",
        notes: "Duration approx. 30–45 minutes.",
      },
      {
        _type: "pricingOption",
        title: "Follow-up visit",
        description: "Review appointment and progress check.",
        price: "From R450",
        notes: "Subject to treatment type.",
      },
      {
        _type: "pricingOption",
        title: "After-hours emergency consult",
        description: "Urgent care when the practice offers emergency slots.",
        price: "From R950",
        notes: "Availability and rates confirmed when you call.",
      },
    ],
  }),
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      description: "Short text shown under the page title.",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "callout",
      title: "Highlight banner (optional)",
      description: "Optional callout, e.g. medical aid or payment plans.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "pricingOptions",
      title: "Pricing options",
      description: "List services or fee items visitors should see.",
      type: "array",
      of: [
        defineField({
          name: "pricingOption",
          title: "Pricing option",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "price",
              title: "Price / range",
              description: 'Free text, e.g. "From R850" or "POA".',
              type: "string",
            }),
            defineField({
              name: "notes",
              title: "Footnotes",
              description: "Optional extra detail under the price.",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "title", price: "price" },
            prepare({ title, price }) {
              return {
                title: title || "Option",
                subtitle: price || undefined,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "paymentMethodsTitle",
      title: "Payment methods section title",
      type: "string",
    }),
    defineField({
      name: "paymentMethods",
      title: "Payment method logos",
      description: "Upload logos for cards, medical aid, or other payment brands.",
      type: "array",
      of: [
        defineField({
          name: "paymentMethod",
          title: "Payment method",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              description: "Used for accessibility and when no logo is set.",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "name", media: "logo" },
          },
        }),
      ],
    }),
  ],
});
