import { defineField, defineType } from "sanity";

export const bookingsType = defineType({
  name: "bookings",
  title: "Bookings / CTA",
  type: "document",
  fields: [
    defineField({
      name: "navbarCta",
      title: "Navbar CTA",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "link", title: "Link", type: "string" }),
      ],
    }),
    defineField({
      name: "servicesCta",
      title: "Services CTA",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "link", title: "Link", type: "string" }),
      ],
    }),
  ],
});
