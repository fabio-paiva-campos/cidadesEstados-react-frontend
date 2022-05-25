import React, { useState } from 'react'
import EstadoService from '../services/EstadoService'

import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled'
import TrashIcon from '@atlaskit/icon/glyph/trash'
import AddIcon from '@atlaskit/icon/glyph/add'
import CheckIcon from '@atlaskit/icon/glyph/check';
import CrossIcon from '@atlaskit/icon/glyph/cross';

const Estados = () => {
    let arr = []
    const [estados, setEstados] = useState(arr)
    const [addEstado, setAddEstado] = useState(false)
    const [editEstado, setEditEstado] = useState(false)
    const [selectedEstado, setSelectedEstado] = useState(0)

    React.useEffect(() => {
        EstadoService.getEstado().then((res) => {setEstados(res.data)})
    }, []);

    function deleteEstado(id){
        EstadoService.deleteEstado(id)
    }

    function editEstadoAction(id){
        let index = id
        let estadoValue = document.getElementById("editEstadoArea").value
        let siglaValue = document.getElementById("editSiglaArea").value

        let estado = {estado: estadoValue, sigla: siglaValue}

        EstadoService.updateEstado(estado, index)
        setEditEstado(false)
    }

    function addEstadoAction(){
        let estadoValue = document.getElementById("addEstadoArea").value
        let siglaValue = document.getElementById("addSiglaArea").value

        let estado = {estado: estadoValue, sigla: siglaValue}

        EstadoService.createEstado(estado)
        setAddEstado(false)
    }

    return (
        <div className = "Table">
            <table className = "mainList">
                <thead>
                    <tr>
                        <th className='listColumn'> Estado: </th>
                        <th className='listColumn'> Sigla: </th>
                        <button className="addButton" onClick={() => setAddEstado(true)}><AddIcon /></button>
                    </tr>
                </thead>
                <tbody>
                    {estados.map((estado) => { return (
                        <tr key = {estado.id}>
                            { editEstado && selectedEstado === estado.id ? (
                                <>
                                    <td><textarea autoFocus id="editEstadoArea" className="textArea" placeholder='Estado' defaultValue={estado.estado} rows={1} /></td>
                                    <td><textarea id="editSiglaArea" className="textArea" placeholder='Sigla' defaultValue={estado.sigla} rows={1} /></td>
                                    <td>
                                        <button className="leftButton" onClick={() => (editEstadoAction(estado.id))}><CheckIcon /></button>
                                        <button className="rightButton" onClick={() => (setEditEstado(false))}><CrossIcon /></button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className='listItem'>{estado.estado}</td>
                                    <td className='listItem'>{estado.sigla}</td>
                                    <td>
                                        <button className="leftButton" onClick={() => {setSelectedEstado(estado.id); setEditEstado(true)}}><EditFilledIcon /></button>
                                        <button className="rightButton" onClick={() => deleteEstado(estado.id)}><TrashIcon /></button>
                                    </td>
                                </>
                            )}
                        </tr>
                        )}
                    )}
                    {addEstado ? (
                        <>
                            <td><textarea autoFocus id="addEstadoArea" className="textArea" placeholder='Estado' defaultValue='' rows={1} /></td>
                            <td><textarea id="addSiglaArea" className="textArea" placeholder='Sigla' defaultValue='' rows={1} /></td>
                            <td>
                                <button className="leftButton" onClick={() => (addEstadoAction())}><CheckIcon /></button>
                                <button className="rightButton" onClick={() => (setAddEstado(false))}><CrossIcon /></button>
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

export default Estados