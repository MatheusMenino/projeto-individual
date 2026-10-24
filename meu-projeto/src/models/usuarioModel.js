var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = ? AND senha = ?;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [email, senha]);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [nome, email,senha]);
}

function salvarResultado(fkUsuario, acertos, erros, totalPerguntas){
    var instrucaoSql = `
    INSERT INTO resultadoQuiz (fkUsuario, acertos, erros, totalPerguntas) VALUES (?, ?, ?, ?);
    `;
    console.log("Executando a instrucao SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [fkUsuario, acertos, erros, totalPerguntas]);
};

function buscarResultados(idUsuario){
    var instrucaoSql = `
    SELECT idResultado, acertos, erros, totalPerguntas, dataTentativa
    FROM resultadoQuiz
    WHERE fkUsuario = ?
    ORDER BY dataTentativa ASC;`;
    return database.executar(instrucaoSql, [idUsuario]);
};

module.exports = {
    autenticar,
    cadastrar,
    salvarResultado,
    buscarResultados
};