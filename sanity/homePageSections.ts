/** Section ids for the public home page (order here is the default when CMS layout is empty). */
export const HOME_PAGE_SECTION_ORDER = [
  "hero",
  "whatWeDo",
  "whoWeAre",
  "specialisations",
  "differenceSection",
  "patientStories",
  "gallerySection",
  "teamSection",
  "collaboratorsSection",
  "contactSection",
] as const;

export type HomePageSectionId = (typeof HOME_PAGE_SECTION_ORDER)[number];

export const HOME_PAGE_SECTION_LABELS: Record<HomePageSectionId, string> = {
  hero: "Hero",
  whatWeDo: "What We Do",
  whoWeAre: "Who We Are",
  specialisations: "Healthcare Fields",
  differenceSection: "Difference Section",
  patientStories: "Patient Stories",
  gallerySection: "Gallery Section",
  teamSection: "Team Section",
  collaboratorsSection: "Collaborators Section",
  contactSection: "Contact Section",
};

const knownIds = new Set<string>(HOME_PAGE_SECTION_ORDER);

/** CMS order, de-duplicated; any missing sections are appended in default order. */
export function resolveHomeSectionOrder(
  sections: { section?: string }[] | undefined,
): HomePageSectionId[] {
  const fromCms = (sections ?? [])
    .map((row) => row.section)
    .filter((id): id is HomePageSectionId => typeof id === "string" && knownIds.has(id));

  if (fromCms.length === 0) {
    return [...HOME_PAGE_SECTION_ORDER];
  }

  const seen = new Set<HomePageSectionId>();
  const ordered: HomePageSectionId[] = [];
  for (const id of fromCms) {
    if (!seen.has(id)) {
      seen.add(id);
      ordered.push(id);
    }
  }
  for (const id of HOME_PAGE_SECTION_ORDER) {
    if (!seen.has(id)) {
      ordered.push(id);
    }
  }
  return ordered;
}
