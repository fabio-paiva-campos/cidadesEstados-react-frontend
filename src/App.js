import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListarEstado from './components/ListarEstado';
import Header from './components/Header';
import CreateEstado from './components/CreateEstado';
import ViewEstado from './components/ViewEstado';

function App() {
  return (
    <div>
        <Router>
              <Header />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListarEstado}></Route>
                          <Route path = "/estados" component = {ListarEstado}></Route>
                          <Route path = "/add-estado/:id" component = {CreateEstado}></Route>
                          <Route path = "/view-estado/:id" component = {ViewEstado}></Route>
                          {/* <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route> */}
                    </Switch>
                </div>
        </Router>
    </div>
    
  );
}

export default App;
