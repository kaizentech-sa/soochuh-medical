import { defineField, defineType } from "sanity";

export const aboutType = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "qualifications",
      title: "Qualifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "philosophyMode",
      title: "Philosophy Mode",
      type: "string",
      options: {
        list: [
          { title: "Quote", value: "quote" },
          { title: "Image", value: "image" },
        ],
        layout: "radio",
      },
      initialValue: "quote",
    }),
    defineField({
      name: "philosophyQuote",
      title: "Philosophy Quote",
      type: "text",
      hidden: ({ document }) => document?.philosophyMode !== "quote",
    }),
    defineField({
      name: "philosophyAuthor",
      title: "Philosophy Author",
      type: "string",
      hidden: ({ document }) => document?.philosophyMode !== "quote",
    }),
    defineField({
      name: "philosophyImage",
      title: "Philosophy Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ document }) => document?.philosophyMode !== "image",
    }),
  ],
});
