# Sanity Studio Backend Setup Manual (Reusable Blueprint)

This guide documents how to build a Sanity backend like this project and reuse the same pattern in future apps.

It is written for **Next.js + Sanity Studio embedded at `/studio`** and a **singleton-content model** (Hero, About, Services, etc.).

---

## 1) Architecture Overview

This project uses:

- **Sanity Studio** for content editing.
- **Schemas per section** (one file per content type).
- **Singleton documents** for page sections (exactly one Hero, one About, one Services, etc.).
- **Custom Studio structure** to show clean editor navigation.
- **Server-side GROQ fetches** in `app/page.tsx` and `app/layout.tsx`.
- **Sanity image URL builder** for responsive image rendering.

Core folders/files:

- `sanity.config.ts` — Studio config (plugins, schema, structure).
- `sanity/env.ts` — env var parsing (`projectId`, `dataset`, `apiVersion`).
- `sanity/schemaTypes/*.ts` — schema definitions.
- `sanity/schemaTypes/index.ts` — schema registration.
- `sanity/structure.ts` — singleton navigation in Studio.
- `sanity/lib/client.ts` — shared Sanity client.
- `sanity/lib/image.ts` — image URL builder helper.
- `app/page.tsx` — section data fetching and page composition.
- `app/layout.tsx` — global theme variable injection from Sanity.

---

## 2) Prerequisites

- A Sanity project (project ID + dataset).
- `.env.local` values:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID=...`
  - `NEXT_PUBLIC_SANITY_DATASET=...`
  - `NEXT_PUBLIC_SANITY_API_VERSION=YYYY-MM-DD`
- Studio route in app router (`app/studio/[[...tool]]/page.tsx`) if embedding Studio.

---

## 3) Base Sanity Configuration

### 3.1 `sanity.config.ts`

Keep this shape:

- `defineConfig({ basePath: '/studio', projectId, dataset, schema, plugins: [structureTool({structure}), visionTool(...)] })`
- Import `schema` from `sanity/schemaTypes`
- Import `structure` from `sanity/structure`

### 3.2 `sanity/env.ts`

Use assert-based env handling:

- `projectId` from `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `dataset` from `NEXT_PUBLIC_SANITY_DATASET`
- `apiVersion` from `NEXT_PUBLIC_SANITY_API_VERSION` fallback to a fixed date

### 3.3 `sanity/lib/client.ts`

Create shared client with:

- `createClient({ projectId, dataset, apiVersion, useCdn: true })`

Set `useCdn` based on your freshness needs.

---

## 4) Schema Design Pattern (Recommended)

Use one schema file per section:

- `hero.ts`
- `about.ts`
- `services.ts`
- `testimonials.ts`
- `contact.ts`
- `bookings.ts` (CTA links)
- `siteTheme.ts` (global palette)

Then register in `sanity/schemaTypes/index.ts`.

### Rules used in this project

- Prefer friendly titles and descriptions (editor-first labels).
- Use `object` fields for grouped content (CTA, blocks, meta pairs).
- Use `array` + `object` for repeatable cards/items.
- Use `hidden` callbacks for conditional UI (e.g. quote vs image mode in About).
- Use singleton document IDs through structure (not by user convention only).

---

## 5) Singleton Studio Structure

`sanity/structure.ts` should explicitly map each list item to fixed document IDs.

Pattern:

- `schemaType('hero').documentId('hero')`
- `schemaType('about').documentId('about')`
- `schemaType('services').documentId('services')`
- `schemaType('testimonials').documentId('testimonials')`
- `schemaType('contact').documentId('contact')`
- `schemaType('bookings').documentId('bookings')`
- `schemaType('siteTheme').documentId('siteTheme')`

Benefits:

- Editors always update the right document.
- Frontend queries can remain simple (`*[_type=="hero"][0]`).

---

## 6) Content Models Implemented Here

### 6.1 Hero

- Heading/body
- Primary + secondary CTA (`label`, `link`)
- Optional testimonial
- Hero image

### 6.2 About

- Main heading + paragraphs
- Qualification/specialization blocks
- Philosophy card with conditional mode:
  - `quote` mode -> quote + author
  - `image` mode -> image only

### 6.3 Services

- Section heading
- Cards array: title, description, image

### 6.4 Testimonials

- Source mode (`manual` or `google`)
- Manual items array OR Google fields (`googleApiKey`, `googlePlaceId`)

### 6.5 Contact

- Heading + description
- Location, phone, email, hours as structured objects

### 6.6 Bookings (CTA control)

- `navbarCta` object: label + link
- `servicesCta` object: label + link

Used by:

- Header book button
- Services book button

### 6.7 Site Theme (global colors)

Editor-friendly grouped string fields (hex colors):

