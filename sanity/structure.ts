import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Slot Reviews')
        .child(
          S.documentList()
            .title('Slot Reviews')
            .filter('_type == "slotReview"')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),
    ]);
