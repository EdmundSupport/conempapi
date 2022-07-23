const express = require('express');
const rutaApi = require('./rutas');
const { errorConsola, errorManejador } = require('./middlewares/error.manejador');

const app = express();
const port = 3000;

app.use(express.json()); // middleware

rutaApi(app);

app.use(errorConsola);
app.use(errorManejador);

app.listen(port, () => {
  console.log("Compilacion exitosa. Endpoint http://localhost:3000/");
});

