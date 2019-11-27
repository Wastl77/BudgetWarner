import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Error from '../../components/UI/Error/Error';

import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onLogin({
      email: this.state.email,
      password: this.state.password
    });
  };

  onChangedHandler = (event, id) => {
    this.setState({
      [id]: event.target.value
    });
  };

  onErrorConfirmed = () => {
    this.props.onAuthErrorConfirmed();
  };

  render() {
    let form = (
      <form onSubmit={this.submitHandler} className={styles.LoginInput}>
        <input
          type='email'
          value={this.state.email}
          placeholder='Email'
          onChange={event => this.onChangedHandler(event, 'email')}
        />
        <input
          type='password'
          value={this.state.password}
          placeholder='Passwort'
          onChange={event => this.onChangedHandler(event, 'password')}
        />
        <Button btnType='Continue'>Login</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    if (this.props.error) {
      form = (
        <Error
          errorMessage={this.props.error}
          errorConfirmHandler={this.onErrorConfirmed}
        />
      );
    }

    return form;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: payload => dispatch(actions.onLogin(payload)),
    onAuthErrorConfirmed: () => dispatch(actions.confirmAuthError())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
