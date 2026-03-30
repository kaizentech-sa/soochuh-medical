import { defineField, defineType } from "sanity";

export const testimonialsType = defineType({
  name: "testimonials",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "sourceMode",
      title: "Source Mode",
      type: "string",
      options: {
        list: [
          { title: "Manual", value: "manual" },
          { title: "Google", value: "google" },
        ],
        layout: "radio",
      },
      initialValue: "manual",
    }),
    defineField({
      name: "manualItems",
      title: "Manual Items",
      type: "array",
      hidden: ({ document }) => document?.sourceMode !== "manual",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "quote", title: "Quote", type: "text" }),
            defineField({
              name: "rating",
              title: "Rating (out of 5)",
              type: "number",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "googleApiKey",
      title: "Google API Key",
      type: "string",
      hidden: ({ document }) => document?.sourceMode !== "google",
    }),
    defineField({
      name: "googlePlaceId",
      title: "Google Place ID",
      type: "string",
      hidden: ({ document }) => document?.sourceMode !== "google",
    }),
  ],
});
