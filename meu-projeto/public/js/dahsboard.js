function carregarDashboard() {
    var idUsuario = sessionStorage.ID_USUARIO;

    if (idUsuario == undefined) {
      alert("Faça login para acessar sua dashboard.");
      return      
    }

    fetch("/quiz/buscarResultados/" + idUsuario)
    .then(function(resposta){
      if(!resposta.ok){
        throw new Error ("Erro ao buscar os resultados.");
      }
      return resposta.json();
    })
    .then(function(resultados){
      let totalAcertos = 0;
      let totalErros = 0;
      let totalPerguntas = 0;
      let labels = [];
      let acertos = [];
      let erros = [];

      for(let i = 0; i < resultados.length; i++){
        totalAcertos += Number(resultados[i].acertos);
        totalErros += Number(resultados[i].erros);
        totalPerguntas += Number(resultados[i].totalPerguntas);

        labels.push("Tentativa " + (i + 1));
        acertos.push(Number(resultados[i].acertos));
        erros.push(Number(resultados[i].erros))
      }
      document.getElementById("totalTentativas").innerHTML = resultados.length;
      document.getElementById("totalAcertos").innerHTML = totalAcertos;
      document.getElementById("totalErros").innerHTML = totalErros;
      
      let percentual = 0 
      if(totalPerguntas > 0){
        percentual = (totalAcertos / totalPerguntas) * 100;
      }
      document.getElementById("aproveitamento").innerHTML = percentual.toFixed(1).replace(".", ",") + "%";

      plotarGrafico(labels, acertos, erros);
    })
    .catch(function(erro){
      console.log(erro);
      alert("Não foi possível carregar os dados da dashboard.");
    });
  }

  function plotarGrafico(labels, acertos, erros) {
    const canvas = document.getElementById("graficoTentativas");
    console.log("iniciando plotagem do gráfico...");

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(canvas, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Acertos",
            data: acertos,
            borderColor: "#FF383C",
            backgroundColor: "transparent",
            borderWidth: 3,
            pointBackgroundColor: "#FF383C",
            pointBorderColor: "#FFFFFF",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointHitRadius: 10,
            tension: 0.3,
            fill: false
          },
          {
            label: "Erros",
            data: erros,
            borderColor: "#A7A7A7",  
            backgroundColor: "rgba(167, 167, 167, 0.05)",
            borderWidth: 2,
            pointBackgroundColor: "#A7A7A7",
            pointBorderColor: "#FFFFFF",
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 8,
            tension: 0.3,
            fill: false
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Quantidade de questões",
              color: "#A7A7A7"
            },
          },
          x: {
            title: {
              display: true,
              text: "Tentativas",
            },
          },
        },
      },
    });
  }
  carregarDashboard();