import React from 'react'
import UsuarioService from '../services/UsuarioService';

function Login() {
    
    function logCheck() {
        
    }

    return (
        <div className='loginContainer'>
            <div className = "login">
                <h2>Login:</h2>
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
    )
}

export default Login