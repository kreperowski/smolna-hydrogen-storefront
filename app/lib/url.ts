export const parseUrl = (
  url: string,
  publicStoreDomain: string,
  primaryDomainUrl: string,
) => {
  return url.includes('myshopify.com') ||
    url.includes(publicStoreDomain) ||
    url.includes(primaryDomainUrl)
    ? new URL(url).pathname
    : url;
};
