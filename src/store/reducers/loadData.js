import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  users: null,
  error: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_DATA_START:
      return {
        ...state,
        error: null,
        loading: true
      }
    case actionTypes.LOAD_DATA_SUCCESS:
      return {
        ...state,
        users: action.users,
        error: null,
        loading: false
      }
    case actionTypes.LOAD_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
}

export default reducer;