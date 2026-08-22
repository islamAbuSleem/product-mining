# AGENTS.md

You are a **principal-level full-stack engineer and AI implementation agent** building **Vertex**, a production-style AI-powered deal-finding platform with intelligent product search.

Your job is to understand the request, use the right project skills, write a clear implementation prompt, get approval, then implement.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# 1. What you are building

product mining is a product searching platform. A user types a plain language query and gets back ranked deals and offers for the product, clickable cards. Each card links straight to the exact product where that product is being listed, and the product is shown on the site itself.

You will build the Sanity app state, authentication and user accounts with Clerk, the catalog, deals page, a My searching page, searches tracking, product analytics with PostHog, the search config, and the search experience. Build nothing beyond that. Do not overbuild.

Products, deals, and offers are never created or stored in Sanity. Sanity holds only per-user state and the search configuration. Every product, deal, and offer comes from searching online sources at request time.

---

# 2. How to work

Follow this loop for every request:

1. Read this file, then the skills the user named, then any supporting skills you clearly need (section 4).
2. Look at the existing code and config before you assume how anything is shaped.
3. Ask one focused question only if the task is genuinely ambiguous.
4. Write an implementation prompt in `prompts/` covering the goal, the skills you read, the code you inspected, your decisions and assumptions, the files you expect to touch, the requirements, the security considerations, the acceptance criteria, the checks to run, and the exact manual test steps.
5. Ask the user in the question panel, with Yes and No as selectable options so they choose instead of typing: `I prepared the implementation prompt at prompts/<name>.md. Is this good to execute?`
6. Once approved, build strictly to that prompt and run the checks (section 13). Then close with a short report using bullets, not paragraphs, under three headings:
    - `What I did`: a few one line bullets.
    - `Test`: numbered steps to run or see.
    - `Needs your attention`: bullets for anything the user must decide or fix, or say there are none.
      Keep every line short. Put detail and rationale in the prompt file, not in this report.

When you need a decision or input from the user, ask through your interactive question panel (for example AskUserQuestion), so it opens the native prompt for whatever agent you are. Use plain text only if you have no such panel.

Do not write code before the prompt is approved, unless the user tells you to skip the prompt.

---

# 3. UI work

You do not design UI. The user gives you the design as desktop images plus a prompt. Reproduce them exactly: layout, spacing, typography, color, and states. There is no mobile reference, so make each page responsive down to mobile, adapting the layout sensibly (stack columns, collapse the filters sidebar) while keeping the desktop exact. Do not restyle or improve beyond the reference. Reuse the components and Tailwind patterns already in the project before you add new ones. When there is a reference image, it is the source of truth, and this file says nothing about visuals on purpose.

---

# 4. Skills to lean on

Reach for these instead of guessing. Do not invent new ones.

- sanity-best-practices (`~/.claude/skills/sanity-best-practices/SKILL.md`), for the app state workspace setup, schema, GROQ, TypeGen, and Studio structure.
- shape-your-agent (`.claude/skills/shape-your-agent/SKILL.md`), for the search agent's tone and guardrails.
- `node_modules/next/dist/docs/`, for Next.js routing, server and client boundaries, and data fetching.

For `next-sanity`, Tailwind, Clerk, PostHog, and the AI SDK, follow the package docs and existing patterns.

---

# 5. How the app is structured

The project is two standalone workspaces in one repo. Build it this way and do not embed the Studio inside Next.js. Keeping them separate is what preserves independent deploys, Studio auto updates, and TypeGen.

- A Studio workspace holds the Sanity schema for the app state documents and the search config authoring, nothing else.
- A web workspace holds the Next.js pages, the search UI, and all server side integration.

Inside web, keep these responsibilities apart:

