import React, { Component } from 'react'
import EstadoService from '../services/EstadoService'

class ListarEstado extends Component {
    constructor(props) {
        super(props)

        this.state = {
                estados: []
        }
        this.addEstado = this.addEstado.bind(this);
        this.editEstado = this.editEstado.bind(this);
        this.deleteEstado = this.deleteEstado.bind(this);
    }

    deleteEstado(id){
        EstadoService.deleteEstado(id).then( res => {
            this.setState({estados: this.state.estados.filter(estado => estado.id !== id)});
        });
    }
    viewEstado(id){
        this.props.history.push(`/view-estado/${id}`);
    }
    editEstado(id){
        this.props.history.push(`/add-estado/${id}`);
    }

    componentDidMount(){
        EstadoService.getEstado().then((res) => {
            this.setState({ estados: res.data});
        });
    }

    addEstado(){
        this.props.history.push('/add-estado/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Estados</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEstado}> Adicionar Estado</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Estado </th>
                                    <th> Sigla </th>
                                    <th> Ações </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.estados.map(
                                        estado => 
                                        <tr key = {estado.id}>
                                            <td> {estado.estado} </td>
                                            <td> {estado.sigla} </td>
                                            <td>
                                                 <button onClick={ () => this.editEstado(estado.id)} className="btn btn-info">Editar </button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEstado(estado.id)} className="btn btn-danger">Excluir </button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.viewEstado(estado.id)} className="btn btn-info">Ver </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListarEstado