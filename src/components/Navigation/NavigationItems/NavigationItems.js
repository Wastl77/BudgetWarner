import React from "react";

import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" exact>
      Startseite
    </NavigationItem>
    <NavigationItem link="/admin">Admin</NavigationItem>
    <NavigationItem link="/auth">Login</NavigationItem>
  </ul>
);

export default navigationItems;
