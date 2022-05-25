import React, { useState } from 'react'
import CidadeService from '../services/CidadeService'
import EstadoService from '../services/EstadoService'

import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled'
import TrashIcon from '@atlaskit/icon/glyph/trash'
import AddIcon from '@atlaskit/icon/glyph/add'
import CheckIcon from '@atlaskit/icon/glyph/check';
import CrossIcon from '@atlaskit/icon/glyph/cross';

const Cidades = () => {
    let arr = []
    const [cidades, setCidades] = useState(arr)
    const [estados, setEstados] = useState(arr)
    const [addCidade, setAddCidade] = useState(false)
    const [editCidade, setEditCidade] = useState(false)
    const [selectedCidade, setSelectedCidade] = useState(0)

    React.useEffect(() => {
        CidadeService.getCidade().then((res) => {setCidades(res.data)})
        EstadoService.getEstado().then((res) => {setEstados(res.data)})
    }, []);

    function deleteCidade(id){
        CidadeService.deleteCidade(id)
    }

    function editCidadeAction(id){
        let index = id
        let cidadeValue = document.getElementById("editCidadeArea").value
        let siglaValue = document.getElementById("editSiglaArea").value

        let cidade = {cidade: cidadeValue, sigla: siglaValue}

        CidadeService.updateCidade(cidade, index)
        setEditCidade(false)
    }

    function addCidadeAction(){
        let cidadeValue = document.getElementById("addCidadeArea").value
        let estadoValue = document.getElementById("addCidadeEstadoArea").key

        let estadoSelect = []
        estados.map((estado) => {
            if(estado.sigla == estadoValue) {
                console.log(estado.id)
            }
        })
    }

    return (
        <div className = "Table">
            <table className = "mainList">
                <thead>
                    <tr>
                        <th className='listColumn'> Cidade: </th>
                        <th className='listColumn'> Sigla: </th>
                        <button className="addButton" onClick={() => setAddCidade(true)}><AddIcon /></button>
                    </tr>
                </thead>
                <tbody>
                    {cidades.map((cidade) => { return (
                        <tr key = {cidade.id}>
                            { editCidade && selectedCidade === cidade.id ? (
                                <>
                                    <td><textarea autoFocus id="editCidadeArea" className="textArea" placeholder='Cidade' defaultValue={cidade.cidade} rows={1} /></td>
                                    <td><textarea id="editSiglaArea" className="textArea" placeholder='Sigla' defaultValue={cidade.sigla} rows={1} /></td>
                                    <td>
                                        <button className="leftButton" onClick={() => (editCidadeAction(cidade.id))}><CheckIcon /></button>
                                        <button className="rightButton" onClick={() => (setEditCidade(false))}><CrossIcon /></button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className='listItem'>{cidade.cidade}</td>
                                    <td className='listItem'>{cidade.estado.sigla}</td>
                                    <td>
                                        <button className="leftButton" onClick={() => {setSelectedCidade(cidade.id); setEditCidade(true)}}><EditFilledIcon /></button>
                                        <button className="rightButton" onClick={() => deleteCidade(cidade.id)}><TrashIcon /></button>
                                    </td>
                                </>
                            )}
                        </tr>
                        )}
                    )}
                    {addCidade ? (
                        <>
                            <td><textarea autoFocus id="addCidadeArea" className="textArea" placeholder='Cidade' defaultValue='' rows={1} /></td>
                            <td>
                                <select id="addCidadeEstadoArea" className='selector'>
                                    {estados.map((estado) => { return (                               
                                            <option key = {estado.id}>{estado.sigla}</option>
                                        )}
                                    )}
                                </select>
                            </td>
                            <td>
                                <button className="leftButton" onClick={() => (addCidadeAction())}><CheckIcon /></button>
                                <button className="rightButton" onClick={() => (setAddCidade(false))}><CrossIcon /></button>
                            </td>
                        </>
                    ) : (
                        null
                    )}
               </tbody>
            </table>
        </div>
    )
}

export default Cidades