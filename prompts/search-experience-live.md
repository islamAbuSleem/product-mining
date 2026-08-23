# Implementation Prompt: Search Experience — live online product search

## Goal
Turn the static home showcase into the live search experience from AGENTS.md §11. User types a plain-language product query, the server searches Amazon/eBay/Walmart live, the LLM ranks and structures results with Zod, and the UI streams two kinds of cards (deal results + product results) with count, sort, and empty state. Saving a search requires login (Clerk) and writes the tracked-searches record via the already-shipped `/api/saved-searches`.

## Skills you read
- `sanity-best-practices` — for reading `searchConfig` (scope + instructions) via server-only `sanityFetch`/`readClient`; GROQ for `*[_type=="searchConfig"][0]` not product content.
- `shape-your-agent` — for the inline system prompt tone/guardrails separation (critical ranking rules live in both prompt and `searchConfig.instructions`).
- `node_modules/next/dist/docs/` — App Router route handlers, server/client boundaries, `use` streaming and `Suspense` patterns for the search UI.

## Code you inspected
- `AGENTS.md` §1, §5, §7, §9–§11 — search is full results page, ranked, count + sort, two result kinds, live-first price resolution, grounded (exact listing URLs only), query expansion via agent.
- `app/page.tsx:43-281` — current static showcase (hero `Input` + `Mine Data` button, toggles, metrics, analytics, filters, `DealCard` grid). This becomes the interactive shell.
- `sanity/schemaTypes/documents/searchConfig.ts:1` — `scope {sources, categories}` + `instructions` text; singleton id `searchConfig`.
- `sanity/lib/serverClient.ts:1` + `sanity/lib/client.ts:1` + `sanity/lib/live.ts:5` — `readClient` authenticated, `client` unauthenticated, `sanityFetch`/`SanityLive` via `readClient` for private dataset.
- `app/api/saved-searches/route.ts:1` — `auth()`-gated POST with Zod `{query?, productId?}`, `SANITY_API_WRITE_TOKEN` server-only, id `trackedSearch.<userId>`.
- `components/deal-card.tsx:1` — presentational card already expects `merchant/title/image/price/originalPrice/dropLabel/href`; will receive live `listingSite.url` as href.
- `components/ui/*` and `components/layout/*` — tokens already in `app/globals.css:1`.

## Decisions and assumptions
1. **Live sources, not Sanity catalog.** Search never reads `product` docs. `product` docs exist for Studio seed/reference only. Route fetches `searchConfig` for `scope` allowlist (e.g. `["amazon","ebay","walmart"]`) and `instructions` deltas, then fans out to live source adapters.
2. **Two-stage price resolution** (§7/§9): hit live listings first; only if a source returns no live hit, include a dated/cached mention labeled as such. Never invent a URL.
3. **Structured output:** Route validates every result with Zod at the boundary. Markdown appears only in an optional `reply` string (rendered with `react-markdown` if used), but the UI primarily renders typed `DealResult`/`ProductResult`.
4. **System prompt in two places (§11/§12):** inline `SYSTEM_PROMPT` constant in the route plus `searchConfig.instructions` injected; critical rules duplicated because the model follows the inline prompt more reliably. Prompt is a template literal — escape backticks.
5. **Streaming:** Route uses Vercel AI SDK `streamText`/`streamObject` (OpenAI provider, `OPENAI_API_KEY` server-only) so the UI sees progressive results; context window protected by trimming raw source snippets to top N per source before sending to the model.
6. **Save-after-login:** Search itself is public. The `Save search` affordance is a Clerk-gated button: signed-out → modal `SignInButton`, signed-in → `POST /api/saved-searches {query}`; UI shows `saved-search` chips and a follow affordance that `POST`s `{productId}` via the same route.
7. **Scope depends on merged sanity model:** This prompt assumes PR #3 (`feat/product-mining-sanity-model` → `searchConfig`/`trackedSearch` + `/api/saved-searches`) is merged to `main` before this work lands. If not, this PR will be stacked on that branch.

