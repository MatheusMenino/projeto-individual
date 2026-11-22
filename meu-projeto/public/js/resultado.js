function carregarResultado() {
  const pontuacaoFinal = sessionStorage.getItem("pontuacaoFinal");
  const quantidadeDeQuestoes = sessionStorage.getItem(
    "quantidadeDeQuestoes"
  );

  const elementoPontuacao = document.getElementById("pontuacaoResultado");
  const elementoMensagem = document.getElementById("mensagemResultado");

  // Verifica se existe um resultado salvo
  if (pontuacaoFinal === null || quantidadeDeQuestoes === null) {
    elementoPontuacao.innerHTML = "Nenhum resultado encontrado";
    elementoMensagem.innerHTML =
      "Responda ao quiz para descobrir seu conhecimento sobre o Corinthians.";

    return;
  }

  let acertos = Number(pontuacaoFinal);
  let total = Number(quantidadeDeQuestoes);
  let porcentagem = (acertos / total) * 100;

  // Exibe a pontuação
  elementoPontuacao.innerHTML = `${acertos}/${total} ACERTOS`;

  // Define a mensagem conforme o desempenho
  if (porcentagem <= 30) {
    elementoMensagem.innerHTML =
      "Toda grande história começa com um primeiro passo! Ainda há muito para descobrir sobre o Corinthians. Continue explorando a trajetória do Timão e volte para testar seus conhecimentos!";
  } else if (porcentagem < 70) {
    elementoMensagem.innerHTML =
      "Você já conhece alguns capítulos importantes da história alvinegra! Mas a trajetória do Corinthians é repleta de momentos que merecem ser lembrados. Continue aprendendo, Fiel!";
  } else if (porcentagem < 100) {
    elementoMensagem.innerHTML =
      "Boa, Fiel! Você demonstrou conhecer muito bem a história do Timão. Está quase alcançando a pontuação máxima. Que tal mais uma tentativa?";
  } else {
    elementoMensagem.innerHTML =
      "Uma verdadeira aula de corinthianismo! Você mostrou conhecer cada detalhe deste clube que carrega uma história de luta, conquistas e paixão. Parabéns, Fiel!";
  }
}

function refazerQuiz() {
  sessionStorage.removeItem("pontuacaoFinal");
  sessionStorage.removeItem("quantidadeDeQuestoes");

  window.location.href = "quiz.html";
}

carregarResultado();
