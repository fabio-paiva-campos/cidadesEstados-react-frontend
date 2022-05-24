import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <div className="header">
                        <div className='headerMenu'>
                            <a className='headerButton' href='estados'>Estados</a>
                            <a className='headerButton' href='cidades'>Cidades</a>
                        </div>
                        <a className='loginButton' href='login'>Fazer Login</a>
                    </div>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
