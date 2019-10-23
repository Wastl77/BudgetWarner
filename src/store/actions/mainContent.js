import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as helper from "../../helper/helper";

export const onSetInitialState = idToken => {
  return dispatch => {
    dispatch(fetchDataStart());

    axios
      .all([
        axios.get(`/budget/-Lq_SMZGI0D_kJEoFtPN.json?auth=${idToken}`),
        axios.get(`/singleExpenses.json?auth=${idToken}`)
      ])
      .then(
        axios.spread((budget, expenses) => {
          let monthlyBudget = budget.data[helper.getActualMonthString()];
          let totalExpenditure = 0;
          const allExpenses = expenses.data;
          Object.keys(allExpenses).forEach(key => {
            totalExpenditure =
              totalExpenditure + parseFloat(allExpenses[key].expenseValue);
          });
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
      .post(`/singleExpenses.json?auth=${payload[3]}`, payload[0])
      .then(response => {
        const payloadSuccess = {
          totalAvailable: payload[2].totalAvailable,
          totalExpenditure: payload[1].totalExpenditure,
          dailyAvailable: payload[2].dailyAvailable
        };
        dispatch(onStoreSpendingSuccess(payloadSuccess));
        dispatch(toggleModal());
      })
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

export const onStoreBudget = payload => {
  return dispatch => {
    dispatch(fetchDataStart());
    axios
      .put(`/budget/-Lq_SMZGI0D_kJEoFtPN.json?auth=${payload[1]}`, payload[0])
      .then(() => {
        dispatch(toggleLoading());
      })
      .catch(error => {
        console.log(error);
        dispatch(fetchDataFail({ error: error.message }));
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

export const onSpendingInputChanged = payload => {
  return {
    type: actionTypes.ON_SPENDING_INPUT_CHANGED,
    payload: payload
  };
};

export const confirmError = () => {
  return {
    type: actionTypes.CONFIRM_ERROR
  };
};
