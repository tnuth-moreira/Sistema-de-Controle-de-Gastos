let { contas, id } = require("../bancodedados");
const { banco } = require("../bancodedados");


const listarContas = (req, res) => {
  const { senha_banco } = req.query;

  if (senha_banco !== banco.senha) {
    return res.status(403).json({ error: "Acesso Negado.Digite a senha novamente." });
  }

  return res.json(contas);
};

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(412).json({ error: "Por Favor, preencha todas as informações" });
  }

  const conta = contas.find((conta) => {
    return conta.usuario.cpf === cpf;
  });

  if (conta) {
    return res.status(409).json({ messagem: "CPF já cadastrado!"});
  }

let idContas = 1;

  const novaConta = {
    id: idContas++,
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
  return res.status(201).json({ messagem: "Conta criada com sucesso.", conta: novaConta });
};

const atualizarUsuarioConta = (req, res) => {
  const { id } = req.params;
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;


  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(412).json({ error: "Por Favor, preencha todas as informações"});
  }

  const conta = contas.find((conta) => {
    return conta.id === Number(id);
  });

  if (!conta) {
    return res.status(404).json({ error: "Conta não encontrada"});
  }

  const contaAtualizada = {

    usuario: {
        nome,
        cpf,
        telefone,
        email,
        senha,
    },
  };
  return res.status(203).send({ messagem: "Atualizada com sucesso", conta: contaAtualizada});
};


const excluirConta = (req, res) => { 
  const {id} = req.params;

  const conta = contas.find((conta) => { 
    return conta.id === Number(id);
  });

  if (!conta) {
    return res.status(404).json({ error: "Conta não encontrada"});
  }

  contas = contas.filter((conta) => { 
    return conta.id ==! Number(id);
  });

  return res.status(204).send();
};

module.exports = {
  listarContas,
  criarConta,
  atualizarUsuarioConta,
  excluirConta
};
