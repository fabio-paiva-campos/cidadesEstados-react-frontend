import React from 'react';

import './styles/App.css';
import './styles/style.scss'

import Header from './components/Header';

import ListarEstado from './components/ListarEstado';
import CreateEstado from './components/CreateEstado';

import ListarCidade from './components/ListarCidade';
import CreateCidade from './components/CreateCidade';

import Login from './components/Login';

function App() {
  
  return (
    <div>
      <Header/>
      <ListarEstado/>
    </div>
  );
}

export default App;