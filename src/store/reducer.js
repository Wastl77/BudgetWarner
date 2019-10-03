import * as helper from "../helper/helper";

const initialState = {
  monthlyBudget: 0,
  totalExpenditure: 0,
  totalAvailable: 0,
  dailyAvailable: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INITIAL_STATE": {
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
    case "ON_STORE_SPENDING":
      return {
        ...state,
        totalAvailable: action.payload.totalAvailable,
        totalExpenditure: action.payload.totalExpenditure,
        dailyAvailable: action.payload.dailyAvailable
      };
    default:
      return state;
  }
};

export default reducer;
