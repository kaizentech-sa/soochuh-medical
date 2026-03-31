import { defineField, defineType } from "sanity";

export const collaboratorsSectionType = defineType({
  name: "collaboratorsSection",
  title: "Collaborators Section",
  type: "document",
  fields: [
    defineField({
      name: "logos",
      title: "Collaborator Logos",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineField({
          name: "logoItem",
          title: "Logo",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "logo",
              title: "Logo Image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "name",
              media: "logo",
            },
          },
        }),
      ],
    }),
  ],
});