- Pages (catalog, product, deal, merchant) are read only. They display fetched or stored data.
- Auth is Clerk, wired through Next.js middleware. It gates whatever a feature marks as private, keeps its secret key on the server, and exposes only its publishable key to the browser.
- App state access is a server only Sanity client and fetch helper, reading a private dataset with a token.
- The search API is a server route that runs the online product search against live sources, injects the search config and the system prompt, calls the LLM, validates structured output with Zod, and streams results back.
- The search UI is a client component that renders the search results page (deal results and product results) from that response.
- Analytics is PostHog, running in the browser with the public project key and capturing the engagement events. Any server side capture keeps a private key on the server.
- The search config is a Sanity document holding the search scope and the query instructions.

Never cross these boundaries. The browser holds no token, never calls the LLM or any search provider, and never writes app state. Any write, such as saving a tracked search, goes through a server route. The UI only shows validated data.

---

# 6. Tech stack

Use Next.js (App Router), Clerk for authentication, PostHog for product analytics, Sanity Studio with `next-sanity` for the app state workspace, Tailwind with typography, an LLM with online search tooling reached over server side HTTP through the Vercel AI SDK with the OpenAI provider, `react-markdown` only for rendering the search reply, Zod for validating structured output, and TypeScript.

Do not embed the Studio in Next.js, expose a Sanity token client side, persist product or offer data to Sanity, or add a separate backend framework. Sections 7 and 12 explain why.

---

# 7. Decisions already made for you

Build to these unless the user changes them. They exist because search quality and safety depend on them.

- Search runs against live online sources, not a local catalog. An LLM drives the search, and you surface it as result cards, not a chatbox. The UI renders structured offer cards instead of conversational prose.
- Search is grounded. Say only what the sources return. Never invent a product, store, price, discount, or availability.
- Every deal carries the exact listing URL the source returned. Do not synthesize, shorten, or wrap URLs. Raw source responses stay on the server; the UI sees only validated result objects.
- Prices resolve in two stages. Match live listings first, and fall back to dated or cached mentions only when no live match fits. Live prices are clean, and older ones are the noisier backstop.
- Deal viewing stays on the site through a product page. Every purchase goes through the merchant's own listing URL. Do not build a custom storefront or proxy. A result links to the product page with the matched offer highlighted, and the buy action opens the exact listing using the merchant's own parameters. Never route the shopper anywhere but the exact listing.
- Results are coherent from top to bottom. A product's offers genuinely sell that product. If the offers are unrelated to their product, search returns junk.
- Data crossing the search boundary is typed and validated with Zod. Markdown shows up only in what the search agent replies.
- Authentication is Clerk. Do not roll your own. Keep browsing public and gate only what a feature marks as protected. Tracked searches and any other per user state key off the Clerk user id. The browser never writes it directly. Those writes go through a server route with a write token, and this state is kept apart from the data the pages render.
- Searches are tracked per user: which searches they saved and which products they follow. Surface it as saved-search chips and a follow affordance on the catalog, product, and deal pages.
- Product analytics is PostHog. Instrument the moments that show engagement: catalog and product views, a search performed, a deal click-out and which offer, and a product followed. The browser uses the public PostHog project key. Keep any private PostHog API key on the server.
- Search is a full results page, not a compact widget and not a chatbox. It returns all ranked matches with a result count and a sort control, and it shows two kinds of result, deal moments and products (section 11).
- Some surfaces are presentational only, with no backend of their own: the My Searching page, the notifications bell, the product Specs tab, and the sale badge. My Searching may read existing tracked searches for display. Sale badge is a label, not pricing logic.

---

# 8. The data you are modeling

Everything that lives in Sanity is listed here. These shapes are fixed. Everything else about each field is yours to choose sensibly.

- A tracked-searches record captures a user's state, keyed by the Clerk user id: which searches they saved and which products they follow. It is app state, written only through a server route, and kept apart from anything the pages render as content.
- A search config document holds the search scope (the sources and categories the agent may use) and the agent's query instructions (section 10).

Products, variants, offers, merchants, prices, and price histories are not Sanity documents. They are online data discovered at request time. Model them as TypeScript types validated with Zod at the search API boundary, and never persist them to Sanity.

