import { defineField, defineType } from "sanity";

export const appointmentSettingsType = defineType({
  name: "appointmentSettings",
  title: "Appointment Settings",
  type: "document",
  fields: [
    defineField({
      name: "appointmentLink",
      title: "Global Appointment Link",
      type: "string",
      description:
        "Used by all general 'Make Appointment' buttons (except individual doctor profile buttons).",
      validation: (rule) => rule.required(),
    }),
  ],
});
