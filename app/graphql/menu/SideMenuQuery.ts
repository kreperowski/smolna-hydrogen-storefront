import {MENU_FRAGMENT} from '~/graphql/menu/MenuFragment';
import {SHOP_FRAGMENT} from '~/graphql/menu/ShopFragment';

export const SIDE_MENU_QUERY = `#graphql
    query SideMenu(
        $language: LanguageCode
        $country: CountryCode
    ) @inContext(language: $language, country: $country) {
        shop {
            ...Shop
        }
        menu(handle: "menu-boczne") {
            ...Menu
        }
    }
    ${SHOP_FRAGMENT}
    ${MENU_FRAGMENT}
` as const;
