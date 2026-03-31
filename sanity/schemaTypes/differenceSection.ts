import { defineField, defineType } from "sanity";

export const differenceSectionType = defineType({
  name: "differenceSection",
  title: "Difference Section",
  type: "document",
  fields: [
    defineField({
      name: "whatMakesUsDifferent",
      title: "What Makes Us Different",
      type: "object",
      fields: [
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 5,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "buttonLink",
          title: "Button Link",
          type: "string",
          description: "Example: #team",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "nextVisit",
      title: "What To Expect At Your Next Visit",
      type: "object",
      fields: [
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 5,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "buttonLink",
          title: "Button Link",
          type: "string",
          description: "Example: #contact",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
});
