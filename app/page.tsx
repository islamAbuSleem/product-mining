"use client"

import {useState} from "react"
import {SignInButton, useUser} from "@clerk/nextjs"
import {TopNav} from "@/components/layout/top-nav"
import {Footer} from "@/components/layout/footer"
import {PageShell} from "@/components/layout/page-shell"
import {DealCard} from "@/components/deal-card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Toggle} from "@/components/ui/toggle"
import {Icon} from "@/components/ui/icon"
import {Select} from "@/components/ui/select"
import type {DealResult, ProductResult} from "@/lib/search/schema"

type SearchResponse = {
  count: number
  stores: number
  dealResults: DealResult[]
  productResults: ProductResult[]
  reply?: string
}

export default function Home() {
  const {isSignedIn} = useUser()
  const [query, setQuery] = useState("")
  const [sortBy, setSortBy] = useState("Ranked Value")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<SearchResponse | null>(null)
  const [saved, setSaved] = useState(false)

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault()
    const trimmed = query.trim()
    if (trimmed.length < 2) {
      setError("Enter at least 2 characters")
      return
    }
    setLoading(true)
    setError(null)
    setData(null)
    setSaved(false)
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({query: trimmed}),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? "Search failed")
      setData(json)
      if (typeof window !== "undefined" && (window as unknown as {posthog?: {capture: (e: string, p?: unknown) => void}}).posthog) {
        ;(window as unknown as {posthog: {capture: (e: string, p?: unknown) => void}}).posthog.capture("search_performed", {query: trimmed})
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed")
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!query.trim()) return
    try {
      const res = await fetch("/api/saved-searches", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({query: query.trim()}),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => null)
        throw new Error(j?.error ?? "Save failed")
      }
      setSaved(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed")
    }
  }

  async function handleFollow(productId: string) {
    try {
      await fetch("/api/saved-searches", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({productId}),
      })
      if (typeof window !== "undefined" && (window as unknown as {posthog?: {capture: (e: string, p?: unknown) => void}}).posthog) {
        ;(window as unknown as {posthog: {capture: (e: string, p?: unknown) => void}}).posthog.capture("product_followed", {productId})
      }
    } catch {
      // silent
    }
  }

  function sortedDeals(deals: DealResult[]) {
    if (sortBy === "Price: Low to High") return [...deals].sort((a, b) => a.price - b.price)
    if (sortBy === "Discount %") {
      return [...deals].sort((a, b) => {
        const da = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0
        const db = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0
        return db - da
      })
    }
    return deals
  }

  const hasResults = data && (data.dealResults.length > 0 || data.productResults.length > 0)

  return (
    <>
      <TopNav />
      <PageShell className="space-y-xl">
        <section>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-xl">
              <h1 className="text-display-lg text-on-surface mb-md">Professional Grade Market Intelligence</h1>
              <p className="text-body-lg text-on-surface-variant">
                Discover the optimal product strategy. Input plain language queries to analyze thousands of data points instantly.
              </p>
            </div>
            <form onSubmit={handleSearch} className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-card p-lg flex flex-col gap-lg">
              <div className="relative w-full flex items-center">
                <Input
                  variant="hero"
                  leadingIcon="search"
                  placeholder="e.g., 'Best noise-cancelling headphones under $200'"
                  aria-label="Product search"
                  className="pr-32"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="absolute right-sm z-10">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Mining..." : "Mine Data"}
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-md items-center justify-center pt-md border-t border-outline-variant">
                <Toggle label="Deep Search" />
                <Toggle label="Global Sources" defaultChecked />
                <Toggle label="Price Tracking" />
              </div>
            </form>
            {error ? <p className="text-body-md text-error mt-md text-center">{error}</p> : null}
          </div>
        </section>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-lg text-body-md text-on-surface-variant">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Mining live sources...
          </div>
        ) : null}

        {data ? (
          <section>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-md mb-lg">
              <div>
                <p className="text-label-md text-secondary mb-1">
                  {hasResults ? `Found ${data.count} results across ${data.stores} stores` : "No results"}
                </p>
                <h2 className="text-headline-md text-on-surface">
                  {hasResults ? `“${query}”` : `No matches for “${query}”`}
                </h2>
              </div>
              <div className="flex items-center gap-sm">
                {hasResults ? (
                  <>
                    <span className="text-label-md text-secondary">Sort by:</span>
                    <Select
                      options={["Ranked Value", "Price: Low to High", "Discount %"]}
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    />
                  </>
                ) : null}
                <div className="ml-2">
                  {isSignedIn ? (
                    <Button variant="secondary" onClick={handleSave} disabled={saved}>
                      {saved ? "Saved" : "Save search"}
                    </Button>
                  ) : (
                    <SignInButton mode="modal">
                      <Button variant="secondary">Save search</Button>
                    </SignInButton>
                  )}
                </div>
              </div>
            </div>

            {!hasResults ? (
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-xl text-center">
                <p className="text-body-lg text-on-surface mb-md">No deals matched that query.</p>
                <p className="text-body-md text-on-surface-variant mb-lg">Try a broader query or browse the full catalog.</p>
                <Button variant="primary" onClick={() => setQuery("")}>Clear search</Button>
              </div>
            ) : (
              <>
                {data.dealResults.length > 0 ? (
                  <>
                    <h3 className="text-title-md text-on-surface mb-md">Deals</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md mb-xl">
                      {sortedDeals(data.dealResults).map((deal) => (
                        <div key={deal.id} className="relative">
                          <DealCard
                            merchant={deal.merchant}
                            title={deal.title}
                            imageUrl={deal.thumbnail}
                            price={`$${deal.price.toFixed(2)}`}
                            originalPrice={deal.originalPrice ? `$${deal.originalPrice.toFixed(2)}` : undefined}
                            dropLabel={deal.discountAmount}
                            href={deal.url}
                          />
                          <button
                            type="button"
                            onClick={() => handleFollow(deal.id)}
                            className="absolute bottom-14 right-3 text-label-sm text-primary hover:underline bg-surface-container-lowest/90 px-2 py-1 rounded-sm"
                          >
                            Follow
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}

                {data.productResults.length > 0 ? (
                  <>
                    <h3 className="text-title-md text-on-surface mb-md">Products</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      {data.productResults.map((product) => (
                        <div key={product.id} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md">
                          <div className="text-label-sm text-secondary mb-1">{product.category}</div>
                          <h4 className="text-title-md text-on-surface mb-1">{product.title}</h4>
                          <ul className="list-disc list-inside text-body-md text-on-surface-variant mb-2">
                            {product.keyFeatures.map((f) => (
                              <li key={f}>{f}</li>
                            ))}
                          </ul>
                          <p className="text-body-md text-on-surface-variant mb-3">{product.description}</p>
                          <div className="flex gap-2">
                            <Button variant="primary" onClick={() => handleFollow(product.id)}>Follow</Button>
                            {product.thumbnail ? (
                              <a href={product.thumbnail} target="_blank" rel="noreferrer" className="text-label-md text-primary hover:underline inline-flex items-center gap-1">
                                View <Icon name="open_in_new" size={14} />
                              </a>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}

                {data.reply ? (
                  <div className="mt-xl bg-surface-container-low rounded-lg p-md border border-outline-variant">
                    <div className="prose prose-sm max-w-none text-body-md text-on-surface" dangerouslySetInnerHTML={{__html: data.reply}} />
                  </div>
                ) : null}
              </>
            )}
          </section>
        ) : null}
      </PageShell>
      <Footer />
    </>
  )
}
