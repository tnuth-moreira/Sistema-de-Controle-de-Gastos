const {contas} = require('../bancodedados');
const {banco} = require('../bancodedados');

let {newId} = require('../bancodedados');

const listarContas = (req, res) => {
    const {senha_banco} = req.query;

if(senha_banco !== banco.senha) { 
    return res.status(403).json("Acesso Negado.Digite a senha novamente.");
}

    return res.json(contas); 
}

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha} = req.body;

    if(!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(412).json("Por Favor, preencha todas as informações");
}

const newConta = { 
    id: newId++,
    saldo: 0,
    usuario: {
    nome, 
    cpf,
    data_nascimento,
    telefone,
    email,
    senha
}
}
    contas.push(newConta);
    return res.status(201).json(newConta);
}


module.exports = { 
    listarContas,
    criarConta

}