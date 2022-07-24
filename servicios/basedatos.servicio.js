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
        resolver({error, resultado, campos});
      });
    })
  }

  async consulta(consulta, valores){
    return new Promise((resolver, rechazar)=>{
      this.conexion.query(consulta, valores, (error, resultado, campos)=>{
        if (error){
          rechazar(error);
          throw new Error(`500-${error}`);
        }
        resolver({error, resultado, campos});
      });
    })
  }
}

module.exports = new Basedatos();
