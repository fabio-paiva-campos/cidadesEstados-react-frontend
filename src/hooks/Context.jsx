import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import CidadeService from "../services/CidadeService";
import EstadoService from "../services/EstadoService";

export function createId() {
    return Math.random()
}

const Context = createContext(!undefined)

export function ContextWrap({children}) {
    let arr = []
    let str = "username"
    const [logged, setLogged] = useState(false)
    const [userName, setUserName] = useState(str)
    const [cidades, setCidades] = useState(arr)
    const [estados, setEstados] = useState(arr)

    useEffect(() => {
        CidadeService.getCidade().then((res) => {setCidades(res.data)})
        EstadoService.getEstado().then((res) => {setEstados(res.data)})
    }, [])

    return (
        <Context.Provider value = {[logged, setLogged, userName, setUserName, cidades, setCidades, estados, setEstados]}>
            {children}
        </Context.Provider>
    )
}

export function useAppContext() {
    return useContext(Context)
}