import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as helper from "../../helper/helper";

export const onSetInitialState = idToken => {
  return dispatch => {
    dispatch(fetchDataStart());

    axios
      .all([
        axios.get(`/expenditure/-Lq_T-H91dNZXUolCPon.json?auth=${idToken}`),
        axios.get(`/budget/-Lq_SMZGI0D_kJEoFtPN.json?auth=${idToken}`)
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
        console.log(error.response);
        let errorMessage = error.message;
        if (error.response !== undefined) {
          errorMessage = "Bitte später erneut versuchen!";
        }
        dispatch(fetchDataFail({ error: errorMessage }));
      });
  };
};

export const onStoreSpending = payload => {
  return dispatch => {
    dispatch(fetchDataStart());

    axios
      .all([
        axios.post(`/singleExpenses.json?auth=${payload[3]}`, payload[0]),
        axios.put(
          `/expenditure/-Lq_T-H91dNZXUolCPon.json?auth=${payload[3]}`,
          payload[1]
        )
      ])
      .then(
        axios.spread((response1, response2) => {
          const payloadSuccess = {
            totalAvailable: payload[2].totalAvailable,
            totalExpenditure: payload[1].totalExpenditure,
            dailyAvailable: payload[2].dailyAvailable
          };
          dispatch(onStoreSpendingSuccess(payloadSuccess));
          dispatch(toggleModal());
        })
      )
      .catch(error => {
        console.log(error);
        let errorMessage = error.message;
        if (error.response !== undefined) {
          errorMessage = "Bitte später erneut versuchen!";
        }
        dispatch(fetchDataFail({ error: errorMessage }));
        dispatch(toggleModal());
      });
  };
};

export const onStoreSpendingSuccess = payload => {
  return {
    type: actionTypes.ON_STORE_SPENDING_SUCCESS,
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

export const fetchDataStart = () => {
  return {
    type: actionTypes.FETCH_DATA_START
  };
};

export const setInitialState = payload => {
  return {
    type: actionTypes.SET_INITIAL_STATE,
    payload: payload
  };
};

export const fetchDataFail = payload => {
  return {
    type: actionTypes.FETCH_DATA_FAIL,
    payload: payload
  };
};

export const onBudgetInputChanged = payload => {
  return {
    type: actionTypes.ON_BUDGET_INPUT_CHANGED,
    payload: payload
  };
};

export const confirmError = () => {
  return {
    type: actionTypes.CONFIRM_ERROR
  };
};
