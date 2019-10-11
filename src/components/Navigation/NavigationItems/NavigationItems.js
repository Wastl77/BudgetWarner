import React from "react";

import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" exact>
      Startseite
    </NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link="/admin">Admin</NavigationItem>
    ) : null}
    {props.isAuthenticated ? (
      <NavigationItem link="/logout">Logout</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Login</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
