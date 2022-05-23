import React, { Component } from 'react'
import EstadoService from '../services/EstadoService';

class CreateEstado extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            estado: '',
            sigla: ''
        }
        this.changeEstadoHandler = this.changeEstadoHandler.bind(this);
        this.changeSiglaHandler = this.changeSiglaHandler.bind(this);
        this.saveOrUpdateEstado = this.saveOrUpdateEstado.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return
        }else{
            EstadoService.getEstadoById(this.state.id).then( (res) =>{
                let estado = res.data;
                this.setState({estado: estado.estado, sigla: estado.sigla});
            });
        }
    }

    saveOrUpdateEstado = (e) => {
        e.preventDefault();
        let estado = {estado: this.state.estado, sigla: this.state.sigla};
        console.log('estado => ' + JSON.stringify(estado));

        if(this.state.id === '_add'){
            EstadoService.createEstado(estado).then(res =>{
                this.props.history.push('/estados');
            });
        }else{
            EstadoService.updateEstado(estado, this.state.id).then( res => {
                this.props.history.push('/estados');
            });
        }
    }
    
    changeEstadoHandler= (event) => {
        this.setState({estado: event.target.value});
    }

    changeSiglaHandler= (event) => {
        this.setState({sigla: event.target.value});
    }

    cancel(){
        this.props.history.push('/estados');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Adicionar Estado</h3>
        }else{
            return <h3 className="text-center">Editar Estado</h3>
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
                                            <label> Estado: </label>
                                            <input placeholder="Estado" name="estado" className="form-control" 
                                            value={this.state.estado} onChange={this.changeEstadoHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Sigla: </label>
                                            <input placeholder="Sigla" name="sigla" className="form-control" 
                                            value={this.state.sigla} onChange={this.changeSiglaHandler}/>
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateEstado}>Salvar</button>
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

export default CreateEstado