import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import mainMenu from '../../pages/main-menu';

import styles from './styles.module.css';

export default function SideMenu() {
  const location = useLocation();

  const menu = mainMenu;

  const menuItem = (m) => (
    <div className={styles.menuContent}>
      {/* <div>
        <img alt="icon" src={m.icon} />
      </div> */}
      <div>
        <span className="text-white">{m.label}</span>
      </div>
    </div>
  );

  const allMenu = [];
  function breakDownMenu(menus) {
    menus.forEach(m => {
      allMenu.push(m);
    });
  }
  breakDownMenu(menu);

  return (
    <ul className={styles.root}>
      {menu.map((m) => {
        const isActive = m.path === location.pathname ;

        return (
          <li className={isActive ? styles.active : undefined} key={m.path}>
          <Link
            className={styles.nonTextDecoration}
            to={m.path}
          >
            {menuItem(m)}
          </Link>
        </li>
        );
      })}
    </ul>
  );
}
