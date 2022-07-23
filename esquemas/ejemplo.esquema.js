const joi = require('joi');


const EjemploEsquema = ()=>{};
const ejemplo = joi.string().alphanum().min(5).max(10);
const id = joi.number();


EjemploEsquema.crear = joi.object({
  ejemplo: ejemplo.required(),
});

EjemploEsquema.actualizar = joi.object({
  ejemplo: ejemplo,
});

EjemploEsquema.obtener = joi.object({
  id: id.required(),
});

module.exports = EjemploEsquema;
