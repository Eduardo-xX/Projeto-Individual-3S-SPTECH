# Projeto-Individual-3S-SPTECH
Projeto Individual do 3° Semestre de ADS na SPTECH.

---

## Iniciar Front-end e Back-end

**Front-end**:   
1. Entre no diretório "front-end" no cmd
2. Execute o Comando "npm i"
3. Execute o Comando "npm run dev"

**Back-end**:
1. Entre no diretório "back-end" no cmd
2. Execute o Comando "mvn spring-boot:run"

---

## Teste de Endpoints

### Teste de GET
**URL**: http://localhost:8080/eventos  
**Method**: GET  
**Retorno**:   
**Status**: 200  
`  

    [  
        {  
            "id": 1,  
            "caminhoImagem": "anime-friends.png",  
            "nome": "Anime Friends",  
            "descricao": "Evento de Animes que acontece na Paulista.",  
            "categoria": "Anime",  
            "dataInicio": "2026-10-22T03:00:00.000Z",  
            "dataFim": "2026-10-30T03:00:00.000Z",  
            "imagem": null  
        },  
        {  
            "id": 3,  
            "caminhoImagem": "dcf20951-eb94-4c20-a47d-5241f2d4ffaf_bienal.jpg",  
            "nome": "Conecta Devs",  
            "descricao": "Evento para Desenvolvedores de Software e correlatas.",  
            "categoria": "TI",  
            "dataInicio": "2026-09-29T03:00:00.000Z",  
            "dataFim": "2026-09-29T03:00:00.000Z",  
            "imagem": null  
        }  
    ]  
`

---

### Teste de POST
**URL**: http://localhost:8080/eventos  
**Method**: POST   
**BODY** - **form-data**:   
`

    "imagem": **Arquivo/Imagem**,  
    "nome": "Conecta Devs",  
    "descricao": "Evento para Desenvolvedores de Software e correlatas.",  
    "categoria": "TI",  
    "dataInicio": "2026-09-29",  
    "dataFim": "2026-09-29"    
`

**Retorno**:  
**Status**: 201  
`  

    {  
        "id": 3,  
        "caminhoImagem": "dcf20951-eb94-4c20-a47d-5241f2d4ffaf_bienal.jpg",  
        "nome": "Conecta Devs",  
        "descricao": "Evento para Desenvolvedores de Software e correlatas.",  
        "categoria": "TI",  
        "dataInicio": "2026-09-29T03:00:00.000Z",  
        "dataFim": "2026-09-29T03:00:00.000Z",  
        "imagem": null  
    }  
`

---

### Teste de PUT
**URL**: http://localhost:8080/eventos/1  
**Method**: PUT   
**BODY** - **form-data**:   
`

    "imagem": **Arquivo/Imagem**,  
    "nome": "Bienal",  
    "descricao": "Evento para encontrar Autores de Livros e conhecer pessoas que gostam de Livros, além de comprar livros.",  
    "categoria": "Livros",  
    "dataInicio": "2026-09-03",  
    "dataFim": "2026-09-13"  
`
**Retorno**:    
**Status**: 200  
`

    {  
        "id": 3,  
        "caminhoImagem": "11872d36-b20f-439d-afbd-34be357fdfa5_bienal.jpg",  
        "nome": "Bienal",  
        "descricao": "Evento para encontrar Autores de Livros e conhecer pessoas que gostam de Livros, além de comprar livros.",  
        "categoria": "Livros",  
        "dataInicio": "2026-09-03T03:00:00.000Z",  
        "dataFim": "2026-09-13T03:00:00.000Z",  
        "imagem": null  
    }  
`

---

### Teste de DELETE
**URL**: http://localhost:8080/eventos/1  
**Method**: DELETE  
**Retorno**:  
**Status**: 204  

---

## Script SQL - Criação do Banco e da Tabela
Também no caminho: backend/script.sql

`   

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

`


---

## Criação de Usuário no Banco de Dados...


1. Abrir o cmd na pasta correta `"C:Program Files\MySQL\MySQL Server 8.0\bin"`
2. Executar o comando `"mysql -u root -p"`
3. Colocar a senha
4. Executar o comando `"CREATE USER 'eventos'@'%' IDENTIFIED BY '{SENHA}';"` substituir {SENHA} por uma senha
5. Executar o comando `"GRANT ALL PRIVILEGES ON individual3sptech.* TO 'eventos'@'%';`
6. Executar o comando `"FLUSH PRIVILEGES;`