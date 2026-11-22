function entrar() {

    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;

    if (emailVar == "" || senhaVar == "") {
        cardErro.classList.remove("sucesso");
        cardErro.style.display = "block";
        mensagem_erro.innerHTML = "Preencha todos os campos.";
        return false;
    }
    console.log("FORM LOGIN: ", emailVar);
    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar,
        }),
    })
    .then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then((json) => {

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;
                cardErro.style.display = "block";
                cardErro.classList.add("sucesso");
                mensagem_erro.innerHTML = "Login realizado com sucesso! Redirecionando...";
                setTimeout(function () {
                    window.location = "index.html";
                }, 2000);
            });
        } else {
            cardErro.style.display = "block";
            cardErro.classList.remove("sucesso");
            mensagem_erro.innerHTML = "E-mail ou senha incorretos.";

        }

    })
    .catch(function (erro) {
        console.log("#ERRO:", erro);
        cardErro.style.display = "block";
        cardErro.classList.remove("sucesso");
        mensagem_erro.innerHTML = "Não foi possível conectar ao servidor.";

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