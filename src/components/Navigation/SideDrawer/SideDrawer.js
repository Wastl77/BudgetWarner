import React, { Fragment } from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = props => {
  let attachedClasses = [styles.SideDrawer, styles.Close];
  if (props.open) {
    attachedClasses = [styles.SideDrawer, styles.Open];
  }
  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <nav>
          <NavigationItems
            isAuthenticated={props.isAuthenticated}
            isAdmin={props.isAdmin}
          />
        </nav>
      </div>
    </Fragment>
  );
};

export default sideDrawer;
