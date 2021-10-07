import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getReporteByCarnet } from '../../selectors/getReporteByCarnet'

export const ListaReportes = ({ carnet }) => {

    const [atendido, setAtendido] = useState('');
    const [reportes, setReportes] = useState([]);

    const cargar = async (car) => {
        const {reportes, atendido} = await getReporteByCarnet(car);
        console.log('reportes');
        console.log(reportes);
        setAtendido(atendido);
        setReportes(reportes);
    }

    useEffect(() => {
        cargar(carnet);
    }, [carnet]);
    

    return (
        <>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Carnet</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Proyecto</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Servidor</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        reportes.map(reporte => (
                            <tr key={reporte._id}>
                                <td>{reporte.carnet}</td>
                                <td>{reporte.nombre}</td>
                                <td>{reporte.proyecto}</td>
                                <td>{reporte.fecha.substring(0, 10)}</td>
                                <td>{reporte.servidor}</td>
                                <td> <Link className="link-light" to={`./reporte/${reporte._id}`}> Ver </Link> </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="mb-3">
                <label className="form-label">Solicitud atendida por: {atendido}</label>
            </div>
        </>

    )
}
