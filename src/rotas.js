const express = require("express");
const {
    listarContas,
    criarConta,
    atualizarUsuarioConta,
    excluirConta,
    deposito,
} = require("./controladores/controle");

const rotas = express();

rotas.get('/contas', listarContas);

rotas.post('/contas', criarConta);
rotas.post('/transacoes/depositar', deposito);

rotas.put('/contas/:id/usuario', atualizarUsuarioConta);

rotas.delete('/contas/:id', excluirConta);

module.exports = rotas;
