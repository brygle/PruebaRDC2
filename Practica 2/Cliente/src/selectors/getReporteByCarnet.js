import { creds } from '../data/url';
export const getReporteByCarnet = async (car) => {

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(
            { 
                carnet: car
            }
        )
    };
    let datos;
    console.log(creds['middleware'] + ':' + creds['port'] + '/getReportes');
    //await fetch('http://localhost:3100/getReportes', requestOptions)
    await fetch(creds['middleware'] + ':' + creds['port'] +'/getReportes', requestOptions)
        .then(response => response.json())
        .then(data => {
            datos =  data;
            console.log(datos);
        }
    );
    return datos;
}
