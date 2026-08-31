CREATE DATABASE individual3sptech;
USE individual3sptech;

CREATE TABLE evento (
	id int PRIMARY KEY AUTO_INCREMENT,
    caminhoImagem VARCHAR(45),
    nome VARCHAR(80) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    categoria VARCHAR(45) NOT NULL,
    dataInicio DATE NOT NULL,
    dataFim DATE NOT NULL
);

SELECT * FROM evento;

INSERT INTO evento (nome, caminhoImagem, descricao, categoria, dataInicio, dataFim) VALUES
	("Anime Friends", "anime-friends.png", "2 Evento de Animes que acontece na Paulista.", "Anime", "2026-10-22", "2026-10-30");
