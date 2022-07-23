const express = require('express');
const ejemploRouta = require('./ejemplo.ruta');

function rutaApi(app){
  const ruta1 = express.Router();
  app.use('/api/v1',ruta1);
  ruta1.use('/ejemplo',ejemploRouta);
};

module.exports = rutaApi;
