var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined || email == "") {
    res.status(400).send("Informe seu email!");
  } else if (senha == undefined || senha == "") {
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
        console.log("Erro ao realizar o cadastro:", erro);

        if (erro.code == "ER_DUP_ENTRY") {
          console.log("ENTROU NA CONDIÇÃO DO EMAIL")
            return res.status(409).json({
                mensagem: "Este e-mail já está cadastrado. Utilize outro e-mail."
            });
        }

        return res.status(500).json({
            mensagem: "Ocorreu um erro interno ao realizar o cadastro."
        });
    });
  }
}

module.exports = {
  autenticar,
  cadastrar,
};
