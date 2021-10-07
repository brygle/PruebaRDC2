import React, { useState } from 'react'
import { Reportes } from './Reportes'
import { ListaReportes } from './ListaReportes'

export const Pantalla = () => {
    
    const [carnet, setCarnet] = useState('');

    
    return (
        <div>
            <Reportes setCarnet={setCarnet} />
            <ListaReportes carnet={carnet}/>
            
        </div>
    )
}
