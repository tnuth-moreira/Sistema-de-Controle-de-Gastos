const express = require('express');
const contas = require('./controladores/clientes'); 

const rotas = express(); 

rotas.get('/contas', contas.listarContas);
  

module.exports = rotas;