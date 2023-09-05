const express = require("express");
const {
  listaClientes,
  buscarConta
} = require('./controladores/clientes');
const {validarSenha} = require('./intermediarios');
const app = express();



app.use(express.json());
app.use(validarSenha);

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.get('/contas', listaClientes);

module.exports = app;



  