import { defineField, defineType } from "sanity";

export const specialisationsType = defineType({
  name: "specialisations",
  title: "Healthcare Fields",
  type: "document",
  fields: [
    defineField({
      name: "cards",
      title: "Healthcare Field Cards",
      description: "Cards shown in the section under the fixed heading.",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineField({
          name: "card",
          title: "Card",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "subtitle",
              media: "image",
            },
          },
        }),
      ],
    }),
  ],
});
