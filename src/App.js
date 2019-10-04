import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import "./App.css";

import MainContent from "./container/MainContent/MainContent";
import Layout from "./hoc/Layout/Layout";
import BudgetInputForm from "./container/BudgetInputForm/BudgetInputForm";
import Auth from "./container/Auth/Auth";

class App extends Component {
  render() {
    const routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/admin" component={BudgetInputForm} />
        <Route path="/" exact component={MainContent} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

export default withRouter(App);
