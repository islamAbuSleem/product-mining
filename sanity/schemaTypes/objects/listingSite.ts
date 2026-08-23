import {defineField, defineType} from 'sanity'

export const listingSite = defineType({
  name: 'listingSite',
  title: 'Listing Site',
  type: 'object',
  fields: [
    defineField({
      name: 'site',
      title: 'Site',
      type: 'string',
      description: 'Merchant name, e.g. Amazon',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Exact listing URL returned by the source',
      validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
    }),
  ],
})
