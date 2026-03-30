import { defineField, defineType } from "sanity";

export const siteThemeType = defineType({
  name: "siteTheme",
  title: "Site Theme",
  type: "document",
  groups: [
    { name: "base", title: "Base" },
    { name: "surfaces", title: "Surfaces" },
    { name: "actions", title: "Actions" },
    { name: "text", title: "Text" },
    { name: "ui", title: "UI" },
  ],
  fields: [
    defineField({
      name: "background",
      title: "Background",
      type: "string",
      description: "Hex color, e.g. #ffffff",
      group: "base",
    }),
    defineField({
      name: "foreground",
      title: "Foreground",
      type: "string",
      description: "Hex color, e.g. #111111",
      group: "base",
    }),
    defineField({
      name: "card",
      title: "Card",
      type: "string",
      group: "surfaces",
    }),
    defineField({
      name: "muted",
      title: "Muted",
      type: "string",
      group: "surfaces",
    }),
    defineField({
      name: "primary",
      title: "Primary",
      type: "string",
      group: "actions",
    }),
    defineField({
      name: "secondary",
      title: "Secondary",
      type: "string",
      group: "actions",
    }),
    defineField({
      name: "accent",
      title: "Accent",
      type: "string",
      group: "actions",
    }),
    defineField({
      name: "textPrimary",
      title: "Text Primary",
      type: "string",
      group: "text",
    }),
    defineField({
      name: "textSecondary",
      title: "Text Secondary",
      type: "string",
      group: "text",
    }),
    defineField({
      name: "border",
      title: "Border",
      type: "string",
      group: "ui",
    }),
    defineField({
      name: "ring",
      title: "Ring",
      type: "string",
      group: "ui",
    }),
    defineField({
      name: "colors",
      title: "Legacy Colors",
      type: "object",
      hidden: true,
      fields: [
        defineField({ name: "background", type: "string" }),
        defineField({ name: "foreground", type: "string" }),
        defineField({ name: "primary", type: "string" }),
      ],
    }),
  ],
});
