import {createClient} from 'next-sanity'

import {apiVersion, dataset, projectId} from '../env'

export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  perspective: 'published',
})

export const readClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'published',
})
