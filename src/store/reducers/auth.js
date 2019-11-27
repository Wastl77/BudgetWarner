import * as actionTypes from '../actions/actionTypes';

const initialState = {
  idToken: null,
  userId: null,
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case actionTypes.AUTH_SUCCESS: {
      return {
        ...state,
        idToken: action.payload.idToken,
        userId: action.payload.userId,
        loading: false,
        error: null
      };
    }
    case actionTypes.AUTH_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    }
    case actionTypes.AUTH_LOGOUT: {
      return {
        ...state,
        idToken: null,
        userId: null
      };
    }
    case actionTypes.CONFIRM_AUTH_ERROR: {
      return {
        ...state,
        error: null
      };
    }
    default:
      return state;
  }
};

export default reducer;
