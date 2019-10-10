import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as helper from "../../helper/helper";

export const onSetInitialState = () => {
  return dispatch => {
    dispatch(setInitialStateStart());

    axios
      .all([
        axios.get("/expenditure/-Lq_T-H91dNZXUolCPon.json"),
        axios.get("/budget/-Lq_SMZGI0D_kJEoFtPN.json")
      ])
      .then(
        axios.spread((totalExp, budget) => {
          let monthlyBudget = budget.data[helper.getActualMonthString()];
          let totalExpenditure = totalExp.data.totalExpenditure;
          let payload = {
            totalExpenditure: totalExpenditure,
            budget: budget.data,
            monthlyBudget: monthlyBudget
          };

          dispatch(setInitialState(payload));
        })
      )
      .catch(error => {
        console.log(error);
        dispatch(setInitialStateFail());
      });
  };
};

export const onStoreSpending = payload => {
  return {
    type: actionTypes.ON_STORE_SPENDING,
    payload: payload
  };
};

export const toggleModal = () => {
  return {
    type: actionTypes.TOGGLE_MODAL
  };
};

export const toggleLoading = () => {
  return {
    type: actionTypes.TOGGLE_LOADING
  };
};

export const setInitialStateStart = () => {
  return {
    type: actionTypes.SET_INITIAL_STATE_START
  };
};

export const setInitialState = payload => {
  return {
    type: actionTypes.SET_INITIAL_STATE,
    payload: payload
  };
};

export const setInitialStateFail = () => {
  return {
    type: actionTypes.SET_INITIAL_STATE_FAIL
  };
};

export const onBudgetInputChanged = payload => {
  return {
    type: actionTypes.ON_BUDGET_INPUT_CHANGED,
    payload: payload
  };
};
