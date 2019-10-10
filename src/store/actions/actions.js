export const SET_INITIAL_STATE = "SET_INITIAL_STATE";
export const ON_STORE_SPENDING = "ON_STORE_SPENDING";
export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const TOGGLE_LOADING = "TOGGLE_LOADING";
export const ON_BUDGET_INPUT_CHANGED = "ON_BUDGET_INPUT_CHANGED";
export const ON_LOGIN = "ON_LOGIN";

export const setInitialState = payload => {
  return {
    type: SET_INITIAL_STATE,
    payload: payload
  };
};

export const onStoreSpending = payload => {
  return {
    type: ON_STORE_SPENDING,
    payload: payload
  };
};

export const toggleModal = () => {
  return {
    type: TOGGLE_MODAL
  };
};

export const toggleLoading = () => {
  return {
    type: TOGGLE_LOADING
  };
};

export const onBudgetInputChanged = payload => {
  return {
    type: ON_BUDGET_INPUT_CHANGED,
    payload: payload
  };
};

export const onLogin = payload => {
  return {
    type: ON_LOGIN,
    payload: payload
  };
};
