const listaDeQuestoes = [
  {
    pergunta: "Qual o mascote do Corinthians?",
    alternativaA: "Gavião",
    alternativaB: "Operário",
    alternativaC: "Mosqueteiro",
    alternativaD: "São Jorge",
    alternativaCorreta: "alternativaC",
  },

  {
    pergunta: "Qual jogador marcou o gol do titulo do Mundial de 2012?",
    alternativaA: "Emerson Sheik",
    alternativaB: "Danilo",
    alternativaC: "Paulinho",
    alternativaD: "Paolo Guerrero",
    alternativaCorreta: "alternativaD",
  },

  {
    pergunta: "Qual é o nome do estádio do Corinthians?",
    alternativaA: "Neo Química Arena",
    alternativaB: "Estádio do Pacaembu",
    alternativaC: "Itaquerão",
    alternativaD: "Morumbi",
    alternativaCorreta: "alternativaA",
  },
  {
    pergunta: "Qual é o principal ríval do Corinthians?",
    alternativaA: "Flamengo",
    alternativaB: "São Paulo",
    alternativaC: "Porco",
    alternativaD: "Santos",
    alternativaCorreta: "alternativaC",
  },
  {
    pergunta: "Quem é o maior artilheiro do estádio do Corinthians?",
    alternativaA: "Angel Romero",
    alternativaB: "Vagner Love",
    alternativaC: "Roger Guedes",
    alternativaD: "Yuri Alberto",
    alternativaCorreta: "alternativaD",
  },
  {
    pergunta: "Quem é conhecido na história Alvinegra como `Pé de Anjo` ",
    alternativaA: "Neto",
    alternativaB: "Jadson",
    alternativaC: "Marcelinho Carioca",
    alternativaD: "Rivelino",
    alternativaCorreta: "alternativaC",
  },
  {
    pergunta: "Quem é o maior artilheiro da história do Corinthians?",
    alternativaA: "Baltazar",
    alternativaB: "Teleco",
    alternativaC: "Cláudio de Pinho",
    alternativaD: "Marcelinho Carioca",
    alternativaCorreta: "alternativaC",
  },
  {
    pergunta:
      "Contra qual equipe o Corinthians conquistou seu primeiro título do Campeonato Brasileiro em 1990?",
    alternativaA: "Porco",
    alternativaB: "Santos",
    alternativaC: "Cruzeiro",
    alternativaD: "São Paulo",
    alternativaCorreta: "alternativaD",
  },
  {
    pergunta:
      "Quem é o goleiro que mais vezes vestiu a camisa do Corinthians na história?",
    alternativaA: "Ronaldo Giovanelli",
    alternativaB: "Cássio",
    alternativaC: "Gilmar dos Santos Neves",
    alternativaD: "Dida",
    alternativaCorreta: "alternativaB",
  },
  {
    pergunta:
      "Contra qual adversário o Corinthians disputou a final na conquista do seu primeiro Mundial de Clubes da FIFA, no ano de 2000?",
    alternativaA: "Real Madrid",
    alternativaB: "Boca Juniors",
    alternativaC: "Vasco da Gama",
    alternativaD: "Manchester United",
    alternativaCorreta: "alternativaC",
  },
];

// variáveis globais
let respostaEnviada = false;
let numeroDaQuestaoAtual = 0;
let pontuacaoFinal = 0;
let tentativaIncorreta = 0;
let certas = 0;
let erradas = 0;
let quantidadeDeQuestoes = listaDeQuestoes.length;

function preencherHTMLcomQuestaoAtual(index) {
  habilitarAlternativas(true);
  const questaoAtual = listaDeQuestoes[index];
  numeroDaQuestaoAtual = index;
  console.log("questaoAtual");
  console.log(questaoAtual);
  document.getElementById("spanNumeroDaQuestaoAtual").innerHTML =
    Number(index) + 1; // ajustando porque o index começa em 0
  document.getElementById("spanQuestaoExibida").innerHTML =
    questaoAtual.pergunta;
  document.getElementById("labelOpcaoUm").innerHTML = questaoAtual.alternativaA;
  document.getElementById("labelOpcaoDois").innerHTML =
    questaoAtual.alternativaB;
  document.getElementById("labelOpcaoTres").innerHTML =
    questaoAtual.alternativaC;
  document.getElementById("labelOpcaoQuatro").innerHTML =
    questaoAtual.alternativaD;
}

function submeter() {
  if (respostaEnviada === true) {
    return;
  }
  const options = document.getElementsByName("option"); // recupera alternativas no html

  let respostaSelecionada = null;

  let i = 0;

  while (i < options.length) {
    if (options[i].checked) {
      respostaSelecionada = options[i];
      break;
    }
    i++;
  }

  if (respostaSelecionada === null) {
    alert("Não há alternativas escolhidas. Escolha uma opção.");
    return;
  }

  habilitarAlternativas(false);
  checarResposta();

  respostaEnviada = true;
  document.getElementById("btnAvancar").innerHTML = "Próxima questão";
}

