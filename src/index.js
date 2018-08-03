import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebaseSetup from './firebaseSetup';

import registerServiceWorker from './registerServiceWorker';


firebaseSetup();
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
