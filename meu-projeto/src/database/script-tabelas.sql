create database almadafiel;
use almadafiel;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    dataCadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE credenciais (
    fkUsuario INT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    FOREIGN KEY (fkUsuario)
        REFERENCES usuario(id)
);

CREATE TABLE resultadoQuiz (
    idResultado INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT NOT NULL,
    acertos INT NOT NULL,
    erros INT NOT NULL,
    totalPerguntas INT NOT NULL,
    dataTentativa DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fkResultadoUsuario
        FOREIGN KEY (fkUsuario)
        REFERENCES usuario(id)
);