# Implementation Prompt: Sanity content model & Studio for product mining — save search behind login

## Goal
Implement the Sanity content model and Studio that the home search depends on. User types a product name / free text, search goes online for deals/offers, and if the user wants to keep results for later they are asked to log in and the search is saved. Studio must let editors see and tune what the agent uses: product mining document (title, price, listing site, alternative sellers) plus the app-state and search config that AGENTS.md fixes.

## Skills you read
- `sanity-best-practices` (`~/.claude/skills/sanity-best-practices/SKILL.md`) — schema with `defineType`/`defineField`/`defineArrayMember`, GROQ, TypeGen, Studio structure, image and singleton patterns, standalone vs embedded Studio tradeoffs. References read: `references/schema.md`, `references/groq.md`, `references/typegen.md`, `references/studio-structure.md`, `references/project-structure.md`.
- `shape-your-agent` — not used for code here, but noted for search agent system prompt tone/guardrails separation (instructions vs prompt) when wiring the search config doc.
- `node_modules/next/dist/docs/` — App Router `app/studio/[[...tool]]/page.tsx` embedding, server vs client boundaries for Sanity fetches (`sanityFetch`/`client`).

## Code you inspected
- `AGENTS.md` sections 1, 5, 6, 8–12 — fixes: products/deals never persisted in Sanity, only per-user state (`tracked-searches`) and `search config`; two-workspace ideal vs current embedded `sanity/` at repo root; server-only Sanity client + private dataset + Clerk gating; TypeGen deploy.
- `sanity.config.ts:1-28` — embedded Studio at `basePath: '/studio'` with `structureTool` + `visionTool`, imports `apiVersion/dataset/projectId` from `sanity/env.ts` and `schema` from `sanity/schemaTypes`.
- `sanity/env.ts` — `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` via `assertValue`.
- `sanity/schemaTypes/index.ts` — currently `types: []` (empty).
- `sanity/structure.ts` — default `S.list().title('Content').items(S.documentTypeListItems())`.
- `sanity/lib/client.ts` / `sanity/lib/live.ts` — `createClient({useCdn:true})` and `defineLive` helper.
- `package.json:11-19` — `sanity@5.31.2`, `next-sanity@13.3.3`, `@sanity/vision`, `styled-components`; web workspace lives at repo root (`app/`), Studio is embedded not standalone (contravening AGENTS.md §5 ideal — kept as-is for this task to avoid a monorepo move).
- `.env.local` — has `NEXT_PUBLIC_CLERK_*` and `NEXT_PUBLIC_SANITY_*` (production dataset, project 6agch6zz), `.env.example` missing, `.gitignore` already ignores `.env*`.

## Decisions and assumptions
1. **Conflict resolution — product documents vs AGENTS.md "never store products":** AGENTS.md §1/§6/§8 say products/deals/offers are fetched online and never persisted. The request explicitly says *implement Sanity content model and studio for product mining (title, price, listing site, alternatives sellers)*. Assumption: implement a Sanity document `product` with exactly those fields for **Studio authoring / seed and reference**, but **the runtime search path still fetches live online** (section 9). Product docs are NOT bulk-written by the search API; they are preview/seed content. Ask approval: if you want product strictly never created in Sanity, I will drop this type and keep only the two AGENTS.md-fixed types — the rest of the plan stays.
2. **Save-search requires login:** Browsing and searching stay public; `Save search` affordance checks Clerk `auth()`. If signed out, show seeded login callout → redirect to `/sign-in`; if signed in, POST via server route that writes with a write token. Browser never holds the token.
3. **Schema shapes (fixed per AGENTS.md §8 + request fields):**
   - `trackedSearch` (type `trackedSearch`, not `tracked-searches` for GROQ ergonomics, title "Tracked Searches") — `userId: string` (Clerk userId, unique indexed), `savedSearches: array<string|object>` — array of saved query strings + optional timestamp, `followedProducts: array<reference to product>` or `array<string>` of product slugs/ids if product docs exist. Keyed by `userId`. Singleton-per-user pattern via document id `trackedSearch.<userId>`; Studio hides creates, web writes via API.
   - `searchConfig` (type `searchConfig`, title "Search Config", singleton) — `scope: object { sources: array<string>, categories: array<string> }`, `instructions: text` (short deltas, query guidance from §11). Id `searchConfig`.
   - `product` (type `product`, title "Products") — fields you named: `title: string` (required), `slug: slug` (from title), `price: object { amount: number, currency: string, compareAtPrice?: number }` (Zod-validated at boundary), `listingSite: object { site: string, url: url }` (required — exact listing URL, never synthesized), `alternativeSellers: array<alternativeSeller>` where `alternativeSeller: object { seller: string, price: number, currency?: string, url: url, availability?: string }`. Also `image: image` (hotspot) for Studio preview even though runtime cards come from online thumbnails — needed for Studio visual parity.
4. **Studio structure:** Keep embedded Studio for now. `structure.ts` will pin singletons at top (`Search Config`, then `Tracked Searches` list), then `Products`. Hide `alternativeSeller` object from list. Use singleton pattern checks in `structure` and `initialValue` templates; do not allow duplicate `searchConfig`.
5. **TypeGen:** Add `sanity-typegen.json` if missing and run `sanity schema deploy` + `sanity typegen generate` so `sanity.types.ts` updates. Keep `useCdn: true` for read client, write via `serverClient` with token (not added in this task beyond wiring placeholder env `SANITY_API_WRITE_TOKEN`).
6. **Prospective files are all additive; no removal of online-search path.** Search API (§5) continues to call the LLM with online tooling; it will read `searchConfig` via server-only fetch helper but never write products.

