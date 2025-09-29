import {MENU_FRAGMENT} from '~/graphql/menu/MenuFragment';
import {SHOP_FRAGMENT} from '~/graphql/menu/ShopFragment';

export const FOOTER_QUERY = `#graphql
query Footer(
        $language: LanguageCode
        $country: CountryCode
    ) @inContext(language: $language, country: $country) {
        shop {
            ...Shop
        }
        menu(handle: "footer") {
            ...Menu
        }
    }
    ${SHOP_FRAGMENT}
    ${MENU_FRAGMENT}
` as const;
