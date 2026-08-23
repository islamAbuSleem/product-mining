import {defineField, defineType} from 'sanity'

export const price = defineType({
  name: 'price',
  title: 'Price',
  type: 'object',
  fields: [
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
      validation: (rule) => rule.required(),
      options: {
        list: [
          {title: 'USD', value: 'USD'},
          {title: 'EUR', value: 'EUR'},
          {title: 'GBP', value: 'GBP'},
        ],
      },
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare at Price',
      type: 'number',
      description: 'Original price before discount, if any',
      validation: (rule) => rule.min(0),
    }),
  ],
  preview: {
    select: {amount: 'amount', currency: 'currency'},
    prepare({amount, currency}) {
      return {
        title: typeof amount === 'number' ? `${amount} ${currency ?? ''}`.trim() : 'No price',
      }
    },
  },
})
