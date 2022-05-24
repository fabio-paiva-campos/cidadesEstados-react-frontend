import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

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
        <Router>
            <Header />
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
                <div className="usuarios">
                    <Switch>
                        <Route path = "/usuarios" element = {<Login />}></Route>
                        {/*<Route path = "/add-usuario/:id" component = {Cadastrar}></Route>*/}
                    </Switch>
                </div>
        </Router>
    </div>
  );
}

export default App;