## Files you expect to touch
- `sanity/schemaTypes/documents/product.ts` — new
- `sanity/schemaTypes/objects/alternativeSeller.ts` — new (or inline in product)
- `sanity/schemaTypes/objects/price.ts` — new (reusable amount/currency)
- `sanity/schemaTypes/objects/listingSite.ts` — new
- `sanity/schemaTypes/documents/trackedSearch.ts` — new
- `sanity/schemaTypes/documents/searchConfig.ts` — new
- `sanity/schemaTypes/index.ts` — register types (objects before documents)
- `sanity/structure.ts` — singleton pinning + filtering
- `sanity/lib/client.ts` — add server write client comment/placeholder and `token` wiring note (no token committed)
- `sanity/env.ts` — no change (already reads project/dataset)
- `.env.example` — append canonical list (`NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_READ_TOKEN`, `SANITY_API_WRITE_TOKEN`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` sanity)
- `sanity.config.ts` — no change unless plugin needed (keep vision/structure)
- `app/studio/[[...tool]]/page.tsx` — verify exists, else create thin wrapper re-exporting defineConfig (already via sanity.config.ts basePath handling)
- `app/api/saved-searches/route.ts` — skeleton POST that `auth()`-checks Clerk, validates Zod, uses write client by `userId` (only if not already present; otherwise add)
- `README.md` — optional: document product fields

Out of scope: full search API LLM wiring, PostHog instrumentation, catalog/product/merchant page rendering of saved state.

## Requirements
- Studio at `/studio` lists: Search Config (singleton), Tracked Searches, Products. Product form shows Title, Slug (auto), Price (amount/currency/comparison), Listing Site (site+URL with `uri` validation requiring http/https), Alternative Sellers (collapsible rows, each seller/price/URL required), Image.
- GROQ-ready: all references use `reference` fields; alternativeSellers is embedded objects not docs, so no lookup needed; `product{..., listingSite, alternativeSellers}` returns without joins.
- No product bulk write from search runtime; only Studio manual create and per-user writes to `trackedSearch`.
- Login gate: saving reuses Clerk `auth()` server-side; signed-out click shows login CTA (existing `/sign-in` route from `clerk init`).
- Validation: URL fields use `rule.uri({scheme:['http','https']})`; price amount `rule.min(0)`; title/slug `rule.required()`; alternativeSellers array may be empty.

## Security considerations
- `NEXT_PUBLIC_SANITY_DATASET` / `NEXT_PUBLIC_SANITY_PROJECT_ID` are public by design; `SANITY_API_READ_TOKEN` and `SANITY_API_WRITE_TOKEN` are server-only, never exposed to browser, used only in `sanity/lib/serverClient.ts` inside a Route Handler. Browser never calls Sanity write directly.
- Dataset is private (per AGENTS.md §12); read via token on server, not `useCdn: false` client without token.
- Clerk secret key server-only; only publishable key reaches browser; write of `trackedSearch` keyed by `auth().userId`, never trusting client-supplied userId.
- `.env.example` lists keys without values; never commit real tokens.

## Acceptance criteria
- `npm run lint` and `npx tsc --noEmit` pass.
- `npx sanity schema deploy` (or `sanity deploy` per installed CLI) succeeds against dataset `production` project `6agch6zz` (or reports no drift if already deployed).
- `npx sanity typegen generate` updates `sanity.types.ts` with `Product`, `TrackedSearch`, `SearchConfig`, `AlternativeSeller`, `Price`, `ListingSite` types.
- Visiting `/studio` shows three types: Products (can create with all four requested fields + slug/image), Search Config (single doc), Tracked Searches (list, filtered by userId in GROQ).
- `sanityFetch` query `*[_type=="product"][0]{title, price, listingSite, alternativeSellers}` returns typed data visible in Vision.

## Checks to run
- From repo root (web = root, Studio embedded): `npm run lint`, `npx tsc --noEmit`, `npx sanity schema deploy --dataset production` (dry-run if no token), `npx sanity typegen generate`, `npm run build --webpack` if routes changed.
- Studio deploy reported above; TypeGen file diff inspected.

## Exact manual test steps
1. `npm run dev` → open `http://localhost:3000/studio` → sign in to Studio with Sanity credentials for project 6agch6zz.
2. Create Product: Title "Test Headphones", Price 298/USD, Listing Site site "Amazon" url "https://www.amazon.com/dp/B0XXXX", add Alternative Seller seller "eBay" price 320 url "https://www.ebay.com/itm/123", Publish.
3. In Vision, run GROQ `*[_type=="product"]{title, price, listingSite, alternativeSellers}` → row appears.
4. As signed-out user on `/`, click Save search → see login CTA / redirect to `/sign-in` (existing Clerk route).
5. Sign in via Clerk, repeat search, click Save → network tab shows POST `/api/saved-searches` 200; Vision `*[_type=="trackedSearch" && userId=="<your Clerk id>"]` shows saved entry.
