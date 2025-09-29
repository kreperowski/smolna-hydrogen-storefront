export const HOMEPAGE_METAOBJECT_QUERY = `#graphql
query HomepageMetaobject(
    $handle: MetaobjectHandleInput!
    $language: LanguageCode
) @inContext(language: $language) {
    homepage: metaobject(handle: $handle) {
        id
        handle
        metaPola: field(key: "meta_pola") {
            reference {
                ... on Metaobject {
                    id
                    handle
                    title: field(key: "tytul") { value }
                    desc:  field(key: "opis")  { value }
                }
            }
        }
    }
}
`;
