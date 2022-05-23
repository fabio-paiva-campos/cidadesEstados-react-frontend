import React, { Component } from 'react'
import CidadeService from '../services/CidadeService';
import EstadoService from '../services/EstadoService';

class CreateCidade extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            cidade: '',
            estado: ''
        }
        this.changeCidadeHandler = this.changeCidadeHandler.bind(this);
        this.changeEstadoHandler = this.changeEstadoHandler.bind(this);
        this.saveOrUpdateCidade = this.saveOrUpdateCidade.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return
        }else{
            CidadeService.getCidadeById(this.state.id).then( (res) =>{
                let cidade = res.data;
                this.setState({cidade: cidade.cidade});
            });
        }
    }

    saveOrUpdateCidade = (e) => {
        e.preventDefault();
        let cidade = {cidade: this.state.cidade, estado: this.state.estado};
        console.log('cidade => ' + JSON.stringify(cidade));

        if(this.state.id === '_add'){
            CidadeService.createCidade(cidade).then(res => {
                this.props.history.push('/cidades');
            });
        }else{
            CidadeService.updateCidade(cidade, this.state.id).then( res => {
                this.props.history.push('/cidades');
            });
        }
    }
    
    changeCidadeHandler= (event) => {
        this.setState({cidade: event.target.value});
    }

    changeEstadoHandler= (event) => {
        this.setState({estado: event.target.value});
    }

    cancel(){
        this.props.history.push('/cidades');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Adicionar Cidade</h3>
        }else{
            return <h3 className="text-center">Editar Cidade</h3>
        }
    }
    
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Cidade: </label>
                                            <input placeholder="Cidade" name="cidade" className="form-control" 
                                            value={this.state.cidade} onChange={this.changeCidadeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Estado: </label>
                                            <select placeholder="Estado" name="estado" className="form-control" 
                                            value={this.state.estado} onChange={this.changeEstadoHandler}>
                                                <option></option>
                                            </select>
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateCidade}>Salvar</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                   </div>
            </div>
        )
    }
}

export default CreateCidade