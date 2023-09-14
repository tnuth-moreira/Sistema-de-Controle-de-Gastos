let { contas, depositos, banco } = require("../bancodedados");



const listarContas = (req, res) => {
  const { senha_banco } = req.query;

  if (senha_banco !== banco.senha) {
    return res.status(403).json({ erro: "Acesso Negado.Digite a senha novamente." });
  }

  return res.json(contas);
};

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(412).json({ erro: "Por Favor, preencha todas as informações" });
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
    return res.status(412).json({ erro: "Por Favor, preencha todas as informações"});
  }

  const conta = contas.find((conta) => {
    return conta.id === Number(id);
  });

  if (!conta) {
    return res.status(404).json({ erro: "Conta não encontrada"});
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
  return res.status(203).send({ messagem: "Atualizada com sucesso", conta: contaAtualizada.usuario});
};


const excluirConta = (req, res) => { 
  const {id} = req.params;

  const conta = contas.find((conta) => { 
    return conta.id === Number(id);
  });

  if (!conta) {
    return res.status(404).json({ erro: "Conta não encontrada"});
  }

  contas = contas.filter((conta) => { 
    return conta.id ==! Number(id);
  });

  return res.status(204).send();
};

/*
Verificar se a conta bancária informada existe
Não permitir depósitos com valores negativos ou zerados
Somar o valor de depósito ao saldo da conta encontrada*/

const deposito = (req, res) => { 
   const {numero_conta, valor} = req.body;

   if (!numero_conta || !valor) {
    return res.status(412).json({ erro: "Por Favor, preencha todas as informações"});
  }

  if(valor < 1 ) { 
    return res.status(412).json({ erro: "O valor informado não é aceito"});
  }
  

   const conta = contas.find((conta) => { 
    return conta.id == numero_conta;
   
  });

  if (!conta) {
    return res.status(404).json({ erro:"Conta não encontrada"});
  }


  conta.saldo += Number(valor); 

  depositos.push({
    conta: numero_conta, 
    valor: valor,
  });

  return res.status(200).json({ message: "Deposito realizado com sucesso !", valorAtualizado: conta.saldo })

};
console.log(depositos);

module.exports = {
  listarContas,
  criarConta,
  atualizarUsuarioConta,
  excluirConta,
  deposito,
};
