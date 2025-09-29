import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header} from '~/components/Header';
import {SideMenu} from '~/components/SideMenu';
import {CartAside} from '~/components/CartAside';
import {SearchAside} from '~/components/SearchAside';
import {MobileMenuAside} from '~/components/MobileMenuAside';

interface PageLayoutProps {
  publicStoreDomain: string;
  mainMenu: MainMenuQuery;
  sideMenu: SideMenuQuery;
  cart: Promise<CartApiQueryFragment | null>;
  footer: Promise<FooterQuery | null>;
  subFooter: Promise<SubFooterQuery | null>;
  isLoggedIn: Promise<boolean>;
  children?: React.ReactNode;
}

export function PageLayout({
  publicStoreDomain,
  mainMenu,
  sideMenu,
  cart,
  footer,
  subFooter,
  isLoggedIn,
  children = null,
}: PageLayoutProps) {
  return (
    <Aside.Provider>
      <CartAside cart={cart} />
      <SearchAside />
      <MobileMenuAside
        mainMenu={mainMenu}
        sideMenu={sideMenu}
        publicStoreDomain={publicStoreDomain}
      />
      {mainMenu && (
        <Header
          mainMenu={mainMenu}
          cart={cart}
          isLoggedIn={isLoggedIn}
          publicStoreDomain={publicStoreDomain}
        />
      )}
      <main>
        {sideMenu && <SideMenu sideMenu={sideMenu} />}
        {children}
      </main>
      <Footer
        footer={footer}
        subFooter={subFooter}
        publicStoreDomain={publicStoreDomain}
      />
    </Aside.Provider>
  );
}