- Base, Surfaces, Actions, Text, UI

Note: includes hidden legacy `colors` object for backward compatibility with older documents.

---

## 7) Frontend Data Fetch Pattern

In `app/page.tsx`:

- Define TS types per section response.
- Create one async `getXData()` per section.
- Use GROQ projection to fetch exactly needed fields.
- Resolve all in `Promise.all`.
- Pass data as props to section components.

Example pattern:

- `const [heroData, aboutData, ...] = await Promise.all([getHeroData(), getAboutData(), ...])`

---

## 8) Global Theme from Sanity

This project injects Sanity-managed color values into CSS variables in `app/layout.tsx`.

Flow:

1. Fetch `siteTheme` document in layout.
2. Build CSS variable string for `:root`.
3. Build same overrides for `.dark` (in this project they mirror each other intentionally).
4. Inject via `<style dangerouslySetInnerHTML={{__html: cssVars}} />`.

This allows all utility classes (`bg-background`, `text-foreground`, etc.) to update globally from Studio.

### Backward compatibility strategy used

The layout query fetches both:

- new top-level fields, and
- legacy `colors.*` object

Then it falls back to `colors.*` when top-level field is missing.

---

## 9) Image Handling Standards

Use `sanity/lib/image.ts`:

- `urlFor(source).width(...).height(...).fit("crop").url()`

Important:

- For Sanity image builder, use supported fit modes (`"crop"`, etc.).
- Do **not** use unsupported fit modes like `"cover"` in URL builder.
- In Next `<Image>`, use `className="object-cover"` for CSS cover behavior.

---

## 10) Studio UX Best Practices (Non-Developer Friendly)

To keep editors comfortable:

- Use clear labels (avoid CSS/token jargon in field titles).
- Add descriptions with examples (e.g. `#e8dfd3`, `#contact`).
- Group related fields with schema `groups`.
- Hide advanced/legacy fields (`hidden: true`).
- Use radio/select toggles for mode switching.
- Keep singleton list short and ordered by real editorial workflow.

---

## 11) Typical Build Steps for a New App

1. Install/configure Sanity in Next.js.
2. Add `sanity.config.ts`, `sanity/env.ts`, `sanity/lib/client.ts`, `sanity/lib/image.ts`.
3. Build schemas in `sanity/schemaTypes`.
4. Register schemas in `sanity/schemaTypes/index.ts`.
5. Build singleton structure in `sanity/structure.ts`.
6. Create section components and typed data fetches in `app/page.tsx`.
7. Wire optional global theme in `app/layout.tsx`.
8. Run Studio and create all singleton documents.
9. Populate content and verify rendering.

---

## 12) Validation + Guardrails You Should Add

Recommended improvements for future clones:

- Add regex validation for color fields:
  - Accept `#RRGGBB` only if desired.
- Add URL validation for external booking links.
- Add required rules for critical fields (`heading`, key CTA labels).
- Add preview config for complex objects.
- Add migration scripts when schema shape changes.

---

## 13) Known Pitfalls (Seen in This Project)

1. **Unknown type: `color`**
   - Sanity core does not include `type: 'color'` unless plugin/custom type is added.
   - Use `string` fields or install color input plugin.

2. **GROQ projection parse error**
   - Computed field aliases in GROQ must be string literals (`"alias": expr`) when used.
   - Keep projections simple unless needed.

3. **Legacy field mismatch**
   - If old documents keep removed fields (e.g. `colors`), Studio warns unknown field.
   - Keep hidden legacy fields during migration windows.

4. **Sanity image fit mode**
   - Unsupported fit mode names throw runtime errors.

---

## 14) Optional: Add Real Color Picker UX

If you want click-to-pick colors (instead of typing hex):

- Install a Sanity-compatible color input plugin or
- Build a custom input component and assign it to string fields.

Current setup is plugin-free for maximum portability.

---

## 15) Copy-Paste Checklist for Future Projects

- [ ] Env vars configured (`projectId`, `dataset`, `apiVersion`)
- [ ] Studio mounted at `/studio`
- [ ] Singleton schemas created and registered
- [ ] `structure.ts` uses fixed singleton `documentId`s
- [ ] Section data fetched with typed GROQ projections
- [ ] Image URLs generated via `urlFor(...)`
- [ ] Global theme (optional) wired in layout
- [ ] Legacy compatibility strategy documented
- [ ] Editor-facing labels/descriptions reviewed for clarity
- [ ] Initial content entered for all singleton docs

---

## 16) Maintenance Strategy

- Treat schemas as source of truth in git.
- When changing field names/shapes:
  - Keep compatibility fields temporarily,
  - update frontend query fallback,
  - migrate content,
  - then remove legacy paths.
- Update this manual with every schema pattern you standardize.

