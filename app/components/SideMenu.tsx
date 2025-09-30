import {Image} from '@shopify/hydrogen';
import LogoSmolna from '~/assets/images/logo-smolna.png';
import {Link} from '~/components/Link';
import {parseUrl} from '~/lib/url';
import {Badge} from '~/components/Badge';
import {ConditionalWrapper} from '~/components/ConditionalWrapper';
import IcnArrowTopRight from '~/assets/icons/icn-arrow-top-right.svg?react';

interface SideMenuProps {
  sideMenu: SideMenuQuery;
  publicStoreDomain: string;
}

export function SideMenu({
  sideMenu,
  publicStoreDomain,
}: SideMenuProps): JSX.Element {
  const {menu, shop} = sideMenu;
  console.log(menu);

  return (
    <div className="max-xl:hidden fixed z-10 top-0 left-5 w-[280px] h-dvh border-x border-border">
      <header className="px-5 h-[61px] flex items-center">
        <Link to="/" className="cursor-pointer" prefetch="intent" end>
          <Image
            src={LogoSmolna}
            width={135}
            height={20}
            alt="Smolna 38 logo"
          />
        </Link>
      </header>
      <nav className="flex flex-col gap-3.5 py-10 px-5 border-b border-border">
        {menu?.items.map((item: any) => {
          if (!item.url) return null;

          const url = parseUrl(
            item.url,
            publicStoreDomain,
            shop.primaryDomain.url,
          );

          const hasBadge = item.title === 'MUSIC';

          return (
            <div key={item.id}>
              <ConditionalWrapper
                condition={hasBadge}
                wrapper={(children) => (
                  <div className="flex items-center justify-start gap-2">
                    {children}
                    <Badge text="BRAND NEW!" />
                  </div>
                )}
              >
                <Link
                  to={url}
                  className="text-[15px] text-white/80 hover:text-white hover:font-medium transition-all"
                  prefetch="intent"
                  end
                >
                  {item.title}
                </Link>
              </ConditionalWrapper>
              {!!item.items.length && (
                <div className="flex flex-col gap-2.5 mt-2.5 pb-1.5 ml-3">
                  {item.items.map((subItem: any) => {
                    if (!subItem.url) return null;

                    const url = parseUrl(
                      subItem.url,
                      publicStoreDomain,
                      shop.primaryDomain.url,
                    );

                    return (
                      <Link
                        to={url}
                        className="text-[13px] text-white/80 hover:text-white hover:font-medium transition-all"
                        prefetch="intent"
                        key={`${item.id}:${subItem.id}`}
                        end
                      >
                        {subItem.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <div className="px-5 py-10 border-b border-border">
        <div className="bg-washed-red/10 border-l border-washed-red flex flex-col items-start justify-start p-4 gap-1.5 cursor-default opacity-50">
          <p className="text-washed-red text-[11px]">SOON!</p>
          <p className="text-white text-[15px] flex items-center gap-2">
            GO TO RADIO SMOLNA <IcnArrowTopRight className="size-3" />
          </p>
        </div>
      </div>
      <div className="px-5 py-10 border-b border-border">
        <div className="flex flex-col items-start justify-start gap-3.5">
          <Link
            to="/contact"
            className="text-[15px] text-white/80 hover:text-white hover:font-medium transition-all"
            prefetch="intent"
            end
          >
            CONTACT
          </Link>
          <>[TODO]</>
        </div>
      </div>
      <div className="px-5 py-10">
        <div className="flex flex-col items-start justify-start gap-1.5">
          <p className="text-washed-red text-[11px]">WHERE TO FIND US?</p>
          <p className="text-white text-[15px] font-medium">
            SMOLNA 38, 00-375 WARSAW
          </p>
        </div>
      </div>
    </div>
  );
}
