# Implementation Prompt: Design System Showcase (Style Guide)

## Goal

Rework `app/design-system` from the current "four screens stitched together" demo into a true design-system reference sheet (like a UI kit board): every token and component presented in labeled catalog sections with names/values/specs visible. The underlying components and tokens are NOT changed — only the showcase page is rebuilt.

## Skills read

- AGENTS.md section 3 (UI work): reference = the user's described UI-kit layout; visuals use the project's own tokens.
- Existing `components/**`, `app/globals.css` (no changes needed there except additions if a specimen needs one).

## Decisions and assumptions

1. Single route `/design-system`, framed by the real `TopNav` (without inline search) and `Footer` so the shell is documented too.
2. Catalog sections, each opened by an uppercase `label-md` heading over a hairline divider:
   - **Brand**: wordmark lockup (hub icon + Product Mining) light usage notes.
   - **Colors**: swatch grid grouped by family (Primary, Surface containers, Text & outline, Secondary/Tertiary, Status). Each swatch shows a color tile (`rounded-lg border outline-variant`), token name, hex value. Tokens sourced from a local const array mirroring `globals.css`.
   - **Typography**: one specimen row per style (display-lg … label-sm): live sample text + spec string (size/line-height/weight/tracking).
   - **Spacing & radii**: bars sized xs→2xl/gutter with px labels; radius tiles for sm/lg/xl/pill.
   - **Elevation**: three tiles comparing shadow-none / shadow-sm / shadow-card.
   - **Iconography**: grid of the Material Symbols glyphs used across the system (search, hub, notifications, history, bookmark, storefront, trophy, open_in_new, trending_up, trending_down, remove, arrow_forward, add, play_arrow, calendar_today, check).
   - **Buttons**: primary / secondary / ghost, each default state; plus the full-width deal-card CTA pattern and an inline icon-button example.
   - **Inputs & controls**: hero search input with embedded Mine Data button, compact header input with Results Synced indicator, select, three toggles, checkbox set with count chips.
   - **Badges & status**: rank badge, Active/Paused badges, count chip, Mining…/Results Synced indicators.
   - **Data visualization**: progress bar (25%), multi-tone retailer bars, sparklines (area + line), price-trend chart panel from the analytics reference.
   - **Cards**: PanelCard with title/action, MetricCard, query-status card pair (Active/Paused), full DealCard.
   - **Data table**: sticky-header table with accent numeric column.
3. Section scaffolding is page-local (`SectionHeading` helper); no new shared components required.
4. Light mode only; no comments; no new dependencies.

## Files changed

- Rewrite: `app/design-system/page.tsx`
- No changes to `components/**`, `globals.css`, or any other route.

## Acceptance criteria & checks

- Page reads as a spec sheet: every section labeled, values printed next to specimens.
- `npm run lint`, `npx tsc --noEmit`, `npm run build` pass; dev server renders without console errors.

## Manual test steps

1. Open `/design-system`; walk sections top-to-bottom comparing against `design/product_mining/DESIGN.md`.
2. Confirm hex values on swatches match `globals.css`.
