import {MENU_FRAGMENT} from '~/graphql/menu/MenuFragment';

export const SUB_FOOTER_QUERY = `#graphql
query Footer(
        $language: LanguageCode
        $country: CountryCode
    ) @inContext(language: $language, country: $country) {
        menu(handle: "subfooter") {
            ...Menu
        }
    }
    ${MENU_FRAGMENT}
` as const;
