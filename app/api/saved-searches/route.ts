import {auth} from '@clerk/nextjs/server'
import {NextResponse} from 'next/server'
import {z} from 'zod'

import {serverClient} from '@/sanity/lib/serverClient'

const postSchema = z.object({
  query: z.string().trim().min(1).max(200).optional(),
  productId: z.string().optional(),
})

export async function GET() {
  const {userId} = await auth()
  if (!userId) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }
  const docId = `trackedSearch.${userId}`
  const doc = await serverClient.fetch(`*[_id == $id][0]`, {id: docId})
  return NextResponse.json({data: doc ?? null})
}

export async function POST(request: Request) {
  const {userId} = await auth()
  if (!userId) {
    return NextResponse.json({error: 'Unauthorized — login to save searches'}, {status: 401})
  }
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    return NextResponse.json({error: 'Missing SANITY_API_WRITE_TOKEN'}, {status: 500})
  }

  const json = await request.json().catch(() => null)
  const parsed = postSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({error: 'Invalid body', details: parsed.error.flatten()}, {status: 400})
  }
  const {query, productId} = parsed.data
  if (!query && !productId) {
    return NextResponse.json({error: 'Provide query or productId'}, {status: 400})
  }

  const docId = `trackedSearch.${userId}`

  await serverClient.createIfNotExists({
    _id: docId,
    _type: 'trackedSearch',
    userId,
    savedSearches: [],
    followedProducts: [],
  })

  const patch = serverClient.patch(docId)

  if (query) {
    patch.setIfMissing({savedSearches: []})
    patch.append('savedSearches', [{query, savedAt: new Date().toISOString(), _key: `${Date.now()}`}])
  }

  if (productId) {
    patch.setIfMissing({followedProducts: []})
    patch.append('followedProducts', [{_ref: productId, _type: 'reference', _key: `${Date.now()}_p`}])
  }

  const updated = await patch.commit({autoGenerateArrayKeys: true})

  return NextResponse.json({data: updated})
}
