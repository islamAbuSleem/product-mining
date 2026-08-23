import {type SchemaTypeDefinition} from 'sanity'
import {alternativeSeller} from './objects/alternativeSeller'
import {listingSite} from './objects/listingSite'
import {price} from './objects/price'
import {product} from './documents/product'
import {searchConfig} from './documents/searchConfig'
import {trackedSearch} from './documents/trackedSearch'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [price, listingSite, alternativeSeller, product, searchConfig, trackedSearch],
}
