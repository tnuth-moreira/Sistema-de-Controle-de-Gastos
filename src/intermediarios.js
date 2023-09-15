const { banco, contas } = require('./bancodedados')

const senhaBanco = (req, res, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.send({ erro: "Informe a senha" });
    }

    if (senha_banco !== banco.senha) {
        return res.send({ erro: "Acesso Negado. Digite a senha correta" });
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

module.exports = {
    senhaBanco,
    senhaSaldo,
}


