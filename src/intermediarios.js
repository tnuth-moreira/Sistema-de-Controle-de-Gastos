const { banco } = require('./bancodedados')

const senhaBanco = (req, res, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.send({ erro: "Informe a senha" });
    }

    if (senha_banco !== banco.senha) {
        return res.send({ erro: "Acesso Negado. Digite a senha novamente." });
    }
    next();
}

module.exports = {
    senhaBanco
}

