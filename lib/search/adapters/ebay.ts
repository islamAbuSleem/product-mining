import type {Adapter} from "./types"
import {getMockListings} from "./mockData"

export const fetchEbay: Adapter = async (query, scope) => {
  try {
    const allowed = scope.length === 0 || scope.map((s) => s.toLowerCase()).includes("ebay")
    if (!allowed) return []
    return getMockListings(query, ["ebay"])
  } catch {
    return []
  }
}
