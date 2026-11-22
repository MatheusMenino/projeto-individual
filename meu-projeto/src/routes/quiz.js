var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

//Recebendo os dados do html e direcionando para a funções salvar e buscar resultado de quizController.js
router.post("/salvarResultado", function(req, res){
    quizController.salvarResultado(req, res);
});

router.get("/buscarResultados/:idUsuario", function(req,res){
    quizController.buscarResultados(req, res)
}); // criando a rota para pegar (metodo get) as informações do usuario da session.storage

module.exports = router;