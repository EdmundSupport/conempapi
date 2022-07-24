const joi = require('joi');

const PersonaEsquema = ()=>{};
const personas_id = joi.number();
const nombres = joi.string().max(100);
const apellidos = joi.string().max(100);
const fecha_nac = joi.date().max(new Date());
const estado = joi.number();

PersonaEsquema.crear = joi.object({
  nombres: nombres.required(),
  apellidos: apellidos.required(),
  fecha_nac: fecha_nac,
  estado: estado.required(),
});

PersonaEsquema.actualizar = joi.object({
  personas_id: personas_id.required(),
  nombres: nombres,
  apellidos: apellidos,
  fecha_nac: fecha_nac,
  estado: estado,
});

PersonaEsquema.obtener = joi.object({
  personas_id: personas_id,
  nombres: nombres,
  apellidos: apellidos,
  fecha_nac: fecha_nac,
  estado: estado,
});

PersonaEsquema.obtenerUno = joi.object({
  personas_id: personas_id.required(),
  nombres: nombres,
  apellidos: apellidos,
  fecha_nac: fecha_nac,
  estado: estado,
});

PersonaEsquema.eliminar = joi.object({
  personas_id: personas_id.required(),
  nombres: nombres,
  apellidos: apellidos,
  fecha_nac: fecha_nac,
  estado: estado,
});

module.exports = PersonaEsquema;
