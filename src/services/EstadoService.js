import axios from 'axios';

const API = "http://localhost:8080/api/v1/estados";

class EstadoService {

    getEstado(){
        return axios.get(API);
    }

    createEstado(estado){
        return axios.post(API, estado);
    }

    getEstadoById(estadoId){
        return axios.get(API + '/' + estadoId);
    }

    updateEstado(estado, estadoId){
        return axios.put(API + '/' + estadoId, estado);
    }

    deleteEstado(estadoId){
        return axios.delete(API + '/' + estadoId);
    }
}

export default new EstadoService()