import {MENU_FRAGMENT} from '~/graphql/menu/MenuFragment';

export const SIDE_MENU_QUERY = `#graphql
    query SideMenu(
        $language: LanguageCode
        $country: CountryCode
    ) @inContext(language: $language, country: $country) {
        menu(handle: "menu-boczne") {
            ...Menu
        }
    }
    ${MENU_FRAGMENT}
` as const;
