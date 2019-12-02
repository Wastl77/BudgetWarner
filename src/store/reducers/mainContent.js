import * as helper from '../../helper/helper';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  monthlyBudget: 0,
  totalExpenditure: 0,
  totalExpenditureFuel: 0,
  totalExpenditureSupermarket: 0,
  totalExpenditureFreeBudget: 0,
  totalAvailable: 0,
  showModal: false,
  loading: false,
  error: null,
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
    dezember: 0,
    fuel: 0,
    supermarket: 0
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INITIAL_STATE: {
      const totalExpenditure = (+action.payload.totalExpenditure).toFixed(2);
      const totalExpenditureFuel = +action.payload.totalExpenditureFuel.toFixed(
        2
      );
      const totalExpenditureSupermarket = +action.payload.totalExpenditureSupermarket.toFixed(
        2
      );
      const totalExpenditureFreeBudget = +action.payload.totalExpenditureFreeBudget.toFixed(
        2
      );
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
        totalExpenditureSupermarket: totalExpenditureSupermarket,
        totalExpenditureFuel: totalExpenditureFuel,
        totalExpenditureFreeBudget: totalExpenditureFreeBudget,
        totalAvailable: available.totalAvailable,
        budget: budget,
        loading: false
      };
    }
    case actionTypes.FETCH_DATA_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.FETCH_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case actionTypes.ON_STORE_SPENDING_SUCCESS:
      return {
        ...state,
        totalAvailable: action.payload.totalAvailable,
        totalExpenditure: action.payload.totalExpenditure,
        error: null
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
    case actionTypes.CONFIRM_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default reducer;
