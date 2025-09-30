import {Fragment, Suspense} from 'react';
import {Await, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
// @ts-expect-error import svg as react component
import IcnCart from '~/assets/icons/icn-cart.svg?react';
// @ts-expect-error import svg as react component
import IcnMenu from '~/assets/icons/icn-menu.svg?react';
import {Link} from '~/components/Link';
import {parseUrl} from '~/lib/url';

interface HeaderProps {
  mainMenu: MainMenuQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

export function Header({
  mainMenu,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {menu, shop} = mainMenu;

  return (
    <header className="flex items-center md:px-5 h-[61px] fixed top-0 left-0 right-0 z-10 border-b border-border">
      <HeaderMenu
        menu={menu}
        primaryDomainUrl={shop.primaryDomain.url}
        isLoggedIn={isLoggedIn}
        publicStoreDomain={publicStoreDomain}
        cart={cart}
      />
    </header>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  isLoggedIn,
  publicStoreDomain,
  cart,
}: {
  menu: HeaderProps['mainMenu']['menu'];
  primaryDomainUrl: HeaderProps['mainMenu']['shop']['primaryDomain']['url'];
  isLoggedIn: HeaderProps['isLoggedIn'];
  publicStoreDomain: HeaderProps['publicStoreDomain'];
  cart: HeaderProps['cart'];
}) {
  const {close} = useAside();

  return (
    <nav
      className="flex items-center justify-end w-full h-full"
      role="navigation"
    >
      <HeaderMenuMobileToggle />
      <div className="max-sm:hidden flex items-center">
        {menu?.items.map((item: any) => {
          if (!item.url) return null;

          const url = parseUrl(item.url, publicStoreDomain, primaryDomainUrl);

          return (
            <Fragment key={item.id}>
              <Link
                to={url}
                className="mx-5 text-white/80 hover:text-white text-[15px] leading-[60px] transition-colors"
                onClick={close}
                prefetch="intent"
                end
              >
                {item.title}
              </Link>
              <span className="w-px h-4 bg-border" />
            </Fragment>
          );
        })}
      </div>
      <Link
        to="/account"
        className="mx-5 text-white/80 hover:text-white text-[15px] leading-[60px] transition-colors"
        onClick={close}
        prefetch="intent"
      >
        <Suspense fallback="LOGIN">
          <Await resolve={isLoggedIn} errorElement="LOGIN">
            {(isLoggedIn) => (isLoggedIn ? 'ACCOUNT' : 'LOGIN')}
          </Await>
        </Suspense>
      </Link>
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();

  return (
    <button
      className="xl:hidden mr-auto p-5 border-x max-md:border-l-0 border-border cursor-pointer"
      onClick={() => open('mobile')}
    >
      <IcnMenu className="size-5" />
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <button
      className="relative flex items-center justify-center ml-1 p-5 border-x max-md:border-r-0 border-border cursor-pointer"
      type="button"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
    >
      <IcnCart className="size-5" />
      {!!count && (
        <span className="text-white flex items-center justify-center bg-border/80 absolute rounded-full translate-x-3 -translate-y-3 size-4 text-xs">
          {count}
        </span>
      )}
    </button>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);

  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}
