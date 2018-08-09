import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  users: null,
  candidateAnswers: null,
  voterAnswers: null,
  error: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_USERS_START:
      return {
        ...state,
        error: null,
        loading: true
      }
    case actionTypes.LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
        error: null,
        loading: false
      }
    case actionTypes.LOAD_USERS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case actionTypes.LOAD_CANDIDATE_ANSWERS_START:
      return {
        ...state,
        error: null,
        loading: true
      }
    case actionTypes.LOAD_CANDIDATE_ANSWERS_SUCCESS:
      return {
        ...state,
        candidateAnswers: action.candidateAnswers,
        error: null,
        loading: false
      }
    case actionTypes.LOAD_CANDIDATE_ANSWERS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case actionTypes.LOAD_VOTER_ANSWERS_START:
      return {
        ...state,
        error: null,
        loading: true
      }
    case actionTypes.LOAD_VOTER_ANSWERS_SUCCESS:
      return {
        ...state,
        voterAnswers: action.voterAnswers,
        error: null,
        loading: false
      }
    case actionTypes.LOAD_VOTER_ANSWERS_FAIL:
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