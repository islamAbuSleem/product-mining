import {defineQuery} from "next-sanity"

export const searchConfigQuery = defineQuery(`*[_type == "searchConfig" && _id == "searchConfig"][0]{
  scope,
  instructions
}`)
