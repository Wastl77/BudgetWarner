import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import styles from './Layout.module.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Fragment>
        <Header drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuthenticated={this.props.isAuthenticated}
          isAdmin={this.props.isAdmin}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null,
    isAdmin: state.auth.userId === 'g60PZDjuZrMKgFskQL6tTFB7szA2'
  };
};

export default connect(mapStateToProps)(Layout);
