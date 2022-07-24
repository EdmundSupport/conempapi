const express = require('express');
const rutas = express.Router();
const PersonaServicio = require('./../servicios/persona.servicio');
const validarManejador = require('./../middlewares/validar.manejador');
const PersonaEsquema = require('./../esquemas/persona.esquema');

const servicio = new PersonaServicio();

//buscar
rutas.get('/',
  validarManejador(PersonaEsquema.obtener, 'query'),
  async (peticion, respuesta, siguiente)=>{
    try{
      const filtro = peticion.query;
      const resultado = await servicio.buscar(filtro);
      if(resultado.length){
        respuesta.status(200).json({
          codigo: 200,
          mensaje: 'Datos obtenidos con exito.',
          datos: resultado,
        });
      }else{
        respuesta.status(200).json({
          codigo: 404,
          mensaje: 'No se encontraron datos.',
          datos: resultado,
        });
      }
    }catch(error){
      siguiente(error);
    }
  }
);

//Buscar Uno
rutas.get('/:personas_id',
  validarManejador(PersonaEsquema.obtenerUno, 'params'),
  async (peticion, respuesta)=>{
    const { personas_id } = peticion.params;
    const filtro = peticion.query;
    const resultado = await servicio.buscarUno({...filtro, personas_id: personas_id});
    if(resultado.length){
      respuesta.status(200).json({
        codigo: 200,
        mensaje: 'Datos obtenidos con exito.',
        datos: resultado,
      });
    }else{
      respuesta.status(200).json({
        codigo: 404,
        mensaje: 'No se encontraron datos.',
        datos: resultado,
      });
    }
  }
);

//Crear
rutas.post('/',
validarManejador(PersonaEsquema.crear, 'body'),
async (peticion, respuesta)=>{
    const datos = peticion.body;
    const resultado = await servicio.crear(datos);
    if(resultado > 0){
      respuesta.status(201).json({
        codigo: 200,
        mensaje: 'Dato creado exitosamente con el ID: '+resultado,
        datos: resultado,
      });
    }else{
      respuesta.status(200).json({
        codigo: 404,
        mensaje: 'Dato no creado. Contacte al administrador.',
        datos: resultado,
      });
    }
});

//Actualizar parcialmente
rutas.patch('/:personas_id',
validarManejador(PersonaEsquema.obtenerUno, 'params'),
validarManejador(PersonaEsquema.actualizar, 'body'),
async (peticion, respuesta)=>{
  const { personas_id } = peticion.params;
  const datos = peticion.body;
    const resultado = await servicio.actualizar(datos, {personas_id: personas_id});
    if(resultado > 0){
      respuesta.status(200).json({
        codigo: 200,
        mensaje: `Se actualizaron ${resultado} datos.`,
        datos: resultado,
      });
    }else{
      respuesta.status(200).json({
        codigo: 404,
        mensaje: 'No se actualizaron datos.',
        datos: resultado,
      });
    }
});

//Eliminar
rutas.delete('/:personas_id',
validarManejador(PersonaEsquema.obtenerUno, 'params'),
async (peticion, respuesta)=>{
  const { personas_id } = peticion.params;
  const filtro = peticion.query;
    const resultado = await servicio.eliminar({...filtro, personas_id: personas_id});
    if(resultado > 0){
      respuesta.status(200).json({
        codigo: 200,
        mensaje: `Se elimino correctamente el dato. ID: ${personas_id}`,
        datos: resultado,
      });
    }else{
      respuesta.status(200).json({
        codigo: 404,
        mensaje: 'No se actualizaron datos.',
        datos: resultado,
      });
    }
});

module.exports = rutas;
