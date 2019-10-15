import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import MainContent from "./container/MainContent/MainContent";
import Layout from "./hoc/Layout/Layout";
import BudgetInputForm from "./container/BudgetInputForm/BudgetInputForm";
import Auth from "./container/Auth/Auth";
import Logout from "./container/Auth/Logout/Logout";

import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={MainContent} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={MainContent} />
          <Redirect to="/" />
        </Switch>
      );
    }

    if (this.props.isAdmin) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/admin" component={BudgetInputForm} />
          <Route path="/" exact component={MainContent} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null,
    isAdmin: state.auth.userId === "g60PZDjuZrMKgFskQL6tTFB7szA2"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
