const validarSenha = (request, response, next) => { 
const {senha} = request.query; 

if(!senha) { 
    return response.send('nenhuma conta encontrada');
}

if (senha !== '123') {
    return response.send("senha incorreta!");
}
next();
}

module.exports = {
    validarSenha
}; 