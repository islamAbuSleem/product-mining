# Implementation Prompt: Design System from design/

## Goal

Implement the Product Mining design system in the Next.js workspace so every future page can be built by composing existing primitives. This covers the token layer (colors, typography, spacing, radii, elevation) and the reusable components visible in the four design references. It does NOT rebuild the four product pages themselves; those are follow-up work.

## Sources of truth

- `design/product_mining/DESIGN.md` — written spec (brand, colors, typography, layout, elevation, shapes, components).
- `design/search_experience/code.html`, `design/deals_offers/code.html`, `design/refined_deal_card_layout/code.html`, `design/my_searching_history/code.html`, `design/product_analytics_dashboard/code.html` — exact markup and the Tailwind CDN config they share.
- Screen PNGs in the same folders for visual verification.

Where DESIGN.md and the HTML disagree, the HTML wins (it produced the approved screenshots). Notable conflicts resolved toward the HTML: borderRadius DEFAULT=0.125rem, lg=0.25rem, xl=0.5rem, full=0.75rem; headings use `on-surface` (#191c1e), not #0f172a.

## Skills read

- AGENTS.md sections 3 (UI work), 5 (structure), 13 (checks).
- `node_modules/next/dist/docs/` conventions for fonts, metadata, client/server components.

## Code inspected

- `app/globals.css` — bare Tailwind v4 import with Geist variables; will be replaced.
- `app/layout.tsx` — root layout with Geist fonts and default metadata; will be updated.
- `app/page.tsx` — default starter page; left untouched (out of scope).
- No `components/` directory exists yet; none of the design packages (`@tailwindcss/forms`) installed. Forms plugin styling is replicated manually where needed (checkboxes, select) to avoid new deps unless trivially needed.

## Design decisions and assumptions

1. **Tailwind v4 tokens** live in `app/globals.css` under `@theme`: all ~40 design colors under their Material-style names (`primary`, `on-surface-variant`, `surface-container-lowest`, …), spacing keys (`xs`…`2xl`, `gutter`, `margin-desktop`, `margin-mobile`, `max-width`), radii (`DEFAULT`, `lg`, `xl`, `full`), and shadow `card` (`0px 4px 12px rgba(15,23,42,0.08)`).
2. **Typography as complete utility classes** (`.text-display-lg`, `.text-headline-lg`, `.text-headline-lg-mobile`, `.text-headline-md`, `.text-title-lg`, `.text-title-md`, `.text-body-lg`, `.text-body-md`, `.text-label-md`, `.text-label-sm`) defined in `@layer utilities`, each bundling Inter, size, line-height, weight, and letter-spacing exactly as in the config. Single class per element instead of the reference's redundant font-/text- pair.
3. **Fonts**: Inter 400–700 via `next/font/google` (variable `--font-inter`). Icons: Material Symbols Outlined loaded via `<link>` in the root layout (matches reference behavior), wrapped in an `Icon` client-safe component.
4. **Light mode only.** References ship `dark:` variants but render `class="light"`; dark palettes are out of scope.
5. **Components built** (server components except where interaction requires `'use client'`):
   - `components/ui/icon.tsx` — Material Symbols wrapper (name, fill option, size).
   - `components/ui/button.tsx` — variants: `primary` (solid `bg-primary` → `hover:bg-primary-container`), `secondary` (white, `border-outline-variant`), `ghost` (icon button with `hover:bg-surface-container-low`).
   - `components/ui/input.tsx` — text input with leading icon slot and trailing status slot (covers hero search and compact header search incl. `shadow-inner` well look).
   - `components/ui/toggle.tsx` — peer-based switch (Deep Search/Global Sources pattern), `'use client'`.
   - `components/ui/checkbox.tsx` — filter checkbox with optional count chip.
   - `components/ui/select.tsx` — native select styled per Context Header sort control.
   - `components/ui/badge.tsx` — variants: `rank` (yellow trophy), `status-active` (pulsing dot), `status-paused`, `count` chip.
   - `components/ui/card.tsx` — `PanelCard` (white, 1px `outline-variant`, `rounded-lg`), `GlassCard` (the `.glass-card` hover-lift utility), `MetricCard` (label/value/delta with trend icon color mapping up=primary, down=error, flat=muted).
   - `components/ui/status-indicator.tsx` — pulsing dot + label ("Mining…" blue, "Results Synced" green).
   - `components/ui/progress-bar.tsx` — h-2 track/fill.
   - `components/ui/filter-group.tsx` — uppercase label + checkbox list with dividers (sidebar pattern).
   - `components/ui/data-table.tsx` — sticky `label-sm` header on `surface-container`, divided rows, right-aligned numeric column in primary.
   - `components/ui/sparkline.tsx` — tiny SVG polyline for price history on deal cards (2px stroke, 10% area fill option).
   - `components/layout/top-nav.tsx` — sticky h-16 white bar: brand (+ hub icon), inline search variant slot, nav links (Search/Deals/History/Analytics) with `border-b-2` active state, notification/history icons, avatar. Nav needs pathname awareness → `'use client'` subcomponent; shell stays server.
   - `components/layout/footer.tsx` — `surface-container-low`, brand + copyright + five links.
   - `components/layout/page-shell.tsx` — `max-w-[1440px]` centered container with `px-margin-desktop` / mobile margin.
   - `components/deal-card.tsx` — the refined card: overlay rank badge + bookmark, h-48 image well on `surface-container-low`, storefront + merchant `label-md`, `title-lg` line-clamp-2 hover→primary, `headline-md` price in primary + strikethrough original, green drop label, full-width primary "View Deal" CTA with `open_in_new`. Props typed for later online-search wiring; static demo data only.
6. **Demo route**: `app/design-system/page.tsx` renders every primitive with realistic sample content (metric row, chart panel with SVG trend, retailer bars, top-queries table, query cards, filter sidebar, deal card grid) so the system can be verified against the PNGs without building real pages.
7. **Metadata**: title "Product Mining", description from DESIGN.md tagline.
8. No PostHog/Clerk/Sanity code — pure presentational layer. No comments in code.

## Files expected to change/add

- Rewrite: `app/globals.css`, `app/layout.tsx`
- Add: `components/ui/{icon,button,input,toggle,checkbox,select,badge,card,status-indicator,progress-bar,filter-group,data-table,sparkline}.tsx`
- Add: `components/layout/{top-nav,footer,page-shell}.tsx`
- Add: `components/deal-card.tsx`
- Add: `app/design-system/page.tsx`

## Requirements

- Visual output must match `design/**/screen.png` for every reproduced element: colors, sizes, weights, radii, borders, shadows, hover states (glass card lift −2px + `primary-container` border; card title hover→primary; button hovers).
- All four nav items and active-state treatment implemented once, reused everywhere.
- Layout containers centered, max-width 1440px, desktop margins 40px, mobile 16px; grids collapse 12-col → 4-col equivalents down mobile (stack columns, hide sidebar into stacked section).
- TypeScript strict-clean; components accept typed props with sensible defaults; no `any`.

## Security considerations

- Static presentational code only; no secrets, no env vars, no network calls. Avatar/image URLs in demo content point to public placeholder hosts exactly as in the references.

## Acceptance criteria

- `npm run lint` passes; `npx tsc --noEmit` passes; `npm run build` succeeds.
- `/design-system` route renders without console errors and visually matches the reference PNGs section by section.
- Existing `/` route still builds (untouched).

## Checks to run

1. `npm run lint`
2. `npx tsc --noEmit`
3. `npm run build`
4. `npm run dev` → verify `/design-system` manually.

## Manual test steps

1. Open `http://localhost:3000/design-system`.
2. Compare hero search block, deal card, metric cards, charts, table, query cards, filter groups against `design/search_experience/screen.png`, `design/refined_deal_card_layout/screen.png`, `design/product_analytics_dashboard/screen.png`, `design/my_searching_history/screen.png`.
3. Hover a deal card: expect 2px lift, blue border, title tint; hover CTA: darker blue.
4. Resize to mobile width: columns stack, nav links collapse, margins shrink to 16px.
