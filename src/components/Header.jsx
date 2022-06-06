import React, { useState } from 'react'
import Cidades from './Cidades'
import Estados from './Estados'
import Login from './Login'
import { useAppContext } from '../hooks/Context';
import CidadesUnlogged from './Cidades Unlogged';
import EstadosUnlogged from './Estados Unlogged';

function Header() {
    const [appArea, setAppArea] = useState(0)
    const [logged, setLogged] = useAppContext()

    function appAreaSwitch(appArea) {
        if(logged === true) {
            switch(appArea) {
                case 0:
                    return <Estados/>
                case 1:
                    return <Cidades/>
                case 2:
                    return <Login/>
                default:
                    return <Estados/>
            }
        } else {
            switch(appArea) {
                case 0:
                    return <EstadosUnlogged/>
                case 1:
                    return <CidadesUnlogged/>
                case 2:
                    return <Login/>
                default:
                    return <EstadosUnlogged/>
            }
        }
    }

    return (
        <div>
            <header>
                <div className="header">
                    <div className='headerMenu'>
                        <a className={appArea === 0 ? 'headerButtonSelected' : 'headerButton'}
                            onClick={() => (setAppArea(0))}>Estados</a>
                        <a className={appArea === 1 ? 'headerButtonSelected' : 'headerButton'}
                            onClick={() => (setAppArea(1))}>Cidades</a>
                        <a className={appArea === 2 ? 'loginButtonSelected' : 'loginButton'}
                            onClick={() => (setAppArea(2))}>{logged === true ? document.getElementById("loginInputUser").value : 'Fazer Login'}</a>
                    </div>
                </div>
            </header>
            {appAreaSwitch(appArea)}
        </div>
    )
}

export default Header