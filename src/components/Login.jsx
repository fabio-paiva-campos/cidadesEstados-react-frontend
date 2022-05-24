import React, { Component } from 'react'
import UsuarioService from '../services/UsuarioService';

function Login() {
    
    function logCheck() {
        
    }

    return (
        <div>
            <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            {
                                <h2>Login:</h2>
                            }
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Usuario: </label>
                                        <input placeholder="Usuario" name="usuario" className="form-control"/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Senha: </label>
                                        <input placeholder="Senha" name="senha" className="form-control"/>
                                    </div>
                                    <button className="btn btn-success" onClick={() => (logCheck)}>Entrar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Login