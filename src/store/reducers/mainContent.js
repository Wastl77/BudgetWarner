import * as helper from "../../helper/helper";
import * as actionTypes from "../actions/actions";

const initialState = {
  monthlyBudget: 0,
  totalExpenditure: 0,
  totalAvailable: 0,
  dailyAvailable: 0,
  showModal: false,
  loading: false,
  budget: {
    januar: 0,
    februar: 0,
    märz: 0,
    april: 0,
    mai: 0,
    juni: 0,
    juli: 0,
    august: 0,
    september: 0,
    oktober: 0,
    november: 0,
    dezember: 0
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INITIAL_STATE: {
      const totalExpenditure = (+action.payload.totalExpenditure).toFixed(2);
      const monthlyBudget = (+action.payload.monthlyBudget).toFixed(2);
      const budget = action.payload.budget;
      const available = helper.calculateAvailable(
        monthlyBudget,
        totalExpenditure
      );

      return {
        ...state,
        monthlyBudget: monthlyBudget,
        totalExpenditure: totalExpenditure,
        totalAvailable: available.totalAvailable,
        dailyAvailable: available.dailyAvailable,
        budget: budget
      };
    }
    case actionTypes.ON_STORE_SPENDING:
      return {
        ...state,
        totalAvailable: action.payload.totalAvailable,
        totalExpenditure: action.payload.totalExpenditure,
        dailyAvailable: action.payload.dailyAvailable
      };
    case actionTypes.TOGGLE_MODAL:
      return {
        ...state,
        showModal: !state.showModal
      };
    case actionTypes.TOGGLE_LOADING:
      return {
        ...state,
        loading: !state.loading
      };
    case actionTypes.ON_BUDGET_INPUT_CHANGED: {
      return {
        ...state,
        budget: {
          ...state.budget,
          [action.payload.elementId]: action.payload.value
        }
      };
    }
    default:
      return state;
  }
};

export default reducer;
