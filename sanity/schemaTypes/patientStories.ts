import { defineField, defineType } from "sanity";

export const patientStoriesType = defineType({
  name: "patientStories",
  title: "Patient Stories",
  type: "document",
  fields: [
    defineField({
      name: "sourceMode",
      title: "Stories Source",
      type: "string",
      options: {
        list: [
          { title: "Manual", value: "manual" },
          { title: "Google", value: "google" },
        ],
        layout: "radio",
      },
      initialValue: "manual",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "manualStories",
      title: "Manual Stories",
      type: "array",
      hidden: ({ document }) => document?.sourceMode !== "manual",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.sourceMode === "manual" && (!value || value.length === 0)) {
            return "Add at least one story when using Manual source.";
          }
          return true;
        }),
      of: [
        defineField({
          name: "story",
          title: "Story",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Story Text",
              type: "text",
              rows: 5,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "author",
              title: "Author Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "author",
              subtitle: "text",
            },
            prepare(selection) {
              const subtitle = selection.subtitle
                ? `${String(selection.subtitle).slice(0, 80)}...`
                : "";
              return {
                title: selection.title || "Unnamed author",
                subtitle,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "googleApiKey",
      title: "Google API Key",
      type: "string",
      hidden: ({ document }) => document?.sourceMode !== "google",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.sourceMode === "google" && !value) {
            return "Google API Key is required when using Google source.";
          }
          return true;
        }),
    }),
    defineField({
      name: "googlePlaceId",
      title: "Google Place ID",
      type: "string",
      hidden: ({ document }) => document?.sourceMode !== "google",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.sourceMode === "google" && !value) {
            return "Google Place ID is required when using Google source.";
          }
          return true;
        }),
    }),
  ],
});
