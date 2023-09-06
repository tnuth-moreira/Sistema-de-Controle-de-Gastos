const {contas} = require('../bancodedados');

const listarContas = (request, response) => {
return response.json(contas); 
}

module.exports = { 
    listarContas
}