import type {RawListing} from "./types"

function parsePrice(value: unknown): number | undefined {
  if (typeof value === "number") return value
  if (typeof value === "string") {
    const n = Number(value.replace(/[^0-9.]/g, ""))
    return Number.isFinite(n) ? n : undefined
  }
  return undefined
}

export async function fetchSerpApi(query: string, scope: string[]): Promise<RawListing[]> {
  const key = process.env.SERPAPI_KEY
  if (!key) return []
  const trimmed = query.trim()
  if (!trimmed) return []

  const params = new URLSearchParams({
    engine: "google_shopping",
    q: trimmed,
    api_key: key,
    gl: "us",
    hl: "en",
  })

  try {
    const res = await fetch(`https://serpapi.com/search.json?${params.toString()}`, {
      // SerpAPI is server-only; cache for 60s to avoid rate-limit hammering
      next: {revalidate: 60},
    })
    if (!res.ok) return []
    const data = (await res.json()) as {
      shopping_results?: Array<{
        title?: string
        product_link?: string
        product_photos?: string[]
        price?: string
        extracted_price?: number
        tag?: string
        source?: string
        snippet?: string
        extensions?: string[]
      }>
    }
    const results = data.shopping_results ?? []
    const allowed = scope.map((s) => s.toLowerCase())
    const listings: RawListing[] = []
    for (const r of results) {
      if (!r.title || !r.product_link) continue
      const site = (r.source ?? r.tag ?? "Unknown").trim() || "Unknown"
      if (allowed.length > 0 && !allowed.includes(site.toLowerCase())) continue
      const price = parsePrice(r.extracted_price ?? r.price)
      if (price === undefined) continue
      const thumb =
        (r as {thumbnail?: string; serpapi_thumbnail?: string; product_photos?: string[]}).thumbnail ??
        (r as {serpapi_thumbnail?: string}).serpapi_thumbnail ??
        r.product_photos?.[0]
      listings.push({
        title: r.title,
        price,
        originalPrice: parsePrice((r as {extracted_old_price?: number; old_price?: string}).extracted_old_price ?? (r as {old_price?: string}).old_price),
        url: r.product_link,
        thumbnail: thumb,
        site,
        description: r.snippet ?? r.extensions?.join(" ") ?? r.title,
      })
      if (listings.length >= 12) break
    }
    return listings
  } catch {
    return []
  }
}
