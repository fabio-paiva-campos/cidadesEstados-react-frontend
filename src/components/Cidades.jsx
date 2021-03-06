import React, { useState, useEffect } from 'react'
import EstadoService from '../services/EstadoService'
import CidadeService from '../services/CidadeService'

import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled'
import TrashIcon from '@atlaskit/icon/glyph/trash'
import AddIcon from '@atlaskit/icon/glyph/add'
import CheckIcon from '@atlaskit/icon/glyph/check';
import CrossIcon from '@atlaskit/icon/glyph/cross';

import { createId, useAppContext } from '../hooks/Context';

const Cidades = () => {
    let arr = []
    const [estados, setEstados] = useState(arr)
    const [cidades, setCidades] = useState(arr)
    const [addCidade, setAddCidade] = useState(false)
    const [editCidade, setEditCidade] = useState(false)
    const [selectedCidade, setSelectedCidade] = useState(0)

    useEffect(() => {
        EstadoService.getEstado().then((res) => {setEstados(res.data)})
        CidadeService.getCidade().then((res) => {setCidades(res.data)})
    }, [])

    function deleteCidade(id){
        CidadeService.deleteCidade(id)

        let cidadesFinal = [...cidades]
        cidadesFinal.forEach((cidade, index) => {
            if(cidade.id === id) {
                cidadesFinal.splice(index, 1)
            }
        })
        setCidades(cidadesFinal)
    }

    function editCidadeAction(id){
        let index = id
        let cidadeValue = document.getElementById("editCidadeArea").value
        let estadoValue = document.getElementById("editCidadeEstadoArea").value

        let estadoSelect = {}
        estados.map((estado) => {
            if(estado.sigla === estadoValue) {
                return estadoSelect = {id: estado.id, estado: estado.estado, sigla: estado.sigla}
            }
        })

        let cidade = {cidade: cidadeValue, estado: estadoSelect}
        CidadeService.updateCidade(cidade, index)
        setEditCidade(false)

        let cidadesFinal = [...cidades]
        cidadesFinal.forEach((cidade) => {
            if(cidade.id === id) {
                cidade.cidade = cidadeValue
                cidade.estado = estadoSelect
            }
        })
        setCidades(cidadesFinal)
    }

    function addCidadeAction(){
        let cidadeValue = document.getElementById("addCidadeArea").value
        let estadoValue = document.getElementById("addCidadeEstadoArea").value

        let estadoSelect = {}
        estados.map((estado) => {
            if(estado.sigla === estadoValue) {
                return estadoSelect = {id: estado.id, estado: estado.estado, sigla: estado.sigla}
            }
        })

        let cidade = {cidade: cidadeValue, estado: estadoSelect}
        CidadeService.createCidade(cidade)
        setAddCidade(false)

        cidades.push({id: createId, cidade: cidadeValue, estado: estadoSelect})
    }

    return (
        <div className = "Table">
            <div className = "mainList">
                <div>
                    <span className='listColumnLeft'> Cidade: </span>
                    <span className='listColumnRight'> Estado: </span>
                    <button className="addButton" onClick={() => setAddCidade(true)}><AddIcon /></button>
                </div>
                    <table>
                        <tbody>
                            {cidades.map((cidade) => { return (
                                <tr key = {cidade.id}>
                                    { editCidade && selectedCidade === cidade.id ? (
                                        <div className='listItem'>
                                            <td><textarea autoFocus id="editCidadeArea" className="textArea" placeholder='Cidade' value={cidade.cidade} rows={1} /></td>
                                            <td>
                                                <select id="editCidadeEstadoArea" className='selector'>
                                                    {estados.map((estado) => { return (                               
                                                            <option key = {estado.id}>{estado.sigla}</option>
                                                        )}
                                                    )}
                                                </select>
                                            </td>
                                            <td>
                                                <button className="leftButton" onClick={() => (editCidadeAction(cidade.id))}><CheckIcon /></button>
                                                <button className="rightButton" onClick={() => (setEditCidade(false))}><CrossIcon /></button>
                                            </td>
                                        </div>
                                    ) : (
                                        <div className='listItem'>
                                            <td className='itemTextLeft'><span>{cidade.cidade}</span></td>
                                            <td className='itemTextRight'><span>{cidade.estado.sigla}</span></td>
                                            <td>
                                                <button className="leftButton" onClick={() => {setSelectedCidade(cidade.id); setEditCidade(true)}}><EditFilledIcon /></button>
                                                <button className="rightButton" onClick={() => deleteCidade(cidade.id)}><TrashIcon /></button>
                                            </td>
                                        </div>
                                    )}
                                </tr>
                                )}
                            )}
                        </tbody>
                        {addCidade ? (
                            <div className='listItem'>
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
                            </div>
                        ) : (
                            null
                        )}
                </table>
            </div>
        </div>
    )
}

export default Cidades