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

  consulta(consulta, funcion){
    this.conexion.query(consulta, function (error, resultado, campos) {
      if (error) throw new Error(`500-${error}`);
      funcion(error, resultado, campos);
    });
  }
}

module.exports = new Basedatos();
