const express = require('express');
const cors = require('cors');


const {
  listarTodos,
  listarUno,
  registrar,
  detalle
} = require('../controller/reporte.controller');
const app = express();
app.use((req, res, next) => {
  /*res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();*/
  let allowedOrigins = ["http://localhost:8080"]
let origin = req.headers.origin;

if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin); // restrict it to the required domain
    console.log('**************************************')
    console.log('**************************************')
    console.log('si imprime')
    console.log('**************************************')
    console.log('**************************************')
}
});
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json());

app.get('/', (req, res) => {
  console.log('inicio de api')
  res.send('Redes 2 :D');
});





/**
 * METODO: POST
 * ENDPOINT: /registrarReporte
 * BODY: {carnet: string, curso: string, nombre: string, reporte: string}
 * RESPONSE: {msg: string}
 * ERROR: {msg: string}
 */
app.post('/registrarReporte',  async (req, res) => {
  const { carnet, curso, nombre, reporte } = req.body;
  if (!carnet || !curso || !nombre || !reporte) {
    return res.status(400).json({
      msg: "No se puede completar la petición. Faltan campos."
    })
  }
    const result = await registrar(carnet, curso, nombre, reporte);
    return res.status(200).json({ msg: "ok" })
});

/**
 * METODO: GET
 * ENDPOINT: /registrarReporte/:carnet
 * PARAMS: {carnet: string}
 * RESPONSE: {atendido: string, 
 *          reportes: [{carnet: string, fecha: string (yyyy-mm-dd), id: string, nombre: string, proyecto: string, reporte: string, servidor: string}]}
 */
app.post('/getReportes',  async (req, res) => {
  const params = req.body;
  if (!params.carnet) {
    const result = await listarTodos();
    return res.status(200).json(result);
  } else {
    const result = await listarUno(params.carnet);
    return res.status(200).json(result);
  }
})

/**
 * METODO: POST
 * ENDPOINT: /reporte/:id
 * PARAMS: {id: string}
 * RESPONSE: {atendido: string, carnet: string, fecha: string (yyyy-mm-dd), id: string, nombre: string, proyecto: string, reporte: string, servidor: string}
 */
 app.post('/reporte',  async (req, res) => {
  const params = req.body;
  
  const response = await detalle(params.id);
  
  return res.status(200).json({
    atendido:  `Solicitud atendida por el servidor ${process.env.SERVER_ID}`,
    carnet: response.carnet,
    fecha: response.fecha.toISOString().split('T')[0],
    id: response._id,
    nombre: response.nombre,
    proyecto: response.proyecto,
    reporte: response.reporte,
    servidor: response.servidor
  })
})

module.exports = app;