# 🖤 Alma da Fiel

### Uma história que vive em cada torcedor.

O **Alma da Fiel** é uma plataforma interativa dedicada à história, cultura e identidade do Sport Club Corinthians Paulista. O projeto busca apresentar momentos marcantes da trajetória do clube de forma dinâmica, permitindo que os torcedores conheçam sua história e testem seus conhecimentos por meio de um quiz interativo.

Mais do que um quiz, a proposta é criar um espaço para valorizar a história, as conquistas e a identidade corinthiana.

## 🎯 Objetivo do projeto

Desenvolver uma plataforma web que una informação e interatividade, proporcionando aos torcedores uma experiência de aprendizado sobre a história do Corinthians, por meio de conteúdos históricos, desafios de conhecimento e acompanhamento de desempenho.

## ✨ Funcionalidades

- 🏠 **Página inicial:** apresentação do projeto e introdução à história do Corinthians.
- 📖 **Sobre:** apresentação da proposta e dos objetivos da plataforma.
- 📜 **História:** linha do tempo com acontecimentos marcantes da trajetória do clube.
- ⭐ **Ídolos:** conteúdo dedicado a grandes nomes da história corinthiana.
- 🏟️ **Gaviões da Fiel:** espaço dedicado à história e à cultura da torcida.
- 🧠 **Quiz interativo:** perguntas de múltipla escolha sobre a história do Corinthians.
- 🏆 **Pontuação:** cálculo de acertos e erros ao final de cada tentativa.
- 👤 **Cadastro e login:** criação de contas e autenticação dos usuários.
- 💾 **Armazenamento de resultados:** registro das tentativas no banco de dados, vinculadas aos respectivos usuários.
- 📊 **Dashboard:** visualização de informações e gráficos sobre os resultados armazenados no banco de dados.

## 🏟️ Conteúdo histórico

A plataforma aborda momentos marcantes da trajetória do Corinthians, incluindo:

- Fundação do clube, em 1910.
- Primeira conquista do Campeonato Paulista, em 1914.
- Invasão Corinthiana ao Maracanã, em 1976.
- Fim do jejum de títulos paulistas, em 1977.
- Democracia Corinthiana, na década de 1980.
- Primeiro Campeonato Brasileiro, em 1990.
- Conquista do Mundial de Clubes da FIFA, em 2000.
- Rebaixamento em 2007 e retorno à Série A em 2008.
- Conquista invicta da Libertadores, em 2012.
- Título do Mundial de Clubes da FIFA, em 2012.

## 🛠️ Tecnologias utilizadas

**Frontend**
- HTML5: estruturação das páginas.
- CSS3: estilização, identidade visual e responsividade.
- JavaScript: interatividade, lógica do quiz, validações e comunicação com o backend.
- Chart.js: criação de gráficos para apresentação dos resultados no dashboard.

**Backend**
- Node.js: ambiente de execução JavaScript no servidor.
- Express: estruturação do servidor e gerenciamento das rotas e requisições.

**Banco de dados**
- MySQL: armazenamento dos usuários e resultados das tentativas do quiz.

## 🔄 Funcionamento do sistema

A aplicação utiliza uma arquitetura que integra frontend, backend e banco de dados.

1. O usuário acessa a plataforma pelo navegador.
2. Pode realizar seu cadastro ou efetuar login.
3. Após a autenticação, pode participar do quiz.
4. Ao finalizar uma tentativa, o resultado é enviado ao backend por meio de uma requisição à API.
5. O backend processa as informações e registra os resultados no MySQL.
6. O dashboard consulta os dados armazenados e apresenta as informações por meio de gráficos.

## 🚀 Como executar o projeto

Para utilizar todas as funcionalidades do Alma da Fiel localmente, é necessário ter o Node.js e o MySQL instalados na máquina.

### 1. Pré-requisitos

Antes de começar, instale:

- [Node.js](https://nodejs.org/)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)
- [Git](https://git-scm.com/)

### 2. Clonar o repositório

Abra o terminal ou CMD e execute:

```bash
git clone https://github.com/matheusmenino/projeto-individual.git
```

Entre na pasta do projeto:

```bash
cd projeto-individual
```

### 3. Instalar as dependências

Na pasta que contém o arquivo `package.json`, execute:

```bash
npm install
```

Esse comando instala as dependências necessárias para o funcionamento do backend.

### 4. Configurar o banco de dados

Inicie o MySQL e acesse o servidor utilizando seu cliente de preferência, como o MySQL Workbench.

Crie o banco de dados utilizado pela aplicação:

```sql
CREATE DATABASE almadafiel;
```

Em seguida, execute o script SQL do projeto, caso disponibilizado no repositório, para criar as tabelas necessárias.

### 5. Configurar as variáveis de ambiente

O projeto utiliza variáveis de ambiente para configurar a conexão com o banco de dados e as informações do servidor.

Configure o arquivo `.env.dev` com os dados correspondentes ao seu ambiente local.

Não compartilhe senhas ou credenciais pessoais no GitHub.

### 6. Iniciar o servidor

Com as dependências instaladas, o MySQL funcionando e as variáveis de ambiente configuradas, inicie o servidor Node.js:

```bash
node app.js
```

Caso o projeto disponibilize um script de inicialização no `package.json`, também é possível utilizar o comando correspondente.

### 7. Acessar a aplicação

Após iniciar o servidor, abra o navegador e acesse:

```text
http://localhost:3333
```

A partir daí, será possível navegar pelas páginas, realizar cadastro, efetuar login, participar do quiz e visualizar o dashboard.

**Observação:** a porta acima corresponde à configuração local esperada. Caso seja diferente no seu arquivo de ambiente, utilize a porta configurada.

## 🎨 Identidade visual

A interface é inspirada na identidade do Corinthians, utilizando principalmente preto, branco e cinza, com detalhes em vermelho para destacar elementos importantes.

O design busca oferecer uma experiência intuitiva, organizada e responsiva, valorizando imagens e elementos visuais relacionados à história do clube.

## 📌 Status do projeto

**Projeto concluído!** 

Todas as funcionalidades propostas foram desenvolvidas e integradas, incluindo cadastro, login, quiz interativo, armazenamento dos resultados no MySQL e dashboard conectado ao banco de dados.

O projeto representa a aplicação prática dos conhecimentos adquiridos ao longo da formação acadêmica, envolvendo desenvolvimento frontend, backend, integração com APIs e modelagem de banco de dados.

## 🎓 Contexto acadêmico

Projeto individual desenvolvido como parte da formação em **Análise e Desenvolvimento de Sistemas na São Paulo Tech School (SPTech)**, com foco na aplicação prática dos conhecimentos adquiridos em desenvolvimento web, programação, integração de sistemas e banco de dados.

## 👨‍💻 Autor

**Matheus Souza**

Desenvolvido com 🖤🤍 e respeito à história do Corinthians.
