import { defineField, defineType } from "sanity";

export const contactSectionType = defineType({
  name: "contactSection",
  title: "Contact Section",
  type: "document",
  fields: [
    defineField({
      name: "phoneNumbers",
      title: "Phone Numbers",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineField({
          name: "phoneItem",
          title: "Phone Number",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "Example: Reception, Emergency, Support",
            }),
            defineField({
              name: "number",
              title: "Number",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "number",
              subtitle: "label",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description: "Digits only with country code, e.g. 27611729560",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
  ],
});
