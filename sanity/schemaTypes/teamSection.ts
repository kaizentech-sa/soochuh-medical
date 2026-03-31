import { defineField, defineType } from "sanity";

export const teamSectionType = defineType({
  name: "teamSection",
  title: "Team Section",
  type: "document",
  fields: [
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "members",
      title: "Team Members",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        defineField({
          name: "member",
          title: "Member",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "role",
              title: "Role",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "role",
              media: "image",
            },
          },
        }),
      ],
    }),
  ],
});