## Files you expect to touch
- `app/api/search/route.ts` — new (POST {query, toggles?} → streamed `{count, sort, dealResults, productResults, reply?}` validated with Zod; reads `searchConfig`; calls online adapters + OpenAI)
- `lib/search/adapters/{amazon,ebay,walmart}.ts` — new (server-only fetchers returning normalized `RawListing {title, price, url, thumbnail?, site}`; each must be independently testable and return `[]` on failure, never throw)
- `lib/search/ranking.ts` — new (specificity ranking: title exact > keyword; shared with route unit tests)
- `lib/search/schema.ts` — new (Zod `DealResult` `ProductResult` + `SearchResponse`)
- `lib/search/systemPrompt.ts` — new (escaped template literal)
- `app/page.tsx` — turn static showcase into client-interactive page: controlled `query` state, `fetch('/api/search')` streaming, render `DealCard`/`ProductCard` from response, count header `Found X results across Y stores`, sort control (default relevance), empty state linking to catalog, save/follow buttons wired to Clerk + `/api/saved-searches`, PostHog `search_performed` / `deal_click_out` / `product_followed` events
- `components/search/*` — new small presentational helpers (`ResultsHeader`, `EmptyState`, `SaveSearchButton`, `FollowButton`) reusing existing UI tokens
- `sanity/lib/queries/searchConfig.ts` — new (GROQ `*[_type=="searchConfig"][0]{scope, instructions}`)
- `.env.example` — append `OPENAI_API_KEY=` (server-only)
- `package.json` — add `ai`, `@ai-sdk/openai`, `zod`, `react-markdown` if not present

Out of scope: catalog/product/merchant page data, My Searching page (reads `trackedSearch` list — follows this), Studio changes.

## Requirements
- `POST /api/search` with `{query: string}` (trimmed, 2–200 chars) reads `searchConfig`, fans out to allowed merchants (Amazon/eBay/Walmart) in parallel, trims each raw listing list to ≤5 snippets, injects `SYSTEM_PROMPT` + `searchConfig.instructions` + scope, calls OpenAI, validates with Zod, returns streamed JSON lines/NDJSON or `streamText` text stream the client can incrementally render.
- UI: as the reference design shows — header `Found N results across M stores` + `Sort by: Relevance` (client sort), two card kinds:
  - Deal result — merchant name/icon, product label (e.g. `Offer 2 in …`), thumbnail, discount, `matchedPrice`, short description; action opens product page with that offer highlighted (or exact `listingSite.url` as the click-out).
  - Product result — category, key features, short description; action opens product page.
- Merged ranking: product-title exact match beats broad keyword; deal and product streams interleaved by score; never cap to top K beyond natural ranking (return all relevant, UI paginates if needed).
- Grounded: every deal carries the exact `url` returned by its adapter; raw adapter payloads never leave the server.
- Save flow: public search, `Save` button checks Clerk; signed-out shows `SignInButton` modal, signed-in posts to `/api/saved-searches`.

## Security considerations
- `OPENAI_API_KEY`, `SANITY_API_READ_TOKEN`, `SANITY_API_WRITE_TOKEN`, `CLERK_SECRET_KEY` stay server-only (`process.env.*` without `NEXT_PUBLIC`); browser never calls Sanity, LLM, or source adapters directly.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SANITY_*` (projectId/dataset) may reach browser.
- `SANITY_API_WRITE_TOKEN` only inside `app/api/saved-searches` (already) and never in the search route (read-only).
- Rate-limit / markup-change tolerance: a single source failure yields `[]`, never fallback to invented data; trim raw pages before LLM to avoid context overflow.

## Acceptance criteria
- `npx tsc --noEmit` and `npm run lint` pass; `npm run build -- --webpack` succeeds.
- `curl -X POST http://localhost:3000/api/search -H 'Content-Type: application/json' -d '{"query":"Best noise-cancelling headphones under $200"}'` returns streamed JSON with `count`, `dealResults[]`, `productResults[]`, each deal has a real `url`.
- Visiting `/`, typing a query and pressing Mine Data streams cards; header shows count; sort control reorders client-side; empty query shows empty state with link to catalog.
- Signed-out Save → sign-in modal; signed-in Save → network `POST /api/saved-searches 200` and chip appears.

## Checks to run
- `npm run lint`, `npx tsc --noEmit`, `npx sanity schemas validate`, `npm run build -- --webpack`, and a live smoke `curl` against `/api/search` with a real query (requires `OPENAI_API_KEY` in `.env.local`).

## Exact manual test steps
1. Merge PR #3, then `npm run dev` → `http://localhost:3000/`.
2. Type `Best noise-cancelling headphones under $200` → Mine Data → see progress (StatusIndicator mining → synced) and cards appear.
3. Toggle sort → order changes but count stays.
4. Click a deal card's View Deal → product page with that offer highlighted (URL matches adapter's exact `url`).
5. As signed-out, click Save search → Clerk modal; sign in; click Save again → `trackedSearch.<userId>` in Vision shows the saved query.
