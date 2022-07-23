function validarManejador(esquema, propiedad){
  return (peticion, respuesta, siguiente) =>{
    const datos = peticion[propiedad];
    const { error } = esquema.validate(datos);
    if(error){
      throw new Error(`400 - ${error}`);
    }else{
      siguiente();
    }
  }
}

module.exports = validarManejador;
