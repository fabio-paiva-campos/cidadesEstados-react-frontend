import React, { Component } from 'react'
import EstadoService from '../services/EstadoService'

import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled'
import TrashIcon from '@atlaskit/icon/glyph/trash'
import AddIcon from '@atlaskit/icon/glyph/add'

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
            <div className = "Table">
                <table className = "mainList">
                    <thead>
                        <tr>
                            <th className='listColumn'> Estado: </th>
                            <th className='listColumn'> Sigla: </th>
                            <button className="addButton" onClick={this.addEstado}><AddIcon/></button>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.estados.map(
                                estado => 
                                <tr key = {estado.id}>
                                    <td className='listItem'> {estado.estado} </td>
                                    <td className='listItem'> {estado.sigla} </td>
                                    <td>
                                        <button onClick={ () => this.editEstado(estado.id)} className="editButton"><EditFilledIcon/></button>
                                        <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEstado(estado.id)} className="deleteButton"><TrashIcon/></button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ListarEstado