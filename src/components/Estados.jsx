import React, { useEffect, useState } from 'react'
import EstadoService from '../services/EstadoService'
import CidadeService from '../services/CidadeService'

import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled'
import TrashIcon from '@atlaskit/icon/glyph/trash'
import AddIcon from '@atlaskit/icon/glyph/add'
import CheckIcon from '@atlaskit/icon/glyph/check';
import CrossIcon from '@atlaskit/icon/glyph/cross';

import { createId, useAppContext } from '../hooks/Context';

const Estados = () => {
    let arr = []
    const [estados, setEstados] = useState(arr)
    const [cidades, setCidades] = useState(arr)
    const [addEstado, setAddEstado] = useState(false)
    const [editEstado, setEditEstado] = useState(false)
    const [selectedEstado, setSelectedEstado] = useState(0)

    useEffect(() => {
        EstadoService.getEstado().then((res) => {setEstados(res.data)})
        CidadeService.getCidade().then((res) => {setCidades(res.data)})
    }, [])

    function deleteEstado(id){
        cidades.map((cidade) => {
            if (cidade.estado.id === id) {
                CidadeService.deleteCidade(cidade.id)
            }
        })

        let estadosFinal = [...estados]
        if(window.confirm('Excluir Estado? Isso também excluirá todas as cidades que pertencem a ele')) {
            EstadoService.deleteEstado(id)
            estadosFinal.forEach((estado, index) => {
                if (estado.id === id) {
                    estadosFinal.splice(index, 1)
                }
            })
            setEstados(estadosFinal)
        }
    }

    function editEstadoAction(id){
        let index = id
        let estadoValue = document.getElementById("editEstadoArea").value
        let siglaValue = document.getElementById("editSiglaArea").value

        let estado = {estado: estadoValue, sigla: siglaValue}

        EstadoService.updateEstado(estado, index)
        setEditEstado(false)

        let estadosFinal = [...estados]
        estadosFinal.forEach((estado) => {
            if(estado.id === id) {
                estado.estado = estadoValue
                estado.sigla = siglaValue
            }
        })
    }

    function addEstadoAction(){
        let estadoValue = document.getElementById("addEstadoArea").value
        let siglaValue = document.getElementById("addSiglaArea").value

        let estado = {estado: estadoValue, sigla: siglaValue}

        EstadoService.createEstado(estado)
        setAddEstado(false)

        estados.push({id: createId, estado: estadoValue, sigla: siglaValue})
    }

    return (
        <div className = "Table">
            <div className = "mainList">
                <div>
                    <span className='listColumnLeft'> Estado: </span>
                    <span className='listColumnRight'> Sigla: </span>
                    <button className="addButton" onClick={() => setAddEstado(true)}><AddIcon /></button>
                </div>
                <table>
                    <tbody>
                        {estados.map((estado) => { return (
                            <tr key = {estado.id}>
                                { editEstado && selectedEstado === estado.id ? (
                                    <div className='listItem'>
                                        <td><textarea autoFocus id="editEstadoArea" className="textArea" placeholder='Estado' defaultValue={estado.estado} rows={1} /></td>
                                        <td><textarea id="editSiglaArea" className="textAreaRight" placeholder='Sigla' defaultValue={estado.sigla} rows={1} /></td>
                                        <td>
                                            <button className="leftButton" onClick={() => (editEstadoAction(estado.id))}><CheckIcon /></button>
                                            <button className="rightButton" onClick={() => (setEditEstado(false))}><CrossIcon /></button>
                                        </td>
                                    </div>
                                ) : (
                                    <div className='listItem'>
                                        <td className='itemTextLeft'><span>{estado.estado}</span></td>
                                        <td className='itemTextRight'><span>{estado.sigla}</span></td>
                                        <td>
                                            <button className="leftButton" onClick={() => {setSelectedEstado(estado.id); setEditEstado(true)}}><EditFilledIcon /></button>
                                            <button className="rightButton" onClick={() => deleteEstado(estado.id)}><TrashIcon /></button>
                                        </td>
                                    </div>
                                )}
                            </tr>
                            )}
                        )}
                    </tbody>
                    {addEstado ? (
                        <div className='listItem'>
                            <td><textarea autoFocus id="addEstadoArea" className="textArea" placeholder='Estado' defaultValue='' rows={1} /></td>
                            <td><textarea id="addSiglaArea" className="textAreaRight" placeholder='Sigla' defaultValue='' rows={1} /></td>
                            <td>
                                <button className="leftButton" onClick={() => (addEstadoAction())}><CheckIcon /></button>
                                <button className="rightButton" onClick={() => (setAddEstado(false))}><CrossIcon /></button>
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

export default Estados