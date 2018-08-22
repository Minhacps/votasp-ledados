import firebase from 'firebase/app';

import * as actionTypes from './actionTypes';

export const loadUsersStart = () => {
  return {
    type: actionTypes.LOAD_USERS_START
  };
};

export const loadUsersSuccess = (users) => {
  return {
    type: actionTypes.LOAD_USERS_SUCCESS,
    users: users
  };
};

export const loadUsersFail = (error) => {
  return {
    type: actionTypes.LOAD_USERS_FAIL,
    error: error
  };
};

export const loadCandidateAnswersStart = () => {
  return {
    type: actionTypes.LOAD_CANDIDATE_ANSWERS_START
  };
};

export const loadCandidateAnswersSuccess = (candidateAnswers) => {
  return {
    type: actionTypes.LOAD_CANDIDATE_ANSWERS_SUCCESS,
    candidateAnswers: candidateAnswers
  };
};

export const loadCandidateAnswersFail = (error) => {
  return {
    type: actionTypes.LOAD_CANDIDATE_ANSWERS_FAIL,
    error: error
  };
};

export const loadVoterAnswersStart = () => {
  return {
    type: actionTypes.LOAD_VOTER_ANSWERS_START
  };
};

export const loadVoterAnswersSuccess = (voterAnswers) => {
  return {
    type: actionTypes.LOAD_VOTER_ANSWERS_SUCCESS,
    voterAnswers: voterAnswers
  };
};

export const loadVoterAnswersFail = (error) => {
  return {
    type: actionTypes.LOAD_VOTER_ANSWERS_FAIL,
    error: error
  };
};

export const onLoadUsers = () => {
  return dispatch => {
    dispatch(loadUsersStart());
    let users = [];
    let user;
    firebase.firestore().collection("users")
      .get()
      .then(function (querySnapshot) {
        let userId;
        let data = querySnapshot;
        let tamData = Object.keys(data.docs).length;
        for (let i = 0; i < tamData; i++) {
          userId = data.docs[i].id;
          user = data.docs[i].data();
          user['id'] = userId;
          users.push(user);
        }
        dispatch(loadUsersSuccess(users));
      })
      .catch(function (error) {
        dispatch(loadUsersFail(error));
      });
  };
};

export const onLoadCandidateAnswers = () => {
  return dispatch => {
    dispatch(loadCandidateAnswersStart());
    let candidateAnswers = [];
    let answer;
    firebase.firestore().collection("candidate_answers")
      .get()
      .then(function (querySnapshot) {
        let userId;
        let data = querySnapshot;
        let tamData = Object.keys(data.docs).length;
        for (let i = 0; i < tamData; i++) {
          userId = data.docs[i].id;
          answer = data.docs[i].data();
          answer['id'] = userId;
          candidateAnswers.push(answer);
        }
        dispatch(loadCandidateAnswersSuccess(candidateAnswers));
      })
      .catch(function (error) {
        dispatch(loadCandidateAnswersFail(error));
      });
  };
}

export const onLoadVoterAnswers = () => {
  return dispatch => {
    dispatch(loadVoterAnswersStart());
    let voterAnswers = [];
    let answer;
    firebase.firestore().collection("voter_answers")
      .get()
      .then(function (querySnapshot) {
        let userId;
        let data = querySnapshot;
        let tamData = Object.keys(data.docs).length;
        for (let i = 0; i < tamData; i++) {
          userId = data.docs[i].id;
          answer = data.docs[i].data();
          answer['id'] = userId;
          voterAnswers.push(answer);
        }
        dispatch(loadVoterAnswersSuccess(voterAnswers));
      })
      .catch(function (error) {
        dispatch(loadVoterAnswersFail(error));
      });
  };
}