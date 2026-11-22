// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var quizRouter = require("./src/routes/quiz")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/quiz", quizRouter)


app.listen(PORTA_APP, function () {
    console.log(`
    ==========================================
              ALMA DA FIEL
       Uma história que vive em cada torcedor.
    ==========================================

    Servidor iniciado com sucesso!

    Endereço: http://${HOST_APP}:${PORTA_APP}
    Ambiente: ${process.env.AMBIENTE_PROCESSO}

    ==========================================
    `);
});