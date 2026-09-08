# Vivid Mesh redesign: /listings, /auth, /detail

## Context

The homepage (`/`) was redesigned around a "Vivid Mesh" visual system —
layered glass surfaces, brand-hued mesh gradients, a faint medical-icon
backdrop, and GSAP scroll motion — documented in `CLAUDE.md`. Every other
route (`/listings`, `/auth/*`, `/detail/*`) still uses the original flat
chrome (`app/_components/header/*`, `app/_components/footer/Footer.tsx`)
and flat section styling. `CLAUDE.md` explicitly calls out that adopting
Vivid Mesh outside the homepage is "its own explicit task each time" —
this spec is that task, covering all three remaining route groups.

Goal: bring `/listings`, `/auth/login`, `/auth/signup`, and
`/detail/[category]` to full visual parity with the homepage's Vivid Mesh
language (glass panels, mesh gradients, backdrop motifs, GSAP
Reveal/Parallax motion), reusing the homepage's `Header`/`Footer` chrome,
and delete the old chrome once nothing references it.

Non-goals: no behavioral changes to filtering/sorting/pagination logic,
auth form validation/submission logic, or cart/booking logic in the
detail page's BuyBox. This is a visual/structural migration only.

## Current state (research findings)

- **Routes**: `app/listings/page.tsx`, `app/listings/[tab]/page.tsx`,
  `app/auth/{login,signup}/page.tsx` (both render `AuthPageShell`),
  `app/detail/[category]/page.tsx` (renders `DetailPage`). No nested
  layout.tsx files exist for these groups beyond the root layout.
- **Old chrome blast radius**: exactly 4 files import
  `app/_components/header/*` / `app/_components/footer/Footer.tsx`:
  `app/listings/page.tsx`, `app/listings/[tab]/page.tsx`,
  `app/_components/auth/AuthPageShell.tsx`,
  `app/_components/detail/DetailPage.tsx`. Once all four are migrated,
  the old chrome files become dead code.
- **New chrome reusability**: `app/_components/home/{Header,Navbar,TopBar}.tsx`
  are generic — same `HeaderActive` prop shape as the old header, and
  `Navbar` already links to `/listings`, `/auth/login`, `/auth/signup`,
  and `/detail/<category>`. `Header` is `position: fixed` and reserves no
  layout space (unlike the old `sticky` header); on the homepage, `Hero`
  alone absorbs that top clearance. `app/_components/home/Footer.tsx` is
  a self-contained server component, portable as-is.
- **Forms**: `LoginForm`/`SignupForm` already use `react-hook-form` + zod
  - the `AppInput`/`AppPasswordInput`/`AppCheckbox`/`ErrorLabel` pattern
    mandated by `CLAUDE.md` — no changes needed to form internals.
- **Primitives available**: `app/_lib/glass.ts` (`glass.subtle`,
  `glass.vivid` + `glassScrim`, `glass.dark`), `app/_components/home/Mesh.tsx`
  (`Mesh` + `MeshPreset`, preset-driven blob layer),
  `app/_components/shared/BackdropMotifs.tsx` (seeded, deterministic),
  `app/_components/shared/Motion.tsx` (`Reveal`, `Parallax`, both gated
  on `prefers-reduced-motion`).

## Decisions

1. **Redesign depth**: full Vivid Mesh treatment for every page's own
   content sections, not just a chrome swap — glass panels, mesh
   gradients, backdrop motifs, and GSAP motion applied throughout.
2. **Sequencing**: implement one page group at a time — listings, then
   auth, then detail — each independently reviewable.
3. **Header clearance**: introduce a shared `PageShell` wrapper (new:
   `app/_components/shared/PageShell.tsx`) rather than repeating top
   padding in each page. Props: `{ active: HeaderActive; children:
ReactNode }`. Renders `<Header active={active} />`, a `pt-32`
   top-padded wrapper around `children` (matching the `pt-32` Hero
   currently uses at `app/_components/home/Hero.tsx:142` to clear the
   fixed Header), then `<Footer />`.
4. **Deletion timing**: keep `app/_components/header/*` and
   `app/_components/footer/Footer.tsx` in the tree (unused but present)
   until all three groups are migrated, then delete everything in one
   final cleanup commit/step, including any now-dead imports.
5. **Mesh presets**: add new `"listings"`, `"auth"`, `"detail"` presets
   to `MESH_PRESETS` in `Mesh.tsx`, hand-tuned per section — do not
   reuse homepage presets out of context.

## Per-page-group design

### Listings (`app/listings/page.tsx`, `app/listings/[tab]/page.tsx`,

`app/_components/listings/*`)

- Wrap page content in `PageShell active="listings"`.
- Add a new slim intro band above `TabPills`: heading + `Mesh
preset="listings"` + `BackdropMotifs`. This gives the fixed-header
  clearance area real content instead of blank space, mirroring how
  `Hero` absorbs that role on `/`.
- Restyle `TabPills`, `SearchSortBar`, `FilterSidebar` /
  `MobileFilterDrawer`, `FilterGroups` onto `glass.subtle` panels
  (need strong legibility for controls — not `glass.vivid`).
- `ListingCard` becomes a `glass.subtle` card with hover lift; the card
  grid's entrance wrapped in `Reveal`.
- No changes to `ListingsView.tsx`'s filter/search/sort/pagination
  state or logic — visual only.

### Auth (`app/_components/auth/{AuthPageShell,AuthBrandPanel,AuthCard}.tsx`)

- `AuthPageShell` swaps its old Header/2-col-grid/old-Footer
  composition for `PageShell active="auth"` wrapping the existing
  2-col grid (`AuthBrandPanel` | `AuthCard`).
- `AuthBrandPanel` gets `Mesh preset="auth"` + `BackdropMotifs` behind
  its existing bullet content, replacing the current plain
  gradient+SVG-rings background.
- `AuthCard` becomes a `glass.subtle` panel (strong opacity needed for
  form legibility); its Login/Signup pill tabs restyled to the
  brand-dark active state used elsewhere in the new chrome (e.g.
  Navbar's mega-menu).
- `LoginForm`, `SignupForm`, `AppInput`, `AppPasswordInput`,
  `AppCheckbox`, `SocialAuthButtons` are untouched — chrome/background
  only, no field or validation changes.

### Detail (`app/_components/detail/DetailPage.tsx`)

- Swap old Header/Footer for `PageShell active="detail"`.
- Breadcrumb becomes a small `glass.subtle` chip.
- Gallery/description/includes sections become `glass.subtle` cards
  over a `Mesh preset="detail"` + `BackdropMotifs` backdrop behind the
  top of the page.
- `BuyBox` (sticky right column) becomes a `glass.vivid` panel with
  `glassScrim` applied to its price/CTA text, since it floats over the
  mesh backdrop.
- All cart/qty/booking state and logic in `BuyBox`/`DetailPage`
  untouched.

## Testing

- Manual verification per page group in a browser (dev server) after
  each phase: visual check against homepage's Vivid Mesh language,
  functional check that filtering/sorting/pagination (listings), form
  validation/submission (auth), and cart/qty/booking (detail) all still
  work.
- No new automated tests required — this is a visual/structural
  migration with no logic changes; existing behavior is preserved, not
  newly created.
- After the final cleanup step, grep the repo to confirm
  `app/_components/header/*` and `app/_components/footer/Footer.tsx`
  have zero remaining imports before deleting them.

## Delete Playwright artifacts

Per `CLAUDE.md`, any Playwright-created screenshots/traces used to
visually verify these pages during implementation must be deleted once
their verification purpose is served.
