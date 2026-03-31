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
        .title("What We Do")
        .id("whatWeDo")
        .child(S.document().schemaType("whatWeDo").documentId("whatWeDo")),
      S.listItem()
        .title("Who We Are")
        .id("whoWeAre")
        .child(S.document().schemaType("whoWeAre").documentId("whoWeAre")),
      S.listItem()
        .title("Healthcare Fields")
        .id("specialisations")
        .child(
          S.document()
            .schemaType("specialisations")
            .documentId("specialisations"),
        ),
      S.listItem()
        .title("Difference Section")
        .id("differenceSection")
        .child(
          S.document()
            .schemaType("differenceSection")
            .documentId("differenceSection"),
        ),
      S.listItem()
        .title("Patient Stories")
        .id("patientStories")
        .child(
          S.document()
            .schemaType("patientStories")
            .documentId("patientStories"),
        ),
      S.listItem()
        .title("Gallery Section")
        .id("gallerySection")
        .child(
          S.document()
            .schemaType("gallerySection")
            .documentId("gallerySection"),
        ),
      S.listItem()
        .title("Team Section")
        .id("teamSection")
        .child(
          S.document()
            .schemaType("teamSection")
            .documentId("teamSection"),
        ),
    ]);
