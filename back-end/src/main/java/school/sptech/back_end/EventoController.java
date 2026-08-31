package school.sptech.back_end;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;

import javax.swing.plaf.nimbus.State;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalDate;
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
    @PostMapping
    public ResponseEntity<Evento> create(
            @RequestBody Evento evento
    ) throws IOException {
//        String nomeArquivo = UUID.randomUUID() + "_" + evento.getImagem().getOriginalFilename();
//
//        Path caminho = Paths.get("images/" + nomeArquivo);
//
//        Files.createDirectories(caminho.getParent());
//
//        Files.write(caminho, evento.getImagem().getBytes());

//
        System.out.println(evento.toString());

        String sql = "INSERT INTO evento (caminhoImagem, nome, descricao, categoria, dataInicio, dataFim) VALUES (?, ?, ?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        this.jdbcTemplate.update(
                con -> {
                    PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

                    ps.setString(1, "conectadevs_logo.jpg");
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
}
