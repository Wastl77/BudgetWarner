import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import styles from "./Auth.module.css";
import * as actionCreators from "../../store/actions/actions";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  submitHandler = event => {
    event.preventDefault();

    this.props.toggleLoading();

    const APIKey = process.env.REACT_APP_API_KEY;
    const loginData = {
      email: this.state.email,
      password: this.state.password,
      returnSecureToken: true
    };

    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKey}`,
        loginData
      )
      .then(response => {
        console.log(response.data);
        this.props.onLogin({
          idToken: response.data.idToken,
          userId: response.data.localId
        });
        this.props.toggleLoading();
      })
      .catch(error => {
        console.log(error);
        this.props.toggleLoading();
      });
  };

  onChangedHandler = (event, id) => {
    this.setState({
      [id]: event.target.value
    });
  };

  render() {
    let form = (
      <form onSubmit={this.submitHandler} className={styles.LoginInput}>
        <input
          type="email"
          value={this.state.email}
          placeholder="Email"
          onChange={event => this.onChangedHandler(event, "email")}
        />
        <input
          type="password"
          value={this.state.password}
          placeholder="Passwort"
          onChange={event => this.onChangedHandler(event, "password")}
        />
        <Button btnType="Continue">Login</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return form;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.main.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: payload => dispatch(actionCreators.onLogin(payload)),
    toggleLoading: () => dispatch(actionCreators.toggleLoading())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
