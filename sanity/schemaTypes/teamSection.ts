import { defineField, defineType } from "sanity";

export const teamSectionType = defineType({
  name: "teamSection",
  title: "Team Section",
  type: "document",
  fields: [
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
            defineField({
              name: "story",
              title: "Doctor Story",
              type: "text",
              rows: 8,
              description: "Profile story shown in the doctor modal.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "appointmentLink",
              title: "Book Appointment Link",
              type: "string",
              description:
                "Used by the 'Book an appointment with Dr X' button.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "websiteLink",
              title: "Doctor Website Link",
              type: "string",
              description: "Used by the 'See doctor's website' button.",
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
