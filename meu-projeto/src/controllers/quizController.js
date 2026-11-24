var quizModel = require("../models/quizModel");

function salvarResultado(req, res){
  var fkUsuario = Number(req.body.fkUsuario)
  var acertos = Number(req.body.acertos)
  var erros = Number(req.body.erros)
  var totalPerguntas = Number(req.body.totalPerguntas)

  if (req.body.fkUsuario == undefined) {
    return res.status(400).send("Informe o usuário!");
  } else if (acertos < 0 || erros < 0) {
    return res.status(400).send("Acertos e erros inválidos!");
  } else if (totalPerguntas <= 0) {
    return res.status(400).send("Total de perguntas inválido!");
  } else if (acertos + erros != totalPerguntas) {
    return res.status(400).send("O resultado não corresponde ao total de perguntas!");
  }

  quizModel.salvarResultado(fkUsuario, acertos, erros, totalPerguntas)
  .then(function(resultado){
    return res.status(201).json(resultado);
  })
  .catch(function(erro){
    console.log("Erro ao salvar o resultado", erro)
    return res.status(500).send ("Erro ao salvar o resultado do quiz")
  })

}

function buscarResultados(req, res){
  var idUsuario = Number(req.params.idUsuario);

  if(idUsuario <= 0 || isNaN(idUsuario)){
    return res.status(400).send("ID do usuario inválido!!");
  }

  quizModel.buscarResultados(idUsuario)
  .then(function(resultados){
    res.json(resultados);
  })
  .catch(function(erro){
    console.log("Erro ao buscar resultados", erro)
    res.status(500).send("Erro ao buscar os resultados do quiz.")
  })
}

module.exports = {
  salvarResultado,
  buscarResultados
};
