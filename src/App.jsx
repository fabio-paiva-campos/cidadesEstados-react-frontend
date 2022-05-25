import React from 'react';

import './styles/App.css';
import './styles/style.scss'

import Header from './components/Header';

import Estados from './components/Estados';
import Cidades from './components/Cidades';

import Login from './components/Login';

function App() {
  
  return (
    <div>
      <Header/>
      <Cidades/>
    </div>
  );
}

export default App;