import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  useMatches,
} from 'react-router';
import {ComponentProps} from 'react';

type LinkProps = ComponentProps<typeof RouterLink>;

type NavLinkProps = ComponentProps<typeof RouterNavLink>;

export function Link(props: LinkProps | NavLinkProps) {
  const {to, className, ...resOfProps} = props;
  const [root] = useMatches();
  const selectedLocale = (root.data as any)?.selectedLocale;

  let toWithLocale = to;

  if (typeof to === 'string') {
    const parsedTo =
      to === '/en' || to.startsWith('/en/')
        ? to.slice(3)
        : to === '/'
          ? ''
          : to;

    toWithLocale = selectedLocale
      ? `${selectedLocale.pathPrefix === '/' ? '' : selectedLocale.pathPrefix.toLowerCase()}${parsedTo}`
      : parsedTo;
  }

  if (typeof className === 'function') {
    return (
      <RouterNavLink
        to={toWithLocale}
        className={className}
        {...(resOfProps as Omit<NavLinkProps, 'to' | 'className'>)}
      />
    );
  }

  return (
    <RouterLink
      to={toWithLocale}
      className={className}
      {...(resOfProps as Omit<LinkProps, 'to' | 'className'>)}
    />
  );
}

export function usePrefixPathWithLocale(path: string) {
  const [root] = useMatches();
  const selectedLocale = (root.data as any)?.selectedLocale;

  return selectedLocale
    ? `${selectedLocale.pathPrefix}${path.startsWith('/') ? path : '/' + path}`
    : path;
}
