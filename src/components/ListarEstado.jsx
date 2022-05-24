import React, { Component, useState } from 'react'
import EstadoService from '../services/EstadoService'

import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled'
import TrashIcon from '@atlaskit/icon/glyph/trash'
import AddIcon from '@atlaskit/icon/glyph/add'

function ListarEstado() {
    let arr = []
    const [estados, setEstados] = useState(arr)
    const [addEstado, setAddEstado] = useState(false)
    const [editEstado, setEditEstado] = useState(false)
    const [selectedEstado, setSelectedEstado] = useState(0)

    EstadoService.getEstado().then((res) => {
        setEstados(res.data)
    })

    function deleteEstado(id){

    }

    function editEstadoAction(id){
        let index = id
        let estadoValue = document.getElementById("editEstadoArea").value
        let siglaValue = document.getElementById("editSiglaArea").value

        let estado = {estadoValue, siglaValue}

        EstadoService.updateEstado(estado, index)
        setEditEstado(false)
    }

    function addEstado(){

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
                                    <td><textarea id="editEstadoArea" placeholder='Estado' defaultValue={estado.estado} rows={1} /></td>
                                    <td><textarea id="editSiglaArea" placeholder='Sigla' defaultValue={estado.sigla} rows={1} /></td>
                                    <td>
                                        <button onClick={() => (editEstadoAction(estado.id))}>ok</button>
                                        <button onClick={() => (setEditEstado(false))}>x</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td className='listItem'>{estado.estado}</td>
                                    <td className='listItem'>{estado.sigla}</td>
                                    <td>
                                        <button onClick={() => {setSelectedEstado(estado.id); setEditEstado(true)}} className="editButton"><EditFilledIcon /></button>
                                        <button style={{ marginLeft: "10px" }} onClick={() => deleteEstado(estado.id)} className="deleteButton"><TrashIcon /></button>
                                    </td>
                                </>
                            )}
                        </tr>
                        )}
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ListarEstado