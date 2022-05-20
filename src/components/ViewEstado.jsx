import React, { Component } from 'react'
import EstadoService from '../services/EstadoService'

class ViewEstado extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            estado: {}
        }
    }

    componentDidMount(){
        EstadoService.getEstadoById(this.state.id).then( res => {
            this.setState({estado: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Estado Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Estado: </label>
                            <div> { this.state.estado.estado }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewEstado
