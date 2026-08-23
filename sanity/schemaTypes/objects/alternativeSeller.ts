import {defineField, defineType} from 'sanity'

export const alternativeSeller = defineType({
  name: 'alternativeSeller',
  title: 'Alternative Seller',
  type: 'object',
  fields: [
    defineField({
      name: 'seller',
      title: 'Seller',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
      options: {
        list: [
          {title: 'USD', value: 'USD'},
          {title: 'EUR', value: 'EUR'},
          {title: 'GBP', value: 'GBP'},
        ],
      },
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Exact listing URL for this alternative',
      validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          {title: 'In stock', value: 'inStock'},
          {title: 'Out of stock', value: 'outOfStock'},
          {title: 'Limited', value: 'limited'},
        ],
      },
    }),
  ],
  preview: {
    select: {seller: 'seller', price: 'price', currency: 'currency'},
    prepare({seller, price, currency}) {
      return {
        title: seller || 'Seller',
        subtitle: typeof price === 'number' ? `${price} ${currency ?? ''}`.trim() : undefined,
      }
    },
  },
})
