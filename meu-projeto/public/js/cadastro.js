function cadastrar() {
    var nomeVar = ipt_nome.value;
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;
    var confirmacaoSenhaVar = ipt_confirmar_senha.value;
    var temMaiuscula = false;
    var temMinuscula = false;

    // Verificando se há algum campo em branco
      if (  nomeVar == "" ||
            emailVar == "" ||
            senhaVar == "" ||
            confirmacaoSenhaVar == ""
        ) {
            cardErro.style.display = "block";
            mensagem_erro.innerHTML = "Preencha todos os campos.";
            return false;
        }
        if (senhaVar != confirmacaoSenhaVar) {
            cardErro.style.display = "block";
            mensagem_erro.innerHTML = "As senhas não coincidem.";
            return false;
        }


    if (senhaVar.length < 8) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML = "A senha precisa ter no mínimo 8 caracteres.";
    return false;
}

    for (var i = 0; i < senhaVar.length; i++) {
      if (senhaVar[i] >= "A" && senhaVar[i] <= "Z") {
          temMaiuscula = true;
      }
      if (senhaVar[i] >= "a" && senhaVar[i] <= "z") {
          temMinuscula = true;
      }
    }

if (temMaiuscula == false || temMinuscula == false) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML = "A senha precisa ter uma letra maiúscula e uma minúscula.";
    return false;
}
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
      }),
    })

    .then(function (resposta) {
      return resposta.json().then(function (dados) {
        if (resposta.ok) {
            cardErro.classList.add("sucesso");
            cardErro.style.display = "block";
            mensagem_erro.innerHTML =
                "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

            setTimeout(() => {
                window.location = "login.html";
            }, 3000);

        } else {
          console.log("STATUS:", resposta.status);
          console.log("DADOS RECEBIDOS:", dados);
          
            cardErro.classList.remove("sucesso");
            cardErro.style.display = "block";
            mensagem_erro.innerHTML = dados.mensagem;
            finalizarAguardar();
        }
    });
  })
    .catch(function (erro) {
      console.log("#ERRO:", erro);
      cardErro.style.display = "block";
      mensagem_erro.innerHTML = "Não foi possível se conectar ao servidor.";
      finalizarAguardar();
  });
    return false;
  }

  function sumirMensagem() {
    cardErro.style.display = "none";
  }

  function mostrarSenha() {

    if (ipt_senha.type == "password") {
        ipt_senha.type = "text";
        icone_olho.className = "fa-solid fa-eye-slash";
    } else {
        ipt_senha.type = "password";
        icone_olho.className = "fa-solid fa-eye";
    }
}

function mostrarConfirmacaoSenha() {

    var campo = document.getElementById("ipt_confirmar_senha");
    var icone = document.getElementById("icone_olho_confirmacao");

    if (campo.type == "password") {
        campo.type = "text";
        icone.className = "fa-solid fa-eye-slash";
    } else {
        campo.type = "password";
        icone.className = "fa-solid fa-eye";
    }
}