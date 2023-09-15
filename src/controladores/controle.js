let { contas, depositos, saques, transferencias} = require("../bancodedados");


const listarContas = (req, res) => {
  return res.status(200).json(contas);
};

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(412).json({ erro: "Por Favor, preencha todas as informações" });
  }

  const validacaoCpf = contas.find((validarCpf) => {
    return validarCpf.usuario.cpf === cpf;
  });

  if (validacaoCpf) 
    return res.status(409).json({ mensagem: "CPF já cadastrado!"});

  if (cpf.length !== 11) 
    return res.status(412).json({ erro: "CPF inválido" });

  const validacaoTelefone = contas.find((validarTelefone) => {
    return validarTelefone.usuario.telefone === telefone;
  });

  if (validacaoTelefone) 
    return res.status(409).json({ mensagem: "Número de telefone já cadastrado!" });

  if (telefone.length !== 11) 
    return res.status(412).json({ erro: "Número de telefone inválido ou digite o DDD" });

  const validacaoEmail = contas.find((validarEmail) => {
    return validarEmail.usuario.email === email;
  });

  if (validacaoEmail)
    return res.status(409).json({ mensagem: "Email já cadastrado!" });

  if (email.indexOf('@') < 0 || email.indexOf('.') === 0 || email.indexOf('.') < 0) 
    return res.status(409).json({ mensagem: "Email inválido" });

  const validacaoDataNascimento = /^\d{4}-\d{2}-\d{2}$/;
  if (!data_nascimento.match(validacaoDataNascimento)) {
    return res.status(412).json({ erro: "Data de nascimento inválida. Use o formato 'AAAA-MM-DD'"});
  }

  let idContas = 1;

  const novaConta = {
    id: idContas++,
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  };

  contas.push(novaConta);
  return res.status(201).json({ mensagem: "Conta criada com sucesso.", conta: novaConta });
};

const atualizarUsuarioConta = (req, res) => {
  const { id } = req.params;
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  const contaEncontrada = contas.find((conta) => {
    return conta.id === Number(id);
  });

  if (!contaEncontrada) {
    return res.status(404).json({ erro: "Conta não encontrada"});
  }

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(412).json({ erro: "Por Favor, preencha todas as informações"});
  }
  contaEncontrada.usuario = {
    nome,
    cpf,
    telefone,
    email,
    senha,
}

  const validacaoCpf  = contas.find((validarCpf) => {
    return validarCpf.usuario.cpf === cpf;
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
    email.indexOf('.') < 0 ) {
     return res.status(409).json({ mensagem: "Email inválido"}) 
    };

  return res.status(203).send({ menssagem: "Atualizada com sucesso", conta: contaEncontrada.usuario});
};


const excluirConta = (req, res) => {
  const { id } = req.params;

  const contaEncontrada = contas.find((conta) => {
    return conta.id === Number(id);
  });

  if (!contaEncontrada) {
    return res.status(404).json({ erro: "Conta não encontrada" });
  }

  const contaExcluida = contas.indexOf(contaEncontrada);

  if (contaExcluida !== -1) {
    contas.splice(contaExcluida, 1);
  }

  depositos = depositos.filter((deposito) => deposito.conta !== id);
  saques = saques.filter((saque) => saque.conta !== id);
  transferencias = transferencias.filter(
    (transferencia) => transferencia.origem !== id && transferencia.destino !== id
  );

  return res.status(204).send();
};


