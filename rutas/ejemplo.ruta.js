const express = require('express');
const rutas = express.Router();
const EjemploServicio = require('./../servicios/ejemplo.servicio');
const validarManejador = require('./../middlewares/validar.manejador');
const EjemploEsquema = require('./../esquemas/ejemplo.esquema');

const servicio = new EjemploServicio();

rutas.get('/', (peticion, respuesta, siguiente)=>{
  try{
    servicio.buscar();
    respuesta.status(200).json('Endpoint ejemplo get');
  }catch(error){
    siguiente(error);
  }
});

rutas.get('/:id',
validarManejador(EjemploEsquema.obtener, 'params'),
(peticion, respuesta)=>{
    const { id } = peticion.params;
    respuesta.status(200).json(`Endpoint ejemplo get id: ${id}`);
  }
);

rutas.post('/', (peticion, respuesta)=>{
  const datos = peticion.body;
  respuesta.status(201).json({mensaje: 'Endpoint ejemplo post ', datos: datos});
  // servicio.crear();

});

rutas.patch('/:id', (peticion, respuesta)=>{
  const { id } = peticion.params;
  const datos = peticion.body;
  respuesta.status(200).json({mensaje: 'Endpoint ejemplo patch id: '+id, datos: datos});
  // servicio.actualizar(id);

});

rutas.delete('/:id', (peticion, respuesta)=>{
  const { id } = peticion.params;
  respuesta.status(200).json('Endpoint ejemplo delete id: ', id);
  // servicio.eliminar(id);
});

module.exports = rutas;
