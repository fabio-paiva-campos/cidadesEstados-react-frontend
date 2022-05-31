import React, { useState, useEffect } from 'react'
import EstadoService from '../services/EstadoService'

import { useAppContext } from '../hooks/Context';

const EstadosUnlogged = () => {
    let arr = []
    const [estados, setEstados] = useState(arr)

    useEffect(() => {
        EstadoService.getEstado().then((res) => {setEstados(res.data)})
    }, [])

    return (
        <div className = "Table">
            <div className = "mainList">
                <div>
                    <span className='listColumnLeft'> Cidade: </span>
                    <span className='listColumnRight'> Estado: </span>
                </div>
                <table>
                    <tbody>
                        {estados.map((estado) => { return (
                            <tr key = {estado.id}>
                                <div className='listItem'>
                                    <td className='itemTextLeft'><span>{estado.estado}</span></td>
                                    <td className='itemTextRight'><span>{estado.sigla}</span></td>
                                </div>
                            </tr>
                            )}
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EstadosUnlogged