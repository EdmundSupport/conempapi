const bd = require('./basedatos.servicio');

class PersonaServicio {
  campos = "personas_id, nombres, apellidos, fecha_nac, estado";
  tabla = 'personas';
  constructor(){
  }

  async crear(datos){
    try{
      const resultado = await bd.insertar(this.tabla, datos);
      if(resultado.idInsertado) return resultado.idInsertado;
      return 0;
    }catch(error){
      throw new Error(`500-${error}`);
    }
  }

  async buscar(filtro, inicio = 1, limite = 50){
    try{
      const resultado = await bd.buscar(this.tabla, this.campos, filtro, inicio, limite);
      if(resultado.resultado.length) return resultado.resultado;
      else return [];
    }catch(error){
      throw new Error(`500-${error}`);
    }
  }

  async buscarUno(filtro){
    try{
      const resultado = await bd.buscar(this.tabla, this.campos, filtro, 1, 1);
      if(resultado.resultado.length) return resultado.resultado;
      return [];
    }catch(error){
      throw new Error(`500-${error}`);
    }
  }

  async actualizar(datos, filtros, limite = 1){
    try{
      const resultado = await bd.actualizar(this.tabla, datos, filtros, limite);
      if(resultado.filasActualizadas) return resultado.filasActualizadas;
      return 0;
    }catch(error){
      throw new Error(`500-${error}`);
    }
  }

  async eliminar(filtros, limite = 1){
    try{
      const resultado = await bd.eliminar(this.tabla, filtros, limite);
      if(resultado.filasEliminadas) return resultado.filasEliminadas;
      return 0;
    }catch(error){
      throw new Error(`500-${error}`);
    }
  }
}

module.exports = PersonaServicio;
