import { defineField, defineType } from "sanity";

export const whoWeAreType = defineType({
  name: "whoWeAre",
  title: "Who We Are",
  type: "document",
  fields: [
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 8,
      validation: (rule) => rule.required(),
    }),
  ],
});
