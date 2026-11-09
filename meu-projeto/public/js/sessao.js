// sessão
function validarSessao() {
  var email = sessionStorage.EMAIL_USUARIO;
  var nome = sessionStorage.NOME_USUARIO;

  var b_usuario = document.getElementById("b_usuario");

  if (email != null && nome != null) {
    b_usuario.innerHTML = nome;
  } else {
    window.location = "../login.html";
  }
}

function limparSessao() {
  sessionStorage.clear();
  window.location = "login.html";
}

// carregamento (loading)
function aguardar() {
  var divAguardar = document.getElementById("div_aguardar");
  divAguardar.style.display = "flex";
}
function finalizarAguardar(texto) {
  var divAguardar = document.getElementById("div_aguardar");

  if (divAguardar != null) {
    divAguardar.style.display = "none";
  }

  var divErrosLogin = document.getElementById("div_erros_login");

  if (texto && divErrosLogin != null) {
    divErrosLogin.style.display = "flex";
    divErrosLogin.innerHTML = texto;
  }
}

//FUNÇÃO PARA MUDAR O MENU DE NAVEGAÇÃO CONFORME ESTIVER LOGADO NO SITE
function atualizarMenu() {
  let nomeUsuario = sessionStorage.NOME_USUARIO;
  let idUsuario = sessionStorage.ID_USUARIO;

  let botaoLogin = document.querySelector(".btn-login");
  let botaoCadastro = document.querySelector(".btn-cadastro");
  let areaUsuario = document.querySelector(".usuario-logado");

  if (idUsuario != undefined && nomeUsuario != undefined) {
    if (botaoLogin) botaoLogin.style.display = "none";
    if (botaoCadastro) botaoCadastro.style.display = "none";
    if (areaUsuario) {
      areaUsuario.style.display = "flex";
      let nome = areaUsuario.querySelector(".nome-usuario");

      if (nome) {
        nome.textContent = nomeUsuario;
      }
    }
  } else {
    if (botaoLogin) botaoLogin.style.display = "";
    if (botaoCadastro) botaoCadastro.style.display = "";
    if (areaUsuario) areaUsuario.style.display = "none";
  }

  let linksQuiz = document.querySelectorAll(".link-quiz");

  linksQuiz.forEach(function (link) {
    link.style.display = idUsuario != undefined ? "list-item" : "none";
  });

  let botaoDesafio = document.getElementById("btn-desafio");
  let linkDesafio = document.getElementById("link-desafio");

  if (botaoDesafio && linkDesafio) {
    if (idUsuario != undefined && nomeUsuario != undefined) {
      botaoDesafio.textContent = "Começar desafio →";
      linkDesafio.href = "quiz.html";
    } else {
      botaoDesafio.textContent = "Faça o login para começar →";
      linkDesafio.href = "login.html";
    }
  }
}
document.addEventListener("DOMContentLoaded", atualizarMenu);
