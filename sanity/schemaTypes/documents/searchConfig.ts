import {defineArrayMember, defineField, defineType} from 'sanity'

export const searchConfig = defineType({
  name: 'searchConfig',
  title: 'Search Config',
  type: 'document',
  fields: [
    defineField({
      name: 'scope',
      title: 'Scope',
      type: 'object',
      fields: [
        defineField({
          name: 'sources',
          title: 'Sources',
          type: 'array',
          description: 'Allowed online sources or merchants, e.g. Amazon, eBay, Walmart',
          of: [defineArrayMember({type: 'string'})],
          options: {layout: 'tags'},
        }),
        defineField({
          name: 'categories',
          title: 'Categories',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
          options: {layout: 'tags'},
        }),
      ],
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'text',
      description: 'Short deltas the system prompt does not already make obvious (query guidance from section 11)',
      rows: 6,
    }),
  ],
  preview: {
    select: {instructions: 'instructions'},
    prepare({instructions}) {
      return {
        title: 'Search Config',
        subtitle: instructions ? `${String(instructions).slice(0, 80)}` : 'No instructions',
      }
    },
  },
})
