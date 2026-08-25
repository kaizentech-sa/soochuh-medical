import { defineField, defineType } from "sanity";
import {
  HOME_PAGE_SECTION_LABELS,
  HOME_PAGE_SECTION_ORDER,
  type HomePageSectionId,
} from "../homePageSections";

const sectionListOptions = HOME_PAGE_SECTION_ORDER.map((value) => ({
  title: HOME_PAGE_SECTION_LABELS[value],
  value,
}));

export const homeLayoutType = defineType({
  name: "homeLayout",
  title: "Home Layout",
  type: "document",
  initialValue: () => ({
    sections: HOME_PAGE_SECTION_ORDER.map((section) => ({
      _type: "homeSectionSlot",
      section,
    })),
  }),
  fields: [
    defineField({
      name: "sections",
      title: "Home page sections",
      description:
        "Drag rows to change the order of sections on the home page. Each section should appear once.",
      type: "array",
      validation: (rule) =>
        rule.custom((items) => {
          if (!Array.isArray(items) || items.length === 0) {
            return "Add at least one section.";
          }
          const values = items
            .map((item) => (item as { section?: string } | null)?.section)
            .filter(Boolean) as string[];
          if (new Set(values).size !== values.length) {
            return "Each section can only appear once.";
          }
          return true;
        }),
      of: [
        defineField({
          name: "homeSectionSlot",
          title: "Section",
          type: "object",
          fields: [
            defineField({
              name: "section",
              title: "Section",
              type: "string",
              options: {
                list: sectionListOptions,
                layout: "dropdown",
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { section: "section" },
            prepare({ section }: { section?: string }) {
              const title =
                section && section in HOME_PAGE_SECTION_LABELS
                  ? HOME_PAGE_SECTION_LABELS[section as HomePageSectionId]
                  : section ?? "Section";
              return { title };
            },
          },
        }),
      ],
    }),
  ],
});
