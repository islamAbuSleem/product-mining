import type {DealResult, ProductResult} from "./schema"

export function scoreSpecificity(title: string, query: string): number {
  const t = title.toLowerCase()
  const q = query.toLowerCase().trim()
  if (!q) return 0
  if (t === q) return 100
  if (t.includes(q)) return 80
  const tokens = q.split(/\s+/).filter(Boolean)
  let hits = 0
  for (const token of tokens) {
    if (t.includes(token)) hits += 1
  }
  return Math.round((hits / tokens.length) * 60)
}

export function rankDeals(deals: DealResult[], query: string): DealResult[] {
  return [...deals].sort((a, b) => scoreSpecificity(b.title, query) - scoreSpecificity(a.title, query))
}

export function rankProducts(products: ProductResult[], query: string): ProductResult[] {
  return [...products].sort((a, b) => scoreSpecificity(b.title, query) - scoreSpecificity(a.title, query))
}