const deposito = (req, res) => { 
   const {numero_conta, valor} = req.body;

   if (!numero_conta) {
    return res.status(412).json({ erro: "Por Favor, preencha todas as informações"});
  }

  if(valor <= 0 ) { 
    return res.status(412).json({ erro: "O valor informado não é aceito"});
  }
  
   const contaEncontrada = contas.find((conta) => { 
    return conta.id == numero_conta;
  });

  if (!contaEncontrada) {
    return res.status(404).json({ erro:"Conta não encontrada"});
  }

  contaEncontrada.saldo += Number(valor); 

  const dataAtual = new Date();
  let ano = dataAtual.getFullYear();
  let mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  let dia = String(dataAtual.getDate()).padStart(2, '0');
  let hora = String(dataAtual.getHours()).padStart(2, '0');
  let minuto = String(dataAtual.getMinutes()).padStart(2, '0');
  let segundo = String(dataAtual.getSeconds()).padStart(2, '0');
  const dataFormatada = `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;

  depositos.push({
    data: dataFormatada,
    conta: numero_conta, 
    valor: valor,
  });
  let deposito = depositos[depositos.length - 1]; 

  return res.status(200).json({ menssagem: "Deposito realizado com sucesso !", Deposito: deposito})

};


const saque = (req, res) => { 
  const { numero_conta, valor, senha } = req.body;

  if (!numero_conta || !valor) {
    return res.status(412).json({ erro: "Por favor, preencha todas as informações" });
  }

  if (!senha) {
    return res.status(400).json({ erro: "Digite a senha" });
  }

  const contaEncontrada = contas.find((conta) => {
    return conta.id === Number(numero_conta)
  });

  if (!contaEncontrada) {
    return res.status(404).json({ erro: "Conta não encontrada" });
  }


  if (contaEncontrada.usuario.senha !== senha) {
    return res.status(401).json({ erro: "Senha incorreta" });
  }

 
  if (contaEncontrada.saldo < valor) {
    return res.status(400).json({ erro: "Saldo insuficiente" });
  }

  contaEncontrada.saldo -= Number(valor);

  const dataAtual = new Date();
  let ano = dataAtual.getFullYear();
  let mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  let dia = String(dataAtual.getDate()).padStart(2, '0');
  let hora = String(dataAtual.getHours()).padStart(2, '0');
  let minuto = String(dataAtual.getMinutes()).padStart(2, '0');
  let segundo = String(dataAtual.getSeconds()).padStart(2, '0');
  const dataFormatada = `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;

  saques.push({
    data: dataFormatada,
    conta: numero_conta,
    valor: valor,
  });

  let saqueRealizado = saques[saques.length - 1];

  return res.status(200).json({ mensagem: "Saque realizado com sucesso!", Saque: saqueRealizado });
};



const transferencia = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
    return res.status(412).json({ erro: "Por favor, preencha todas as informações" });
  }

  if (!senha) {
    return res.status(400).json({ erro: "Digite a senha" });
  }

  const contaOrigem = contas.find((conta) => { 
    return conta.id === Number(numero_conta_origem)
});

  if (!contaOrigem) {
    return res.status(404).json({ erro: "Conta de origem não encontrada" });
  }

  const contaDestino = contas.find((conta) => {
    return conta.id === Number(numero_conta_destino)
}); 

  if (!contaDestino) {
    return res.status(404).json({ erro: "Conta de destino não encontrada" });
  }

  if (contaOrigem.usuario.senha !== senha) {
    return res.status(401).json({ erro: "Senha incorreta" });
  }


  if (contaOrigem.saldo < valor) {
    return res.status(400).json({ erro: "Saldo insuficiente" });
  }


  contaOrigem.saldo -= valor;
  contaDestino.saldo += valor;

  const dataAtual = new Date();
  let ano = dataAtual.getFullYear();
  let mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
  let dia = String(dataAtual.getDate()).padStart(2, '0');
  let hora = String(dataAtual.getHours()).padStart(2, '0');
  let minuto = String(dataAtual.getMinutes()).padStart(2, '0');
  let segundo = String(dataAtual.getSeconds()).padStart(2, '0');
  const dataFormatada = `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;

  transferencias.push({
    data: dataFormatada,
    origem: numero_conta_origem,
    destino: numero_conta_destino,
    valor: valor,
  });

  let transferenciaRealizada = transferencias[transferencias.length - 1];

  return res.status(200).json({ mensagem: "Transferência realizada com sucesso!", Transferencia: transferenciaRealizada });
};

const saldo = (req, res) => {
  const { contaEncontrada } = req;

  return res.status(200).json({ saldo: contaEncontrada.saldo });
};

const extrato = (req, res) => {
  const { extratoConta } = req;

  return res.status(200).json(extratoConta);
};


module.exports = {
  listarContas,
  criarConta,
  atualizarUsuarioConta,
  excluirConta,
  deposito,
  saque,
  transferencia,
  saldo,
  extrato
};