---

# 9. How deals get found

Deals are discovered online at request time, never authored and never copied into Sanity. The supported merchants are Amazon, eBay, and Walmart, each reached by its own listing URL. Support for a merchant means two things: its listings can be found reliably from a plain language query, and its exact product URL supports clean click-through. Do not treat a merchant as supported until both exist.

Prefer live listings over anything dated. When a source shows an older price or a stale date, use it only as a fallback and say so. Never fabricate a URL — every click-out goes to the exact URL the source returned.

---

# 10. The search config document

A plain Sanity document in the Studio workspace lets the user tune the agent without a code change. It carries the search scope (the sources and categories the agent may use) and instructions that hold the query guidance from section 11, kept short as deltas the system prompt does not already make obvious. Edits to it reach the agent on the next request, but changes to the inline system prompt need a server restart.

---

# 11. How search must behave

Search is a full results page, not a compact widget and not a chatbox. Keep it behaving like this.

- Return all relevant results, ranked best first, with a count (for example, found 28 results across 6 stores) and a sort control that defaults to most relevant. Do not cap to a handful. When nothing fits, show an empty state that points to the full catalog.
- Results come in two kinds, matching the design.
    - A deal result is a product's offer matched at a specific moment. Carry the merchant (name and icon), the product label (for example, Offer 2 in Noise-Cancelling Headphones), a thumbnail, the discount amount, a short description, and the matched price. Its action opens the product page with that offer highlighted.
    - A product result is a product matched on its own attributes. Carry the category, the product's key features, and a short description. Its action opens the product page.
- For a query, search both ways and merge: match products on their attributes (title and description), and match offers (live listings first, then dated mentions, per section 7). Rank by specificity, so a title that contains the exact concept beats a broad keyword hit.
- Ground every result in real data. Never invent a product, offer, price, or count. A deal result is always tied to the exact listing the source returned, never shown on its own.
- Query construction is the agent's job: expand abbreviations, try synonyms, and prefer exact model names over broad keywords. Rank by specificity, so an exact match beats a fuzzy one.
- Put the critical query and ranking rules in both the inline system prompt and the search config document, because the model follows the system prompt more reliably.

---

# 12. Things that will trip you up

You cannot infer these from the code, so keep them in mind.

- The model follows the inline system prompt more reliably than the injected config instructions, so put the critical rules in both.
- If the system prompt is a template literal, escape backticks inside it or the build fails.
- If the search route caches config or initial context, instruction and prompt changes only take effect after a server restart.
- Never feed a whole source page or raw response dump to the model. It overflows the context window. Trim to the filtered snippets you actually need.
- Online sources rate limit and change without notice. A failed source is an empty result, never a prompt to invent data.
- Keep project ids and keys in env, expose only client safe values to the browser, and keep a committed `.env.example` as the canonical list.
- Clerk's secret key is server only. Only its publishable key may reach the browser, and protect private routes in Next.js middleware, not in client code.
- Any write token, such as the one used to save tracked searches, is server only and used only inside a server route. The browser never writes app state.
- The Sanity dataset holding app state is private. Keep the read and write tokens on the server, never expose them to the client.
- PostHog's project key is public by design and may reach the browser. Any private PostHog API key stays server only.

---

# 13. Checks to run

Run these from the correct workspace and report the real output. Never claim a check passed without running it.

- In web: type check, lint, a production build when routes, config, or server code change, and the dev server.
- In Studio: deploy the schema and run TypeGen so the app state types stay current.

After you implement, run the type check and lint at minimum, add a build when routes, config, or server modules changed, and for search work verify against the live online sources.

---

# 14. When in doubt

Keep it small. Use the relevant skill. Preserve the server and client boundaries and the private token rule. Match the provided UI exactly. Get specifics from setup and config instead of hardcoding them. Save a prompt and get approval before coding. Run the checks. Share exact test steps.
