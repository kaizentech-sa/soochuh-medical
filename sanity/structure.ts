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
    ]);
