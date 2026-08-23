import {createOpenRouter} from "@openrouter/ai-sdk-provider"
import {openai} from "@ai-sdk/openai"
import {generateObject} from "ai"
import {z} from "zod"

import {readClient} from "@/sanity/lib/serverClient"
import {searchConfigQuery} from "@/sanity/lib/queries/searchConfig"
import {fetchAllSources} from "@/lib/search/adapters"
import {rankDeals, rankProducts} from "@/lib/search/ranking"
import {SearchResponseSchema} from "@/lib/search/schema"
import {SYSTEM_PROMPT} from "@/lib/search/systemPrompt"

export const runtime = "nodejs"

const BodySchema = z.object({
  query: z.string().trim().min(2).max(200),
})

function toSnippet(title: string, price: number, site: string, url: string): string {
  return `${title} — ${site} — $${price} — ${url}`.slice(0, 200)
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null)
  const parsed = BodySchema.safeParse(json)
  if (!parsed.success) {
    return Response.json({error: "Invalid query", details: parsed.error.flatten()}, {status: 400})
  }
  const {query} = parsed.data

  let searchConfig: {scope?: {sources?: string[]; categories?: string[]}; instructions?: string} | null = null
  try {
    searchConfig = await readClient.fetch(searchConfigQuery)
  } catch {
    searchConfig = null
  }

  const scopeSources: string[] = searchConfig?.scope?.sources ?? []
  const instructions: string = searchConfig?.instructions ?? ""

  const rawListings = await fetchAllSources(query, scopeSources)

  const snippets = rawListings.slice(0, 5).map((r) => toSnippet(r.title, r.price, r.site, r.url))

  const fullPrompt = `${SYSTEM_PROMPT}

## Search config
Scope sources: ${scopeSources.join(", ") || "all"}
Instructions: ${instructions || "(none)"}

## Live source snippets (trimmed, at most 5)
${snippets.join("\n") || "(no live snippets — use exact query match only)"}

## User query
${query}

Rank by specificity and return JSON.`

  let llmData: z.infer<typeof SearchResponseSchema> | null = null

  const openRouterKey = process.env.OPENROUTER_API_KEY
  const openRouterModel = process.env.OPENROUTER_MODEL ?? "meta-llama/llama-3.1-8b:free"

  if (openRouterKey) {
    try {
      const openrouter = createOpenRouter({apiKey: openRouterKey})
      const {object} = await generateObject({
        model: openrouter(openRouterModel),
        system: fullPrompt,
        prompt: `Query: ${query}. Sources:\n${snippets.join("\n")}`,
        schema: SearchResponseSchema,
      })
      llmData = object
    } catch {
      llmData = null
    }
  } else if (process.env.OPENAI_API_KEY) {
    try {
      const {object} = await generateObject({
        model: openai("gpt-4o-mini"),
        system: fullPrompt,
        prompt: `Query: ${query}. Sources:\n${snippets.join("\n")}`,
        schema: SearchResponseSchema,
      })
      llmData = object
    } catch {
      llmData = null
    }
  }

  if (llmData) {
    const validated = SearchResponseSchema.safeParse(llmData)
    if (validated.success) {
      const urlMap = new Map(rawListings.map((r) => [r.url, r]))
      const groundedDeals = validated.data.dealResults.map((d) => {
        const raw = urlMap.get(d.url)
        if (!raw) return null
        return {
          ...d,
          title: raw.title,
          price: raw.price,
          originalPrice: raw.originalPrice,
          thumbnail: raw.thumbnail,
          merchant: raw.site,
          productLabel: raw.title,
          description: raw.description ?? d.description,
          matchedPrice: raw.price,
          url: raw.url,
        }
      })
      if (groundedDeals.every(Boolean)) {
        const filteredDeals = groundedDeals as typeof validated.data.dealResults
        return Response.json({
          ...validated.data,
          dealResults: rankDeals(filteredDeals, query),
          productResults: validated.data.productResults,
        })
      }
    }
  }

  const dealResults = rankDeals(
    rawListings.map((r, i) => ({
      id: `deal-${i}`,
      merchant: r.site,
      productLabel: r.title,
      title: r.title,
      thumbnail: r.thumbnail,
      price: r.price,
      originalPrice: r.originalPrice,
      discountAmount:
        r.originalPrice && r.originalPrice > r.price
          ? `${Math.round(((r.originalPrice - r.price) / r.originalPrice) * 100)}% OFF`
          : undefined,
      description: (r.description ?? r.title).slice(0, 200),
      url: r.url,
      matchedPrice: r.price,
    })),
    query,
  )

  const productMap = new Map<string, (typeof dealResults)[number]>()
  for (const d of dealResults) {
    if (!productMap.has(d.title)) productMap.set(d.title, d)
  }
  const productResults = rankProducts(
    Array.from(productMap.values()).map((d, i) => ({
      id: `product-${i}`,
      category: "General",
      title: d.title,
      keyFeatures: [d.description.slice(0, 80)],
      description: d.description.slice(0, 300),
      thumbnail: d.thumbnail,
    })),
    query,
  )

  const stores = new Set(rawListings.map((r) => r.site)).size

  const fallback = {
    count: dealResults.length + productResults.length,
    stores,
    dealResults,
    productResults,
  }

  const validatedFallback = SearchResponseSchema.parse(fallback)
  return Response.json(validatedFallback)
}
