import type {Adapter} from "./types"
import {getMockListings} from "./mockData"

export const fetchWalmart: Adapter = async (query, scope) => {
  try {
    const allowed = scope.length === 0 || scope.map((s) => s.toLowerCase()).includes("walmart")
    if (!allowed) return []
    return getMockListings(query, ["walmart"])
  } catch {
    return []
  }
}
