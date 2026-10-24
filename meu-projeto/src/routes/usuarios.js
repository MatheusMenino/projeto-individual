var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/salvarResultado", function(req, res){
    usuarioController.salvarResultado(req, res);
});

router.get("/resultados/:idUsuario", function(req,res){
    usuarioController.buscarResultados(req, res)
}); // criando a rota para pegar (metodo get) as informações do usuario da session.storage

module.exports = router;