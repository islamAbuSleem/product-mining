import type {Adapter} from "./types"
import {getMockListings} from "./mockData"

export const fetchAmazon: Adapter = async (query, scope) => {
  try {
    const allowed = scope.length === 0 || scope.map((s) => s.toLowerCase()).includes("amazon")
    if (!allowed) return []
    return getMockListings(query, ["amazon"])
  } catch {
    return []
  }
}
