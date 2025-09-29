import {MENU_FRAGMENT} from '~/graphql/menu/MenuFragment';
import {SHOP_FRAGMENT} from '~/graphql/menu/ShopFragment';

export const MAIN_MENU_QUERY = `#graphql
    query MainMenu(
        $language: LanguageCode
        $country: CountryCode
    ) @inContext(language: $language, country: $country) {
        shop {
            ...Shop
        }
        menu(handle: "main-menu") {
            ...Menu
        }
    }
    ${SHOP_FRAGMENT}
    ${MENU_FRAGMENT}
` as const;
