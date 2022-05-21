import axios from 'axios';

const API = "http://localhost:8080/api/cidades";

class CidadeService {

    getCidade(){
        return axios.get(API);
    }

    createCidade(cidade){
        return axios.post(API, cidade);
    }

    getCidadeById(cidadeId){
        return axios.get(API + '/' + cidadeId);
    }

    updateCidade(cidade, cidadeId){
        return axios.put(API + '/' + cidadeId, cidade);
    }

    deleteCidade(cidadeId){
        return axios.delete(API + '/' + cidadeId);
    }
}

export default new CidadeService()