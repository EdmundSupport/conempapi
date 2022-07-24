const express = require('express');
const EjemploRuta = require('./ejemplo.ruta');
const PersonaRuta = require('./persona.ruta');

function rutaApi(app){
  const ruta1 = express.Router();
  app.use('/api/v1',ruta1);
  ruta1.use('/ejemplo',EjemploRuta);
  ruta1.use('/persona',PersonaRuta);
};

module.exports = rutaApi;
