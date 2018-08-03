import React, { Component } from 'react';

import firebase from 'firebase/app';

class Principal extends Component {
  state = {
    teste: null
  };

  componentDidMount = () => {
    console.log("Cheguei no Principal Did Mount");
    firebase.firestore().collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Listando usuários</h1>
      </React.Fragment>
    );
  }
}

export default Principal;
