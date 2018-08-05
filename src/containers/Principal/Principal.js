import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';

import * as actions from '../../store/actions';
import './Principal.css';

class Principal extends Component {
  state = {
    users: []
  };

  componentDidMount = () => {
    console.log("Cheguei no Principal Did Mount");
    firebase
      .auth()
      .signInWithEmailAndPassword('albordignon@gmail.com', "teste1234")
      .then(console.log)
      .catch(console.log);

    this.props.onLoadData();
  };

  render() {
    console.log("Principal");
    //console.log(this.props.users);
    let lista = [];
    let numCandidates = 0;
    let numVoters = 0;
    let partidos = {};
    let i = 0;
    if (this.props.users) {
      for (let user of this.props.users) {
        //console.log(user.name);
        lista.push(
          <p key={i}>
            {user.name}-
            {user.role} -
            {user.level} -
            {user.homologated} -
            {user.city}
          </p>
        );
        i++;
        if (user.role === "candidate") {
          numCandidates++;
          if (partidos[user.politicalParty]) {
            partidos[user.politicalParty] += 1;
          } else {
            partidos[user.politicalParty] = 1;
          }
        } else {
          numVoters++;
        }
      }
    }
    let pagePartidos = [];
    for (let partido in partidos) {
      console.log(partidos[partido]);
      pagePartidos.push(
        <tr key={partido}>
          <td>{partido}</td>
          <td>{partidos[partido]}</td>
        </tr>
      );
    }

    return (
      <div className="Principal">
        <h2>Estatísticas do VotaSP</h2>
        <h3>Numero de Eleitores e Eleitoras: {numVoters}</h3>
        <h3>Numero de Candidatos e Candidatas:{numCandidates}</h3>
        <table className="PartiesTable">
          <tbody>
            {pagePartidos}
          </tbody>
        </table>
        <h1>Listagem de Candidatas e Candidatos</h1>
        {lista}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // loading: state.loadData.loading,
    error: state.loadData.error,
    users: state.loadData.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadData: () => dispatch(actions.onLoadData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Principal);
