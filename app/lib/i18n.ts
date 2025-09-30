import {
  CountryCode,
  LanguageCode,
} from '@shopify/hydrogen/storefront-api-types';
import {useMatches} from 'react-router';

export type Locale = {
  language: LanguageCode;
  country: CountryCode;
  pathPrefix: string;
};

export const DEFAULT_LOCALE: Locale = {
  language: 'PL',
  country: 'PL',
  pathPrefix: '/',
};

export const SUPPORTED_LOCALES: Locale[] = [
  DEFAULT_LOCALE,
  {language: 'EN', country: 'PL', pathPrefix: '/en'},
];

const RE_LOCALE_PREFIX = /^[a-z]{2}$/i;

function getFirstPathPart(url: URL): string | null {
  return (
    url.pathname
      .split('/')
      .at(1)
      ?.replace(/\.data$/, '')
      ?.toUpperCase() ?? null
  );
}

export function getLocaleFromRequest(request: Request): Locale {
  const firstPathPart = getFirstPathPart(new URL(request.url));

  let pathPrefix = '';

  if (firstPathPart == null || !RE_LOCALE_PREFIX.test(firstPathPart)) {
    return DEFAULT_LOCALE;
  }

  pathPrefix = '/' + firstPathPart;

  return {
    language: pathPrefix.toLowerCase() === '/en' ? 'EN' : 'PL',
    country: 'PL',
    pathPrefix,
  };
}

export interface WithLocale {
  selectedLocale: Locale;
}

export function useSelectedLocale(): Locale | null {
  const [root] = useMatches();
  const {selectedLocale} = root.data as WithLocale;

  return selectedLocale ?? null;
}

export function localeMatchesPrefix(localeSegment: string | null): boolean {
  const prefix = '/' + (localeSegment ?? '');
  return SUPPORTED_LOCALES.some((supportedLocale) => {
    return supportedLocale.pathPrefix.toUpperCase() === prefix.toUpperCase();
  });
}
