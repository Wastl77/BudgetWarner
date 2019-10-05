import * as helper from "../helper/helper";
import * as actionTypes from "./actions";

const initialState = {
  monthlyBudget: 0,
  totalExpenditure: 0,
  totalAvailable: 0,
  dailyAvailable: 0,
  showModal: false,
  loading: false,
  budget: {
    januar: "",
    februar: "",
    märz: "",
    april: "",
    mai: "",
    juni: "",
    juli: "",
    august: "",
    september: "",
    oktober: "",
    november: "",
    dezember: ""
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INITIAL_STATE: {
      const totalExpenditure = (+action.payload.totalExpenditure).toFixed(2);
      const monthlyBudget = (+action.payload.monthlyBudget).toFixed(2);
      const available = helper.calculateAvailable(
        monthlyBudget,
        totalExpenditure
      );

      return {
        ...state,
        monthlyBudget: monthlyBudget,
        totalExpenditure: totalExpenditure,
        totalAvailable: available.totalAvailable,
        dailyAvailable: available.dailyAvailable
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
