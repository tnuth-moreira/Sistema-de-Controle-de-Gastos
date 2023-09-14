let { contas, depositos, banco } = require("../bancodedados");


const listarContas = (req, res) => {
  return res.status(200).json(contas);
};

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(412).json({ erro: "Por Favor, preencha todas as informações" });
  }


const validacaoCpf  = contas.find((validarCpf) => {
   return validarCpf.usuario.cpf === Number(cpf);
});
if (validacaoCpf) 
  return res.status(409).json({ menssagem: "CPF já cadastrado!"})

if(cpf.length !== 11) 
return res.status(412).json({ erro: "CPF inválido"})

const validacaoEmail = contas.find((validarEmail) => {
  return validarEmail.usuario.email === email;
});

if (validacaoEmail)
  return res.status(409).json({ mensagem: "Email já cadastrado!"})

if(email.indexOf('@') < 0 ||
   email.indexOf('.') === 0 ||
   email.indexOf('.') < 0 ) 
    return res.status(409).json({ mensagem: "Email inválido"})


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
  return res.status(201).json({ menssagem: "Conta criada com sucesso.", conta: novaConta });
};

const atualizarUsuarioConta = (req, res) => {
  const { id } = req.params;
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;


  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(412).json({ erro: "Por Favor, preencha todas as informações"});
  }

  const validacaoCpf  = contas.find((validarCpf) => {
    return validarCpf.usuario.cpf === Number(cpf);
 });
 if (validacaoCpf) 
   return res.status(409).json({ menssagem: "CPF já cadastrado!"})
 
 if(cpf.length !== 11) 
 return res.status(412).json({ erro: "CPF inválido"})
 
 const validacaoEmail = contas.find((validarEmail) => {
   return validarEmail.usuario.email === email;
 });
 
 if (validacaoEmail)
   return res.status(409).json({ mensagem: "Email já cadastrado!"})
 
 if(email.indexOf('@') < 0 ||
    email.indexOf('.') === 0 ||
    email.indexOf('.') < 0 ) 
     return res.status(409).json({ mensagem: "Email inválido"})


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
  return res.status(203).send({ menssagem: "Atualizada com sucesso", conta: contaAtualizada.usuario});
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
  let deposito = depositos[depositos.length - 1]; 


  return res.status(200).json({ menssagem: "Deposito realizado com sucesso !", Deposito: deposito})

};


module.exports = {
  listarContas,
  criarConta,
  atualizarUsuarioConta,
  excluirConta,
  deposito,
};
