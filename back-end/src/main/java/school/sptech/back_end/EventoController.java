package school.sptech.back_end;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.plaf.nimbus.State;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/eventos")
public class EventoController {

    private final JdbcTemplate jdbcTemplate;

    public EventoController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

//    http://localhost:8080/eventos
//    Params: ()
    @GetMapping
    public ResponseEntity<List<Evento>> getAll() {
        String sql = "SELECT * FROM evento;";
        List<Evento> eventos = this.jdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<>(Evento.class)
        );

        return ResponseEntity.status(200).body(eventos);
    }

//    http://localhost:8080/eventos
//    Params: (Evento)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Evento> create(
            @RequestParam("nome")
            String nome,

            @RequestParam("categoria")
            String categoria,

            @RequestParam("descricao")
            String descricao,

            @RequestParam("dataInicio")
            @DateTimeFormat(pattern = "yyyy-MM-dd")
            Date dataInicio,

            @RequestParam("dataFim")
            @DateTimeFormat(pattern = "yyyy-MM-dd")
            Date dataFim,

            @RequestParam("imagem")
            MultipartFile imagem

    ) throws IOException {


        String nomeArquivo = UUID.randomUUID() + "_" + imagem.getOriginalFilename();

        Path caminho = Paths.get("images/" + nomeArquivo);

        Files.createDirectories(caminho.getParent());

        Files.write(caminho, imagem.getBytes());

        Evento evento = new Evento(null, nomeArquivo, nome, descricao, categoria, dataInicio, dataFim);

        System.out.println(evento.toString());

        String sql = "INSERT INTO evento (caminhoImagem, nome, descricao, categoria, dataInicio, dataFim) VALUES (?, ?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        this.jdbcTemplate.update(
                con -> {
                    PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

//                    ps.setString(1, "conectadevs_logo.jpg");
                    ps.setString(1, nomeArquivo);
                    ps.setString(2, evento.getNome());
                    ps.setString(3, evento.getDescricao());
                    ps.setString(4, evento.getCategoria());
                    ps.setDate(5, new java.sql.Date(evento.getDataInicio().getTime()));
                    ps.setDate(6, new java.sql.Date(evento.getDataFim().getTime()));

                    return ps;
                }, keyHolder
        );

        BigInteger idInserido = keyHolder.getKeyAs(BigInteger.class);
        evento.setId(idInserido);

        return ResponseEntity.status(201).body(evento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Evento> update(
            @PathVariable Integer id,

            @RequestParam(value = "nome", required = false)
            String nome,

            @RequestParam(value = "categoria", required = false)
            String categoria,

            @RequestParam(value = "descricao", required = false)
            String descricao,

            @RequestParam(value = "dataInicio", required = false)
            @DateTimeFormat(pattern = "yyyy-MM-dd")
            Date dataInicio,

            @RequestParam(value = "dataFim", required = false)
            @DateTimeFormat(pattern = "yyyy-MM-dd")
            Date dataFim,

            @RequestParam(value = "imagem", required = false)
            MultipartFile imagem
    ) throws IOException {
        String sqlSelect = "SELECT * FROM evento WHERE id = ?;";

        Evento eventoBanco;

        try {
            eventoBanco = this.jdbcTemplate.queryForObject(
                    sqlSelect,
                    new BeanPropertyRowMapper<>(Evento.class),
                    id
            );
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(404).build();
        }

        if (eventoBanco == null) {
            return ResponseEntity.status(404).build();
        }

        if (nome != null && !nome.isBlank()) {
            eventoBanco.setNome(nome);
        }
        if (categoria != null && !categoria.isBlank()) {
            eventoBanco.setCategoria(categoria);
        }
        if (descricao != null && !descricao.isBlank()) {
            eventoBanco.setDescricao(descricao);
        }
        if (dataInicio != null) {
            eventoBanco.setDataInicio(dataInicio);
        }
        if (dataFim != null) {
            eventoBanco.setDataFim(dataFim);
        }

        if (imagem != null && !imagem.isEmpty()) {

            String nomeArquivo = UUID.randomUUID() + "_" + imagem.getOriginalFilename();

            Path caminho = Paths.get("images/" + nomeArquivo);

            Files.createDirectories(caminho.getParent());

            Files.write(caminho, imagem.getBytes());

            eventoBanco.setCaminhoImagem(nomeArquivo);
        }

        String sql = "UPDATE evento SET caminhoImagem = ?, nome = ?, categoria = ?, descricao = ?, dataInicio = ?, dataFim = ? WHERE id = ?;";

        this.jdbcTemplate.update(
            sql,
            eventoBanco.getCaminhoImagem(),
            eventoBanco.getNome(),
            eventoBanco.getCategoria(),
            eventoBanco.getDescricao(),
            eventoBanco.getDataInicio(),
            eventoBanco.getDataFim(),
            id
        );

        return ResponseEntity.status(200).body(eventoBanco);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        String sql = "DELETE FROM evento WHERE id = ?;";

        this.jdbcTemplate.update(
                sql,
                id
        );

        return ResponseEntity.status(204).build();
    }
}
