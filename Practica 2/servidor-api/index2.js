require('dotenv').config();
require('./config/config').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// configura servidor
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
// configura conexión a base de datos
const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true
  /*,
  useCreateIndex: true*/
};

// configura las rutas del servidor
app.use(require('./reporte/routes/reporte.routes'));

mongoose.connect(process.env.MONGO_URI)
  .then(data => {
    console.info(`${data.connection.db.databaseName} online`);
    console.log(process.env.MONGO_URI);
  })
  .catch(error => console.error(error));

// inicia el servidor
module.exports = app.listen(process.env.PORT, process.env.HOST, () => {
  console.info(`listen ${process.env.HOST}:${process.env.PORT}`);
})