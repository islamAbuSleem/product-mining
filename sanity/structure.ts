import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Search Config')
        .id('searchConfig')
        .child(S.document().schemaType('searchConfig').documentId('searchConfig')),
      S.divider(),
      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('trackedSearch').title('Tracked Searches'),
    ])
