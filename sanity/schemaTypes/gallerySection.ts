import { defineField, defineType } from "sanity";

export const gallerySectionType = defineType({
  name: "gallerySection",
  title: "Gallery Section",
  type: "document",
  fields: [
    defineField({
      name: "images",
      title: "Gallery Images",
      description:
        "Upload the images used in the moving collage gallery (maximum 12).",
      type: "array",
      validation: (rule) => rule.required().min(1).max(12),
      of: [
        defineField({
          name: "imageItem",
          title: "Image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
});
