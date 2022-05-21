import React, { Component } from 'react'
import CidadeService from '../services/CidadeService'

import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled'
import TrashIcon from '@atlaskit/icon/glyph/trash'
import AddIcon from '@atlaskit/icon/glyph/add'

class ListarCidade extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cidades: []
        }
        this.addCidade = this.addCidade.bind(this);
        this.editCidade = this.editCidade.bind(this);
        this.deleteCidade = this.deleteCidade.bind(this);
    }

    deleteCidade(id){
        CidadeService.deleteCidade(id).then( res => {
            this.setState({cidades: this.state.cidades.filter(cidade => cidade.id !== id)});
        });
    }

    viewCidade(id){
        this.props.history.push(`/view-cidade/${id}`);
    }

    editCidade(id){
        this.props.history.push(`/add-cidade/${id}`);
    }

    componentDidMount(){
        CidadeService.getCidade().then((res) => {
            this.setState({ cidades: res.data});
        });
    }

    addCidade(){
        this.props.history.push('/add-cidade/_add');
    }

    render() {
        return (
            <div className = "Table">
                <table className = "mainList">
                    <thead>
                        <tr>
                            <th className='listColumn'> Cidade: </th>
                            <th className='listColumn'> Estado: </th>
                            <button className="addButton" onClick={this.addCidade}><AddIcon/></button>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.cidades.map(
                                cidade => 
                                <tr key = {cidade.id}>
                                    <td className='listItem'> {cidade.cidade} </td>
                                    <td className='listItem'> {cidade.estado.sigla} </td>
                                    <td>
                                        <button onClick={ () => this.editCidade(cidade.id)} className="editButton"><EditFilledIcon/></button>
                                        <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCidade(cidade.id)} className="deleteButton"><TrashIcon/></button>
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

export default ListarCidade