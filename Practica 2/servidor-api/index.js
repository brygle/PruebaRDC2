/*"use strict";
Object.defineProperty(exports, "__esModule", { value: true });*/
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    origin: '*'
}));
app.use(bodyParser.urlencoded({ extended: true }));

//-------------------------- SETTINGS -----------------
app.set('port', process.env.PORT || 3100);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reporteSchema = Schema({
    carnet: {
        type: Schema.Types.String,
        required: true,
    },
    nombre: {
        type: Schema.Types.String,
        required: true
    },
    proyecto: { // también puede tomar el nombre de curso
        type: Schema.Types.String,
        required: true
    },
    reporte: {
        type: Schema.Types.String,
        required: true
    },
    fecha: { // Momento en la que se almacenó el objeto
        type: Schema.Types.Date,
        default: Date.now
    },
    servidor: { // Servidor que proceso la escritura del objeto
        type: Schema.Types.String,
        default: 'saber'
    }
})

const Reporte = mongoose.model('reporte', reporteSchema);

mongoose.connect(`mongodb://${process.env.MONGO_URI}:27017/redes2-db`)
  .then(data => {
    console.info(`${data.connection.db.databaseName} online`);
  })
  .catch(error => console.error(error));

const registrar = async (carnet, curso, nombre, reporte) => {
    try {
        const nuevo = new Reporte({
            carnet: carnet,
            proyecto: curso,
            nombre: nombre,
            reporte: reporte,
            fecha: new Date(),
            servidor: process.env.SERVER_ID
        });

        await nuevo.save();

    } catch (e) {
        console.error(e);
    }
}

listarTodos = async () => {
    var resultSet = [];
    try {
        resultSet = await Reporte.find(
            {},
            'carnet fecha id nombre proyecto reporte servidor'
        ).exec();
    } catch (e) {
        console.error(e);
    }
    return {
        atendido: `Solicitud atendida por el servidor ${process.env.SERVER_ID}`,
        reportes: resultSet
    }
}

listarUno = async (carnet) => {
    console.log('entro aqui ' + carnet);
    var resultSet = [];
    try {
        resultSet = await Reporte.find(
            { carnet },
            'carnet fecha id nombre proyecto reporte servidor'
        ).exec();
    } catch (e) {
        console.error(e);
    }
    console.log(resultSet);
    return {
        atendido: `Solicitud atendida por el servidor ${process.env.SERVER_ID}`,
        reportes: resultSet
    }
}

detalle = async (id) => {
    try {
        const reporte = await Reporte.find({ _id: id })

        return reporte[0]
    } catch (e) {
        console.error(e);
    }
}

app.post('/registrarReporte', async function (req, res, next) {

    const { carnet, curso, nombre, reporte } = req.body;
    if (!carnet || !curso || !nombre || !reporte) {
        return res.status(400).json({
            msg: "No se puede completar la petición. Faltan campos."
        })
    }
    const result = await registrar(carnet, curso, nombre, reporte);
    return res.status(200).json({ msg: "ok" })
});

app.post('/getReportes', async (req, res) => {
    const params = req.body;
    
    if (!params.carnet) {
        const result = await listarTodos();
        return res.status(200).json(result);
    } else {
        const result = await listarUno(params.carnet);
        return res.status(200).json(result);
    }
})

app.post('/reporte', async (req, res) => {
    const params = req.body;

    const response = await detalle(params.id);

    return res.status(200).json({
        atendido: `Solicitud atendida por el servidor ${process.env.SERVER_ID}`,
        carnet: response.carnet,
        fecha: response.fecha.toISOString().split('T')[0],
        id: response._id,
        nombre: response.nombre,
        proyecto: response.proyecto,
        reporte: response.reporte,
        servidor: response.servidor
    })
})

//-------------------------- START SERVER ---------------
var server = app.listen(app.get('port'), function () {
    console.log('Servidor escuchando en puerto ' + app.get('port') + '...');
});