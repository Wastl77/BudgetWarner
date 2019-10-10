import * as actionTypes from "../actions/actionTypes";

const initialState = {
  idToken: null,
  userId: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ON_LOGIN: {
      return {
        ...state,
        idToken: action.payload.idToken,
        userId: action.payload.userId
      };
    }
    default:
      return state;
  }
};

export default reducer;