function habilitarAlternativas(trueOrFalse) {
  let opcaoEscolhida = trueOrFalse ? false : true;

  primeiraOpcao.disabled = opcaoEscolhida;
  segundaOpcao.disabled = opcaoEscolhida;
  terceiraOpcao.disabled = opcaoEscolhida;
  quartaOpcao.disabled = opcaoEscolhida;
}

function avancar() {
  if (respostaEnviada === false) {
    submeter();
    return;
  }

  if (numeroDaQuestaoAtual < quantidadeDeQuestoes - 1) {
    numeroDaQuestaoAtual++;

    limparCoresBackgroundOpcoes();
    desmarcarRadioButtons();

    respostaEnviada = false;

    preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual);

    document.getElementById("btnAvancar").innerHTML = "Responder";
  } else {
    var idUsuario = sessionStorage.ID_USUARIO;

    if (idUsuario == undefined) {
      alert("Faça login para salvar seu resultado.");
      window.location.href = "login.html";
      return;
    }

    fetch("/quiz/salvarResultado", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fkUsuario: idUsuario,
        acertos: pontuacaoFinal,
        erros: erradas,
        totalPerguntas: quantidadeDeQuestoes,
      }),
    })
      .then(function (resposta) {
        if (resposta.ok) {
          sessionStorage.setItem("pontuacaoFinal", pontuacaoFinal);
          sessionStorage.setItem("quantidadeDeQuestoes", quantidadeDeQuestoes);
          window.location.href = "resultado.html";
        } else {
          alert("Não foi possível salvar o resultado.");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        alert("Erro ao conectar com o servidor");
      });
  }
}

function checarResposta() {
  const questaoAtual = listaDeQuestoes[numeroDaQuestaoAtual]; // questão atual
  const respostaQuestaoAtual = questaoAtual.alternativaCorreta; // qual é a resposta correta da questão atual

  const options = document.getElementsByName("option"); // recupera alternativas no html

  let alternativaCorreta = null; // variável para armazenar a alternativa correta

  options.forEach((option) => {
    if (option.value === respostaQuestaoAtual) {
      alternativaCorreta = document.querySelector(
        `label[for="${option.id}"]`,
      ).id;
    }
  });

  // verifica se resposta assinalada é correta
  options.forEach((option) => {
    if (option.checked === true && option.value === respostaQuestaoAtual) {
      document
        .getElementById(alternativaCorreta)
        .classList.add("text-success-with-bg");
      pontuacaoFinal++;
      certas++;
      // document.getElementById("spanCertas").innerHTML = certas;
    } else if (option.checked && option.value !== respostaQuestaoAtual) {
      const wrongLabelId = option.labels[0].id;

      document
        .getElementById(wrongLabelId)
        .classList.add("text-danger-with-bg");
      document
        .getElementById(alternativaCorreta)
        .classList.add("text-success-with-bg");
      tentativaIncorreta++;
      erradas++;
    }
  });
}

function limparCoresBackgroundOpcoes() {
  const options = document.getElementsByName("option");
  options.forEach((option) => {
    document
      .getElementById(option.labels[0].id)
      .classList.remove("text-danger-with-bg");
    document
      .getElementById(option.labels[0].id)
      .classList.remove("text-success-with-bg");
  });
}

function desmarcarRadioButtons() {
  const options = document.getElementsByName("option");
  for (let i = 0; i < options.length; i++) {
    options[i].checked = false;
  }
}

function finalizarJogo() {
  let textoParaMensagemFinal = null;
  let classComCoresParaMensagemFinal = null;
  const porcentagemFinalDeAcertos = pontuacaoFinal / quantidadeDeQuestoes;

  if (porcentagemFinalDeAcertos <= 0.3) {
    textoParaMensagemFinal = "Parece que você não estudou...";
    classComCoresParaMensagemFinal = "text-danger-with-bg";
  } else if (
    porcentagemFinalDeAcertos > 0.3 &&
    porcentagemFinalDeAcertos < 0.9
  ) {
    textoParaMensagemFinal = "Pode melhorar na próxima, hein!";
    classComCoresParaMensagemFinal = "text-warning-with-bg";
  } else if (porcentagemFinalDeAcertos >= 0.9) {
    textoParaMensagemFinal = "Uau, parabéns!";
    classComCoresParaMensagemFinal = "text-success-with-bg";
  }

  textoParaMensagemFinal +=
    "<br> Você acertou " +
    Math.round(porcentagemFinalDeAcertos * 100) +
    "% das questões.";

  document.getElementById("msgFinal").innerHTML = textoParaMensagemFinal;
  document
    .getElementById("msgFinal")
    .classList.add(classComCoresParaMensagemFinal);
  document.getElementById("spanPontuacaoFinal").innerHTML = pontuacaoFinal;

  document.getElementById("jogo").classList.add("text-new-gray");

  btnProx.disabled = true;
  btnSubmeter.disabled = true;
  btnTentarNovamente.disabled = false;
}
preencherHTMLcomQuestaoAtual(0);
