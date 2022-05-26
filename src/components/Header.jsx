import React, { useState } from 'react'
import Cidades from './Cidades'
import Estados from './Estados'
import Login from './Login'
import { useAppContext } from '../hooks/Context';

function Header() {
    const [appArea, setAppArea] = useState(0)
    const [logged, setLogged] = useAppContext()

    return (
        <div>
            <header>
                <div className="header">
                    <div className='headerMenu'>
                        <a className={appArea === 1 ? 'headerButton' : 'headerButtonSelected'}
                            onClick={() => (setAppArea(0))}>Estados</a>
                        <a className={appArea === 0 ? 'headerButton' : 'headerButtonSelected'}
                            onClick={() => (setAppArea(1))}>Cidades</a>
                        <a className='loginButton'>Fazer Login</a>
                    </div>
                </div>
            </header>
            {logged ? (
                <div>
                    <div className='appArea'>
                        {appArea === 0 ? (
                            <Estados />
                        ) : (
                            <Cidades />
                        )}
                    </div>
                </div>
            ) : (
                <Login/>
            )}
        </div>
    )
}

export default Header