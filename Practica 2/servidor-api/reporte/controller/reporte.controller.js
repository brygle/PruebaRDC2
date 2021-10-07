const { Reporte } = require('../model/reporte.model');

/**
 * Registra un nuevo reporte
 * @param {String} carnet 
 * @param {String} curso 
 * @param {String} nombre 
 * @param {String} reporte 
 */
exports.registrar = async (carnet, curso, nombre, reporte) => {
  try {
    const nuevo = new Reporte({
      carnet : carnet,
      proyecto : curso, 
      nombre : nombre, 
      reporte : reporte, 
      fecha : new Date(),
      servidor :  process.env.SERVER_ID
    });

    await nuevo.save();

  } catch (e) {
    console.error(e);
  }
}

/**
 * Recuperar todos los reportes de la base de datos
 */
exports.listarTodos = async () => {
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

/**
 * Recuperar todos los reportes asociados a un carnet
 * @param {String} carnet 
 */
exports.listarUno = async (carnet) => {
  var resultSet = [];
  try {
    resultSet = await Reporte.find(
      {carnet},
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

/**
 * Recupera el detalle de un reporte usando el id del
 * objeto almacenado de la base de datos
 * @param {String} id 
 */
exports.detalle = async (id) => {
  try {
    const reporte = await Reporte.find({_id : id})
    
    return reporte[0]
  } catch (e) {
    console.error(e);
  }
}