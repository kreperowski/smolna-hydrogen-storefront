interface SideMenuProps {
  sideMenu: SideMenuQuery;
}

export function SideMenu({sideMenu}: SideMenuProps): JSX.Element {
  const {menu} = sideMenu;

  return <div className="side-menu">SIDE MENU</div>;
}
