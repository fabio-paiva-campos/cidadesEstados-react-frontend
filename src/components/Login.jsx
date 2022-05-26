import React from 'react'
import UsuarioService from '../services/UsuarioService';
import { useAppContext } from '../hooks/Context';
import { useState } from 'react';

function Login() {
    let arr = []
    const [logged, setLogged] = useAppContext()
    const [users, setUsers] = useState(arr)

    React.useEffect(() => {
        UsuarioService.getUsuario().then((res) => {setUsers(res.data)})
    }, []);
    
    function logCheck() {
        let usuarioValue = document.getElementById("loginInputUser").value
        let senhaValue = document.getElementById("loginInputPassword").value

        users.map(user => {
            if(user.usuario === usuarioValue) {
                if(user.senha === senhaValue) {
                    setLogged(true)
                } else {
                    alert("Senha incorreta")
                }
            } else {
                alert("Usuário não existe")
            }
        })
    }

    return (
        <div className='loginContainer'>
            <div className = "login">
                <h2>Login:</h2>
                <ul className = "loginForm">
                    <li>
                        <textArea id = "loginInputUser" className='textArea' placeholder="Usuario" name="usuario" rows={1} autoFocus/>
                    </li>
                    <li>
                        <textArea id = "loginInputPassword" className='textArea' placeholder="Senha" name="senha" rows={1}/>
                    </li>
                    <li>
                        <button className="loginButton" onClick={() => (logCheck())}>Entrar</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Login