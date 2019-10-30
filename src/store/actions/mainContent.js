import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as helper from "../../helper/helper";

export const onSetInitialState = idToken => {
  return dispatch => {
    dispatch(fetchDataStart());

    let actualMonth = helper.getActualMonthString();

    axios
      .all([
        axios.get(`/budget/-Lq_SMZGI0D_kJEoFtPN.json?auth=${idToken}`),
        axios.get(`/singleExpenses.json?auth=${idToken}`)
      ])
      .then(
        axios.spread((budget, expenses) => {
          let monthlyBudget = budget.data[actualMonth];
          let totalExpenditure = 0;
          if (expenses.data !== "undefined") {
            const allActualMonthExpenses = expenses.data[actualMonth];
            Object.keys(allActualMonthExpenses).forEach(key => {
              totalExpenditure =
                totalExpenditure +
                parseFloat(allActualMonthExpenses[key].expenseValue);
            });
          }
          const allExpenses = expenses.data;
          let payload = {
            totalExpenditure: totalExpenditure,
            budget: budget.data,
            monthlyBudget: monthlyBudget,
            allExpenses: allExpenses
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

    let actualMonth = helper.getActualMonthString();

    axios
      .post(`/singleExpenses/${payload[4]}.json?auth=${payload[3]}`, payload[0])
      .then(response => {
        const payloadSuccess = {
          totalAvailable: payload[2].totalAvailable,
          totalExpenditure: payload[1],
          dailyAvailable: payload[2].dailyAvailable
        };
        if (actualMonth === payload[4]) {
          dispatch(onStoreSpendingSuccess(payloadSuccess));
          dispatch(toggleLoading());
        } else {
          dispatch(toggleLoading());
        }
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
