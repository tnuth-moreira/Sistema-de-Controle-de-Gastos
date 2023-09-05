const contasClientes = require('../bancodedados');


const listaClientes = (request, response) => { 
const {contas} = request.query;
let resultado = contasClientes; 

if (contas) { 
  resultado = contasClientes.filter((clientes) => { 
return clientes === contas; 

  });
}
  response.send(resultado);
}

const buscarConta = (request, response) => { 

}


module.exports = {listaClientes, buscarConta}; 