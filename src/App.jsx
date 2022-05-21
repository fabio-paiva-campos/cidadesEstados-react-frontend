import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import './styles/App.css';
import './styles/style.scss'

import Header from './components/Header';

import ListarEstado from './components/ListarEstado';
import CreateEstado from './components/CreateEstado';

import ListarCidade from './components/ListarCidade';
import CreateCidade from './components/CreateCidade';

function App() {
  const [listFocus, setListFocus] = useState(false)

  return (
    <div>
        <Router>
            <Header />
            <button onClick={() => (setListFocus(!listFocus))}>switch</button>
                <div className="cidades">
                    <Switch>
                        <Route path = "/cidades" component = {ListarCidade}></Route>
                        <Route path = "/add-cidade/:id" component = {CreateCidade}></Route>
                    </Switch>
                </div>
                <div className="estados">
                    <Switch>
                        <Route path = "/estados" component = {ListarEstado}></Route>
                        <Route path = "/add-estado/:id" component = {CreateEstado}></Route>
                    </Switch>
                </div>
        </Router>
    </div>
  );
}

export default App;