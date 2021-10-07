import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getReporteById } from '../../selectors/getReporteById';

export const ReporteIndividual = () => {

    const {id} = useParams();

    const [carnet, setCarnet] = useState('');
    const [nombre, setNombre] = useState('');
    const [proyecto, setProyecto] = useState('');
    const [fecha, setFecha] = useState('');
    const [servidor, setServidor] = useState('');
    const [reporte, setReporte] = useState('');
    const [atendido, setAtendido] = useState('');

    const cargar = async (i) => {
        const {carnet, nombre, proyecto, fecha, servidor, reporte, atendido} = await getReporteById(i);
        setCarnet(carnet);
        setNombre(nombre);
        setProyecto(proyecto);
        setFecha(fecha);
        setServidor(servidor);
        setReporte(reporte);
        setAtendido(atendido);
    }

    useEffect(() => {
        cargar(id);
    }, [id]);

    return (
        <div>
            <form>
                <legend>Ver reporte</legend>
                <div className="mb-3">
                    <label htmlFor="carnetTextInput" className="form-label">Carnet</label>
                    <input type="text" id="carnetTextInput" className="form-control" placeholder="Carnet" defaultValue={carnet} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="NombreTextInput" className="form-label">Nombre</label>
                    <input type="text" id="NombreTextInput" className="form-control" placeholder="Nombre" defaultValue={nombre} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="cursoTextInput" className="form-label">Curso / Proyecto</label>
                    <input type="text" id="cursoTextInput" className="form-control" placeholder="Curso o Proyecto" defaultValue={proyecto} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="procesadoTextInput" className="form-label">Procesado por</label>
                    <input type="text" id="procesadoTextInput" className="form-control" placeholder="Procesado por" defaultValue={servidor} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="fechaTextInput" className="form-label">Fecha</label>
                    <input type="text" id="fechaTextInput" className="form-control" placeholder="Fecha" defaultValue={fecha} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="reporteTextarea" className="form-label">Cuerpo del mensaje</label>
                    <textarea className="form-control" placeholder="Reporte o Mensaje" id="reporteTextarea" defaultValue={reporte} readOnly></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Solicitud atendida por: {atendido}</label>
                </div>
            </form>
        </div>
    )
}
