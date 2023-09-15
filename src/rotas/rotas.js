const express = require("express");
const {
    listarContas,
    criarConta,
    atualizarUsuarioConta,
    excluirConta,
    deposito,
    saque,
    transferencia,
    saldo,
    extrato
} = require("../controladores/controle");
const { senhaBanco, senhaSaldo, senhaExtrato } = require("../intermediarios/intermediarios");


const rotas = express();

rotas.get('/contas', senhaBanco, listarContas);
rotas.get('/contas/saldo', senhaSaldo, saldo);
rotas.get('/contas/extrato', senhaExtrato, extrato);

rotas.post('/contas', criarConta);
rotas.post('/transacoes/depositar', deposito);
rotas.post('/transacoes/sacar', saque);
rotas.post('/transacoes/transferir', transferencia);

rotas.put('/contas/:id/usuario', atualizarUsuarioConta);

rotas.delete('/contas/:id', excluirConta);

module.exports = rotas;
