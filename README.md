# Projeto-Individual-3S-SPTECH
Projeto Individual do 3° Semestre de ADS na SPTECH.


### Test de POST
URL: http://localhost:8080/eventos
BODY: {
    "caminhoImagem": "conectadevs_logo.jpg",
    "nome": "Conecta Devs",
    "descricao": "Evento para Desenvolvedores de Software e correlatas.",
    "categoria": "TI",
    "dataInicio": "2026-09-29",
    "dataFim": "2026-09-29"
}

### Test de GET
URL: http://localhost:8080/eventos

## Criação de Usuário


1. Abrir o cmd na pasta correta `"C:Program Files\MySQL\MySQL Server 8.0\bin"`
2. Executar o comando `"mysql -u root -p"`
3. Colocar a senha
4. Executar o comando `"CREATE USER 'eventos'@'%' IDENTIFIED BY 'Senha#1234';"`
5. Executar o comando `"GRANT ALL PRIVILEGES ON individual3sptech.* TO 'eventos'@'%';`
6. Executar o comando `"FLUSH PRIVILEGES;`