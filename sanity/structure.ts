import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Hero")
        .id("hero")
        .child(S.document().schemaType("hero").documentId("hero")),
      S.listItem()
        .title("About")
        .id("about")
        .child(S.document().schemaType("about").documentId("about")),
      S.listItem()
        .title("Services")
        .id("services")
        .child(S.document().schemaType("services").documentId("services")),
      S.listItem()
        .title("Testimonials")
        .id("testimonials")
        .child(
          S.document().schemaType("testimonials").documentId("testimonials"),
        ),
      S.listItem()
        .title("Contact")
        .id("contact")
        .child(S.document().schemaType("contact").documentId("contact")),
      S.listItem()
        .title("Bookings")
        .id("bookings")
        .child(S.document().schemaType("bookings").documentId("bookings")),
      S.listItem()
        .title("Site Theme")
        .id("siteTheme")
        .child(S.document().schemaType("siteTheme").documentId("siteTheme")),
    ]);
