import {defineArrayMember, defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'price',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'listingSite',
      title: 'Listing Site',
      type: 'listingSite',
      description: 'Primary merchant listing — exact URL from the source',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alternativeSellers',
      title: 'Alternative Sellers',
      type: 'array',
      description: 'Other sellers offering the same product',
      of: [defineArrayMember({type: 'alternativeSeller'})],
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image', price: 'price.amount', currency: 'price.currency'},
    prepare({title, media, price, currency}) {
      return {
        title,
        subtitle: typeof price === 'number' ? `${price} ${currency ?? ''}`.trim() : undefined,
        media,
      }
    },
  },
})
