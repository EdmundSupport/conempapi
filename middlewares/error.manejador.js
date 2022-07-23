function errorConsola(error, peticion, respuesta, siguiente){
  siguiente(error);
}

function errorManejador(error, peticion, respuesta, siguiente){
  try{
    const errorSplit = error.message.split('-');
    const codigo = Number(errorSplit[0]);
    respuesta.status(codigo).json({
      mensaje: error.message,
      stack: error.stack,
    });
  }catch(err){
    respuesta.status(500).json({
      mensaje: error.message,
      stack: error.stack,
    });
  }
}

module.exports = { errorConsola, errorManejador }
