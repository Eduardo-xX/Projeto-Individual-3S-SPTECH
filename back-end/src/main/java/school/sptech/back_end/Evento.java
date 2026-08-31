package school.sptech.back_end;

import org.springframework.web.multipart.MultipartFile;

import java.math.BigInteger;
import java.util.Date;

public class Evento {

    private BigInteger id;
    private String caminhoImagem;
    private MultipartFile imagem;
    private String nome;
    private String descricao;
    private String categoria;
    private Date dataInicio;
    private Date dataFim;

    public Evento(BigInteger id, String caminhoImagem, String nome, String descricao, String categoria, Date dataInicio, Date dataFim) {
        this.id = id;
        this.caminhoImagem = caminhoImagem;
        this.nome = nome;
        this.descricao = descricao;
        this.categoria = categoria;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }

    public Evento() {
    }

    public BigInteger getId() {
        return id;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public String getCaminhoImagem() {
        return caminhoImagem;
    }

    public void setCaminhoImagem(String caminhoImagem) {
        this.caminhoImagem = caminhoImagem;
    }

    public MultipartFile getImagem() {
        return imagem;
    }

    public void setImagem(MultipartFile imagem) {
        this.imagem = imagem;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Date getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(Date dataInicio) {
        this.dataInicio = dataInicio;
    }

    public Date getDataFim() {
        return dataFim;
    }

    public void setDataFim(Date dataFim) {
        this.dataFim = dataFim;
    }
}
