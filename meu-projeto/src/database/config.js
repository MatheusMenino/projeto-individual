var mysql = require("mysql2");

// CONEXÃO DO BANCO MYSQL SERVER
var mySqlConfig = {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

function executar(instrucao, valores = []) {
  if (
    process.env.AMBIENTE_PROCESSO !== "producao" &&
    process.env.AMBIENTE_PROCESSO !== "desenvolvimento"
  ) {
    console.log(
      "\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n",
    );
    return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
  }

  return new Promise(function (resolve, reject) {
    var conexao = mysql.createConnection(mySqlConfig);
    conexao.connect();
    conexao.query(instrucao, valores, function (erro, resultados) {
      conexao.end();
      if (erro) {
        return reject(erro);
      }
      console.log(resultados);
      return resolve(resultados);
    });
    conexao.on("error", function (erro) {
      return ("ERRO NO MySQL SERVER: ", erro.sqlMessage);
    });
  });
}

function executarTransacao(consultas) {
  if (
    process.env.AMBIENTE_PROCESSO !== "producao" &&
    process.env.AMBIENTE_PROCESSO !== "desenvolvimento"
  ) {
    return Promise.reject("AMBIENTE NÃO CONFIGURADO");
  }

  return new Promise(function (resolve, reject) {
    var conexao = mysql.createConnection(mySqlConfig);

    conexao.connect(function (erro) {
      if (erro) {
        return reject(erro);
      }

      conexao.beginTransaction(function (erro) {
        if (erro) {
          conexao.end();
          return reject(erro);
        }

        var resultados = [];

        function executarProxima(indice) {
          if (indice === consultas.length) {
            conexao.commit(function (erro) {
              if (erro) {
                conexao.rollback(function () {
                  conexao.end();
                  reject(erro);
                });
                return;
              }

              conexao.end();
              resolve(resultados);
            });

            return;
          }

          var consulta = consultas[indice];

          conexao.query(
            consulta.instrucao,
            consulta.valores,
            function (erro, resultado) {
              if (erro) {
                conexao.rollback(function () {
                  conexao.end();
                  reject(erro);
                });

                return;
              }

              resultados.push(resultado);

              executarProxima(indice + 1);
            },
          );
        }

        executarProxima(0);
      });
    });
  });
}

module.exports = {
  executar,
  executarTransacao
};