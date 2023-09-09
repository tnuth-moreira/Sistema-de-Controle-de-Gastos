const { contas } = require("../bancodedados");
const { banco } = require("../bancodedados");
let { autenticador } = require("../bancodedados");

const listarContas = (req, res) => {
  const { senha_banco } = req.query;

  if (senha_banco !== banco.senha) {
    return res.status(403).json("Acesso Negado.Digite a senha novamente.");
  }

  return res.json(contas);
};

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(412).json("Por Favor, preencha todas as informações");
  }

  const conta = contas.find((conta) => {
    return conta.usuario.cpf === cpf;
  });

  if (conta) {
    return res.status(409).json("CPF já cadastrado!");
  }

  const novaConta = {
    autenticador: autenticador + 1,
    saldo: 0,
    usuario: {
      nome,
      cpf,
      telefone,
      email,
      senha,
    },
  };

  contas.push(novaConta);
  return res.status(201).json(novaConta);
};

const atualizarUsuarioConta = (req, res) => {
  const { id } = req.params;
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(412).json("Por Favor, preencha todas as informações");
  }

  const conta = banco.find((conta) => {
    return conta.id === Number(id);
  });

  if (!conta) {
    return res.status(404).json("Conta não encontrada");
  }

  contas.nome = nome;
  contas.cpf = cpf;
  contas.data_nascimento = data_nascimento;
  contas.telefone = telefone;
  contas.email = email; 
  contas.senha = senha

  return res.status(203).send();
};

module.exports = {
  listarContas,
  criarConta,
  atualizarUsuarioConta,
};
