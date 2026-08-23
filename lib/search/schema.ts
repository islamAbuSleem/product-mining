import {z} from "zod"

export const DealResultSchema = z.object({
  id: z.string(),
  merchant: z.string(),
  merchantIcon: z.string().optional(),
  productLabel: z.string(),
  title: z.string(),
  thumbnail: z.string().url().optional(),
  price: z.number().nonnegative(),
  originalPrice: z.number().optional(),
  discountAmount: z.string().optional(),
  description: z.string().max(300),
  url: z.string().url(),
  matchedPrice: z.number().optional(),
})

export const ProductResultSchema = z.object({
  id: z.string(),
  category: z.string(),
  title: z.string(),
  keyFeatures: z.array(z.string()).max(5),
  description: z.string().max(400),
  thumbnail: z.string().url().optional(),
})

export const SearchResponseSchema = z.object({
  count: z.number().int().nonnegative(),
  stores: z.number().int().nonnegative(),
  dealResults: z.array(DealResultSchema),
  productResults: z.array(ProductResultSchema),
  reply: z.string().optional(),
})

export type DealResult = z.infer<typeof DealResultSchema>
export type ProductResult = z.infer<typeof ProductResultSchema>
export type SearchResponse = z.infer<typeof SearchResponseSchema>
