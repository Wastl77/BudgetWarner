import * as actionTypes from "./actionTypes";

export const onLogin = payload => {
  return {
    type: actionTypes.ON_LOGIN,
    payload: payload
  };
};
