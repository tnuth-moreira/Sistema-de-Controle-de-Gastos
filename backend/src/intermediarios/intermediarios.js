const { banco, contas, depositos, saques, transferencias } = require('../bancodedados')

const senhaBanco = (req, res, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.send({ erro: "Informe a senha" });
    }

    if (senha_banco !== banco.senha) {
        return res.send({ erro: "Acesso Negado. Digite a senha incorreta" });
    }
    next();
}

const senhaSaldo = (req, res, next) => {
    const { numero_conta, senha } = req.query;
    
    const contaEncontrada = contas.find((conta) => {
        return conta.id === Number(numero_conta);
    });

    if (!contaEncontrada) {
        return res.status(404).json({ erro: "Conta não encontrada" });
    }
    
    if (senha !== contaEncontrada.usuario.senha) {   
        return res.status(401).json({ erro: "Acesso Negado. Digite a senha correta" });
    }
    
    req.contaEncontrada = contaEncontrada;

    next();
};


const senhaExtrato = (req, res, next) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ erro: "Por Favor, preencha todas as informações" });
    }

    const contaEncontrada = contas.find((conta) => {
        return conta.id === Number(numero_conta);
    });

    if (!contaEncontrada) {
        return res.status(404).json({ erro: 'Conta não encontrada' });
    }

    if (senha !== contaEncontrada.usuario.senha) {
        return res.status(401).json({ erro: 'Acesso Negado. Digite a senha correta' });
    }

    const depositosConta = depositos.filter((deposito) => {
        return deposito.conta === numero_conta;
    });
    
    const saquesConta = saques.filter((saque) => {
        return saque.conta === numero_conta;
    });
    
    const transferenciasEnviadas = transferencias.filter((transferencia) => {
        return transferencia.origem === numero_conta;
    });
    
    const transferenciasRecebidas = transferencias.filter((transferencia) => {
        return transferencia.destino === numero_conta;
    });
    
    let extratoConta = {
        depositos: depositosConta,
        saques: saquesConta,
        transferenciasEnviadas: transferenciasEnviadas,
        transferenciasRecebidas: transferenciasRecebidas,
    };
    
    req.extratoConta = extratoConta;

    next();
};


module.exports = {
    senhaBanco,
    senhaSaldo,
    senhaExtrato,
}


