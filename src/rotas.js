const express = require("express");
const contas = require("./controladores/clientes");

const rotas = express();

rotas.get("/contas", contas.listarContas);

rotas.post("/contas", contas.criarConta);

rotas.put('/contas/:id/usuario', contas.atualizarUsuarioConta);

module.exports = rotas;
