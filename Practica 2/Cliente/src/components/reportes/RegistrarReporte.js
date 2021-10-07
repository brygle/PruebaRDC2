import React, { useState } from 'react'
import { postReporte } from '../../selectors/postReporte';

export const RegistrarReporte = () => {

    const [carnet, setCarnet] = useState('');
    const [nombre, setNombre] = useState('');
    const [curso, setCurso] = useState('');
    const [reporte, setReporte] = useState('');


    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(carnet);
        console.log(nombre);
        console.log(curso);
        console.log(reporte);
        /*
            CONSUMIR API
        */
        const respuesta = await postReporte(carnet, nombre, curso, reporte);
        const mensaje = await respuesta;
        console.log(mensaje);
        alert('Reporte ingresado correctamente!!!');
        limpiar();
    }

    const carnetChange = (e) => {
        setCarnet(e.target.value);
    }

    const nombreChange = (e) => {
        setNombre(e.target.value);
    }

    const cursoChange = (e) => {
        setCurso(e.target.value);
    }

    const reporteChange = (e) => {
        setReporte(e.target.value);
    }

    const limpiar = () => {
        setCarnet('');
        setNombre('');
        setCurso('');
        setReporte('');
    }

    return (
        <div>
            <form onSubmit={ handleSubmit }>
                <legend>Ingreso de Reportes de Practicantes</legend>
                <div className="mb-3">
                    <label htmlFor="carnetTextInput" className="form-label">Carnet</label>
                    <input type="text" id="carnetTextInput" className="form-control" placeholder="Carnet" value={carnet} onChange={carnetChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="NombreTextInput" className="form-label">Nombre</label>
                    <input type="text" id="NombreTextInput" className="form-control" placeholder="Nombre" value={nombre} onChange={nombreChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cursoTextInput" className="form-label">Curso / Proyecto</label>
                    <input type="text" id="cursoTextInput" className="form-control" placeholder="Curso o Proyecto" value={curso} onChange={cursoChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="reporteTextarea" className="form-label">Cuerpo del mensaje</label>
                    <textarea className="form-control" placeholder="Reporte o Mensaje" id="reporteTextarea" value={reporte} onChange={reporteChange}></textarea>
                </div>
                <button className="btn btn-dark">Registrar</button>
                
            </form>
        </div>
    )
}
