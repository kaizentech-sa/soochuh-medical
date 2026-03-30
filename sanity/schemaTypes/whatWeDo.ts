import { defineField, defineType } from "sanity";

export const whatWeDoType = defineType({
  name: "whatWeDo",
  title: "What We Do",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Service Items",
      description:
        "Editable cards shown under the fixed 'What We Do' section heading.",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineField({
          name: "item",
          title: "Item",
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
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "caption",
              media: "image",
            },
          },
        }),
      ],
    }),
  ],
});
