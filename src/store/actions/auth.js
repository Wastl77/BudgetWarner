import axios from "axios";

import * as actionTypes from "./actionTypes";

export const onLogin = payload => {
  return dispatch => {
    dispatch(authStart());

    const APIKey = process.env.REACT_APP_API_KEY;
    const loginData = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true
    };

    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKey}`,
        loginData
      )
      .then(response => {
        console.log(response.data);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("idToken", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        const authData = {
          idToken: response.data.idToken,
          userId: response.data.localId
        };
        dispatch(authSuccess(authData));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail({ error: error }));
      });
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = payload => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: payload
  };
};

export const authFail = payload => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: payload
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const logout = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("idToken");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        const authData = {
          idToken: token,
          userId: userId
        };
        dispatch(authSuccess(authData));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
