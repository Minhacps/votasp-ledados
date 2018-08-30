import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';

import * as actions from '../../store/actions';
import Loader from '../../components/Loader/Loader';
import './Principal.css';

class Principal extends Component {
  state = {
    users: []
  };

  componentDidMount = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword('albordignon@gmail.com', "teste1234")
      .then(console.log)
      .catch(console.log);
    this.props.onLoadUsers();
    this.props.onLoadCandidateAnswers();
    this.props.onLoadVoterAnswers();


  };

  compare = (a, b) => {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  compare1 = (a, b) => {
    if (a.key < b.key)
      return -1;
    if (a.key > b.key)
      return 1;
    return 0;
  }

  contaRespostas = () => {
    this.props.users.forEach( (user, userIndex) => {
      let role = user.role;
      if (role === 'candidate') {
        this.props.candidateAnswers.forEach(answers => {
          if(user.id === answers.id){
            this.props.users[userIndex].answers = answers;
            this.props.users[userIndex].numAnswers = Object.keys(answers).length - 1;
          }
        });
      } else if (role === 'voter') {
//        
      }
    });
  }

  render() {

    // console.log("Users", this.props.users);
    // console.log("Candidate Answers", this.props.candidateAnswers);
    // console.log("Voter Answers", this.props.voterAnswers);

    let page;

    if (this.props.loading) {
      page = <Loader />
    } else {
      if (this.props.users) {
        // console.log(this.props.users);
        this.props.users.sort(this.compare);
      }
      if (this.props.users && this.props.candidateAnswers && this.props.voterAnswers) {
        this.contaRespostas();
      }
      //console.log(this.props.users);
      let listCandidates = [];
      let listVoters = [];
      let listOtherUsers = [];
      let numCandidatesFederal = 0;
      let numCandidatesEstadual = 0;
      let numVoters = 0;
      let partidos = {};
      let cities = {};
      let i = 0;
      if (this.props.users) {
        for (let user of this.props.users) {
          //console.log(user.name);
          if (user.role === "candidate") {
            if( user.level === 'federal' && user.numAnswers === 40){
              numCandidatesFederal++;
            }
            if(user.level === 'estadual' && user.numAnswers === 40){
              numCandidatesEstadual++;
            } 
            if (cities[user.city]) {
              cities[user.city] += 1;
            } else {
              cities[user.city] = 1;
            }
            if (partidos[user.politicalParty]) {
              partidos[user.politicalParty] += 1;
            } else {
              partidos[user.politicalParty] = 1;
            }
            listCandidates.push(
              <tr key={i}>
                <td>{user.name}</td>
                <td>{user.city}</td>
                <td>{user.role}</td>
                <td>{user.level}</td>
                <td>{user.politicalParty}</td>
                <td>{user.numAnswers}</td>
                <td>{user.homologated ? 'sim' : 'não'}</td>
                <td>{user.cnpj}</td>
                <td>{user.email}</td>
                <td>{user.number}</td>
              </tr>
            );
          } else if (user.role === "voter") {
            numVoters++;
            listVoters.push(
              <tr key={i}>
                <td>{user.name}</td>
                <td>{user.city}</td>
              </tr>
            );
          } else {
            listOtherUsers.push(
              <tr key={i}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.city}</td>
              </tr>
            );
          }
          i++;
        }
      }
      let pagePartidos = [];


      for (let partido in partidos) {
        pagePartidos.push(
          <tr key={partido}>
            <td>{partido}</td>
            <td className="number">{partidos[partido]}</td>
          </tr>
        );
      }

      pagePartidos.sort(this.compare1);

      let pageCities = [];
      for (let city in cities) {
        pageCities.push(
          <tr key={city}>
            <td>{city}</td>
            <td className="number">{cities[city]}</td>
          </tr>
        );
      }
      pageCities.sort(this.compare1);

      page = (
        <div>
          <h2>Estatísticas do VotaSP</h2>
          <h3>Numero de Eleitores e Eleitoras: {numVoters}</h3>
          <h3>Numero de Candidatos e Candidatas a Estadual : {numCandidatesEstadual}</h3>
          <h3>Numero de Candidatos e Candidatas a Federal : {numCandidatesFederal}</h3>
          <h3>Numero de Partidos : {pagePartidos.length}</h3>
          <table className="PartiesTable">
            <thead>
              <tr>
                <th>Partido</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {pagePartidos}
            </tbody>
          </table>
          <h2>Listagem de Candidatas e Candidatos</h2>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cidade</th>
                <th>Candidato</th>
                <th>Level</th>
                <th>Partido</th>
                <th>Num Respostas</th>
                <th>Homologado</th>
                <th>CNPJ</th>
                <th>Email</th>
                <th>Numero</th>
              </tr>
            </thead>
            <tbody>
              {listCandidates}
            </tbody>
          </table>
          {/* <h1>Listagem de Eleitoras e Eleitores</h1>
          <table className="PartiesTable">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cidades</th>
              </tr>
            </thead>
            <tbody>
              {listVoters}
            </tbody>
          </table> */}
          <h2>Cidades</h2>
          <table>
            <thead>
              <tr>
                <th>Cidade</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {pageCities}
            </tbody>
          </table>
          <h1>Listagem de Usuários sem Role</h1>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Role</th>
                <th>Cidade</th>
              </tr>
            </thead>
            <tbody>
              {listOtherUsers}
            </tbody>
          </table>
        </div>
      );

    }

    return (
      <div className="Principal">
        {page}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // loading: state.loadData.loading,
    error: state.loadData.error,
    loading: state.loadData.loading,
    users: state.loadData.users,
    candidateAnswers: state.loadData.candidateAnswers,
    voterAnswers: state.loadData.voterAnswers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadUsers: () => dispatch(actions.onLoadUsers()),
    onLoadCandidateAnswers: () => dispatch(actions.onLoadCandidateAnswers()),
    onLoadVoterAnswers: () => dispatch(actions.onLoadVoterAnswers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Principal);
