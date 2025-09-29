import {Aside} from '~/components/Aside';

export function MobileMenuAside({
  mainMenu,
  sideMenu,
  publicStoreDomain,
}: {
  mainMenu: MainMenuQuery;
  sideMenu: SideMenuQuery;
  publicStoreDomain: string;
}) {
  return (
    <Aside type="mobile" heading="MENU">
      MOBILE MENU
      {/*<HeaderMenu*/}
      {/*  menu={header.menu}*/}
      {/*  viewport="mobile"*/}
      {/*  primaryDomainUrl={header.shop.primaryDomain.url}*/}
      {/*  publicStoreDomain={publicStoreDomain}*/}
      {/*/>*/}
    </Aside>
  );
}
