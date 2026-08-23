export type RawListing = {
  title: string
  price: number
  originalPrice?: number
  url: string
  thumbnail?: string
  site: string
  description?: string
}

export type Adapter = (query: string, scope: string[]) => Promise<RawListing[]>
