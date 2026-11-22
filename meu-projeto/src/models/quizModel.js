var database = require("../database/config");

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
  salvarResultado,
  buscarResultados,
};
