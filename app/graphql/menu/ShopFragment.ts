export const SHOP_FRAGMENT = `#graphql
fragment Shop on Shop {
    primaryDomain {
        url
    }
    brand {
        logo {
            image {
                url
            }
        }
    }
}
` as const;
