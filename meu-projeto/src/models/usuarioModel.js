var database = require("../database/config");

function autenticar(email, senha) {
  var instrucaoSql = `
        SELECT usuario.id, usuario.nome, credenciais.email
        FROM usuario
        JOIN credenciais
        ON usuario.id = credenciais.fkUsuario
        WHERE credenciais.email = ?
        AND credenciais.senha = ?;
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  return database.executar(instrucaoSql, [email, senha]);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
  var consultas = [
    {
      instrucao: `
                INSERT INTO usuario (nome)
                VALUES (?);
            `,
      valores: [nome],
    },
    {
      instrucao: `
                INSERT INTO credenciais (fkUsuario, email, senha)
                VALUES (LAST_INSERT_ID(), ?, ?);
            `,
      valores: [email, senha],
    },
  ];

  return database.executarTransacao(consultas);
}

function salvarResultado(fkUsuario, acertos, erros, totalPerguntas) {
  var instrucaoSql = `
    INSERT INTO resultadoQuiz (fkUsuario, acertos, erros, totalPerguntas) VALUES (?, ?, ?, ?);
    `;
  console.log("Executando a instrucao SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql, [
    fkUsuario,
    acertos,
    erros,
    totalPerguntas,
  ]);
}

function buscarResultados(idUsuario) {
  var instrucaoSql = `
    SELECT idResultado, acertos, erros, totalPerguntas, dataTentativa
    FROM resultadoQuiz
    WHERE fkUsuario = ?
    ORDER BY dataTentativa ASC;`;
  return database.executar(instrucaoSql, [idUsuario]);
}

module.exports = {
  autenticar,
  cadastrar,
  salvarResultado,
  buscarResultados,
};
