const { json } = require("express");
var usuarioModel = require("../models/usuarioModel");
const { bus } = require("nodemon/lib/utils");
// var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Informe seu email!");
  } else if (senha == undefined) {
    res.status(400).send("Informe sua senha!");
  } else {
    usuarioModel
      .autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length == 1) {
           return res.json({
                id: resultadoAutenticar[0].id,
                nome: resultadoAutenticar[0].nome,
                email: resultadoAutenticar[0].email,
            });
        };
        return res.status(401).send("Email e/ou senha inválidos.");
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage,
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  // var fkEmpresa = req.body.idEmpresaVincularServer;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send("Informe seu nome!");
  } else if (email == undefined) {
    res.status(400).send("Informe seu email!");
  } else if (senha == undefined) {
    res.status(400).send("Informe sua senha!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrar(nome, email, senha)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage,
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

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

  usuarioModel.salvarResultado(fkUsuario, acertos, erros, totalPerguntas)
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

  usuarioModel.buscarResultados(idUsuario)
  .then(function(resultados){
    res.json(resultados);
  })
  .catch(function(erro){
    console.log("Erro ao buscar resultados", erro)
    res.status(500).send("Erro ao buscar os resultados do quiz.")
  })
}

module.exports = {
  autenticar,
  cadastrar,
  salvarResultado,
  buscarResultados
};
