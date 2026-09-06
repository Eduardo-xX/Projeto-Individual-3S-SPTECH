CREATE DATABASE individual3sptech;
USE individual3sptech;

CREATE TABLE evento (
	id int PRIMARY KEY AUTO_INCREMENT,
    caminhoImagem VARCHAR(255),
    nome VARCHAR(80) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    categoria VARCHAR(45) NOT NULL,
    dataInicio DATE NOT NULL,
    dataFim DATE NOT NULL
);

SELECT * FROM evento;