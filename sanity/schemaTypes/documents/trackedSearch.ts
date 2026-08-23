import {defineArrayMember, defineField, defineType} from 'sanity'

export const trackedSearch = defineType({
  name: 'trackedSearch',
  title: 'Tracked Searches',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      type: 'string',
      description: 'Clerk user ID — document id is trackedSearch.<userId>',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'savedSearches',
      title: 'Saved Searches',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'savedSearch',
          fields: [
            defineField({name: 'query', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'savedAt', type: 'datetime', initialValue: () => new Date().toISOString()}),
          ],
          preview: {
            select: {query: 'query'},
            prepare({query}) {
              return {title: query}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'followedProducts',
      title: 'Followed Products',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'product'}]})],
    }),
  ],
  preview: {
    select: {userId: 'userId', savedCount: 'savedSearches', followedCount: 'followedProducts'},
    prepare({userId, savedCount, followedCount}) {
      const s = Array.isArray(savedCount) ? savedCount.length : 0
      const f = Array.isArray(followedCount) ? followedCount.length : 0
      return {
        title: userId || 'Tracked search',
        subtitle: `${s} saved · ${f} followed`,
      }
    },
  },
})
