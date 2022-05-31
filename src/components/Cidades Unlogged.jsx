import React, { useState, useEffect } from 'react'
import EstadoService from '../services/EstadoService'
import CidadeService from '../services/CidadeService'

import { useAppContext } from '../hooks/Context';

const CidadesUnlogged = () => {
    let arr = []
    const [estados, setEstados] = useState(arr)
    const [cidades, setCidades] = useState(arr)

    useEffect(() => {
        EstadoService.getEstado().then((res) => {setEstados(res.data)})
        CidadeService.getCidade().then((res) => {setCidades(res.data)})
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
                        {cidades.map((cidade) => { return (
                            <tr key = {cidade.id}>
                                <div className='listItem'>
                                    <td className='itemTextLeft'><span>{cidade.cidade}</span></td>
                                    <td className='itemTextRight'><span>{cidade.estado.sigla}</span></td>
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

export default CidadesUnlogged