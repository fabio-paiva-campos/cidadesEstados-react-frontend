import React from 'react';

import './styles/style.scss'

import Header from './components/Header';
import { ContextWrap } from './hooks/Context';

function App() {
  
  return (
    <ContextWrap>
      <Header/>
    </ContextWrap>
  );
}

export default App;