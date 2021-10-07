import { creds } from '../data/url';
export const postReporte = async (car, nom, cur, rep) => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            { 
                carnet: car,
                nombre: nom,
                curso: cur,
                reporte: rep
            }
        )
    };
    let datos;
    //await fetch('http://localhost:3100/registrarReporte', requestOptions)
    await fetch(creds['middleware'] + ':' + creds['port'] +'/registrarReporte', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log( data.msg );
            datos =  data;
        }
    );
    return datos;
}