const datos = require('./../configuracion/conexion.json');
const mysql = require('mysql');

class Basedatos {

  conexion = null;
  constructor(){
    this.conexion = mysql.createConnection({
      host: datos.host,
      user: datos.usuario,
      password: datos.contra,
      database: datos.basedatos
    });

    this.conexion.connect(function(error) {
      if (error) throw new Error(`500-${error}`);
      console.log(`Conexion realizada exitosamente.`);
    });
  }

  async consulta(consulta){
    return new Promise((resolver, rechazar)=>{
      this.conexion.query(consulta, (error, resultado, campos)=>{
        if (error){
          rechazar(error);
          throw new Error(`500-${error}`);
        }
        resolver({resultado, campos});
      });
    })
  }
  async buscar(tabla, campos, datosFiltros, inicio = 1, limite = 1){
    return new Promise((resolver, rechazar)=>{
        const filtros = this.filtro(datosFiltros);
        let consulta = `SELECT ${campos} FROM ${tabla} `;
        if(filtros.length) consulta += `WHERE ${filtros.filtros} `;
        consulta += `LIMIT ${inicio}, ${limite}`;
        this.conexion.query(consulta, [...filtros.valores], (error, resultado, campos)=>{
          if (error){
            rechazar(error);
            throw new Error(`500-${error}`);
          }
          resolver({resultado, campos});
        });
    })
  }

  async insertar(tabla, datos){
    return new Promise((resolver, rechazar)=>{
      let campos = [], valores = [], referencias = [];
      Object.entries(datos).forEach(([clave, valor], indice) => {
        campos.push(clave);
        valores.push(valor);
        referencias.push('?');
      });
      const consulta = `INSERT INTO ${tabla} (${campos})VALUES(${referencias})`;
      this.conexion.query(consulta, valores, (error, resultado, campos)=>{
        if (error){
          rechazar(error);
          throw new Error(`500-${error}`);
        }
        resolver({
          idInsertado: resultado.insertId,
          filasInsertadas: resultado.affectedRows,
        });
      });
    });
  }

  async actualizar(tabla, datos, datosFiltros, limite = 1){
    return new Promise((resolver, rechazar)=>{
      const filtros = this.filtro(datosFiltros);
      let campos = [], valores = [], referencias = [];
      Object.entries(datos).forEach(([clave, valor], indice) => {
        campos.push(clave);
        valores.push(valor);
        referencias.push('?');
      });
      let consulta = `UPDATE ${tabla} SET ${$referencias} `;
      if(datosFiltros.length){
        consulta += `WHERE ${filtros} LIMIT ${limite}`;
      }
      this.conexion.query(consulta, valores, (error, resultado, campos)=>{
        if (error){
          rechazar(error);
          throw new Error(`500-${error}`);
        }
        resolver({
          filasActualizadas: resultado.changedRows,
        });
      });
    })
  }

  async eliminar(tabla, datosFiltros, limite = 1){
    return new Promise((resolver, rechazar)=>{
      const filtros = filtro(datosFiltros);
      let consulta = `DELETE FROM ${tabla} `;
      if(datosFiltros.length){
        consulta += `WHERE ${filtros}`
      }
      consulta += ` LIMIT ${limite}`
      this.conexion.query(consulta, valores, (error, resultado, campos)=>{
        if (error){
          rechazar(error);
          throw new Error(`500-${error}`);
        }
        resolver({filasEliminadas: affectedRows});
      });
    })
  }

  filtro(datos){
    let filtros = ['1 = 1 '];
    let valores = [];
    if(filtros.length){
      Object.entries(datos).forEach(([clave, valor], indice) => {
        filtros.push(`${clave} = ?`);
        valores.push(valor);
      });
    }
    return {filtros, valores};
  }
}

module.exports = new Basedatos();
