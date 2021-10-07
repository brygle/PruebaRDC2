import { creds } from '../data/url';
export const getReporteById = async (i) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            { 
                id: i
            }
        )
    };
    let datos;
    //await fetch('http://localhost:3100/reporte', requestOptions)
    await fetch(creds['middleware'] + ':' + creds['port'] +'/reporte', requestOptions)
        .then(response => response.json())
        .then(data => {
            datos =  data;
        }
    );
    console.log(datos);
    return datos;
}
