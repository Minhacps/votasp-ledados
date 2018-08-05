import firebase from 'firebase';

import * as actionTypes from './actionTypes';

export const loadDataStart = () => {
  return {
    type: actionTypes.LOAD_DATA_START
  };
};

export const loadDataSuccess = (users) => {
  return {
    type: actionTypes.LOAD_DATA_SUCCESS,
    users: users
  };
};

export const loadDataFail = (error) => {
  return {
    type: actionTypes.LOAD_DATA_FAIL,
    error: error
  };
};

export const onLoadData = () => {
  return dispatch => {
    dispatch(loadDataStart());
    let users = [];
    firebase.firestore().collection("users")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          users.push(doc.data());
        });
        console.log(users);
        dispatch(loadDataSuccess(users));
      })
      .catch(function (error) {
        dispatch(loadDataFail(error));
      });
  };
};