import {fetchAmazon} from "./amazon"
import {fetchEbay} from "./ebay"
import {fetchSerpApi} from "./serpapi"
import {fetchWalmart} from "./walmart"
import type {RawListing} from "./types"

export async function fetchAllSources(query: string, scope: string[]): Promise<RawListing[]> {
  if (process.env.SERPAPI_KEY) {
    const live = await fetchSerpApi(query, scope)
    if (live.length > 0) return live.slice(0, 15)
  }
  const results = await Promise.all([fetchAmazon(query, scope), fetchEbay(query, scope), fetchWalmart(query, scope)])
  const merged = results.flat()
  return merged.slice(0, 15)
}
