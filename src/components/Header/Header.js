import React from 'react';

import DrawerToggle from '../Navigation/SideDrawer/DrawerToggle/DrawerToggle';

import styles from './Header.module.css';

const header = () => {
  return (
    <header className={styles.Header}>
      <DrawerToggle />
      <h1>Budget Warner App</h1>
    </header>
  )
};

export default header;
