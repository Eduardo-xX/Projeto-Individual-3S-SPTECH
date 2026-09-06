import '../index.module.css'
import style from "./criarEvento.module.css"
import { useState } from "react"

function CriarEvento (props) {

    const imageUpload = document.getElementById('imageUpload');
    // const fileNameHint = document.getElementById('fileName');
    const [ fileNameHint, setFileNameHint ] = new useState('')

    function colocarImagem() {
        document.getElementById("idImageUpload").click()
    }

    const [ button, setButton ] = new useState("Cadastrar")

    return (
        <div className={style.container_criarEvento}>
            <h2>Criar Evento</h2>
            <form action="" method="post">
                <div className={style.container_stringImage}>
                    <div className={style.container_inputStrings}>
                        <label htmlFor="idNome">Nome</label>
                        <input type="text" name="" id="idNome" />
                        <br />
                        <label htmlFor="idCategoria">Categoria</label>
                        <input type="text" name="" id="idCategoria" />
                        <br />
                        <label htmlFor="idDescricao">Descrição</label>
                        <input type="text" name="" id="idDescricao" />
                    </div>

                    <div className={style.container_inputImage}>
                        <div className={style.file_upload_zone} onClick={colocarImagem}>
                            <span>📸 Clique para escolher uma foto</span>
                            <input type="file" id={"idImageUpload"} accept="image/*" onChange={(ev) => {
                                if (ev.target.files && ev.target.files.length > 0) {
                                    // fileNameHint.textContent = ;
                                    setFileNameHint(`Arquivo selecionado: ${ev.target.files[0].name}`)
                                } else {
                                    setFileNameHint('');
                                }
                            }}/>
                        </div>
                        <p id="fileName" className={style.file_name_hint}>{fileNameHint}</p>
                    </div>
                </div>

                <div className={style.container_datas}>
                    <div className={style.container_dataInicio}>
                        <label htmlFor="idDataInicio">Data Início</label>
                        <input type="date" name="" id="idDataInicio" />
                    </div>
                    <div className={style.container_dataFim}>
                        <label htmlFor="idDataFim">Data Fim</label>
                        <input type="date" name="" id="idDataFim" />
                    </div>
                </div>

                <div className={style.container_buttons}>
                    <input type="button" name="" id={style.idButtonCancel} value={"Cancelar"} onClick={props.funcModalCE} />
                    <input type="button" name="" id={style.idButton} value={button} onClick={functionCriarEvento} />
                </div>
            </form>

        </div>
    )

    function functionCriarEvento() {
        let nome = document.getElementById('idNome').value
        let categoria = document.getElementById('idCategoria').value
        let descricao = document.getElementById('idDescricao').value
        let image = document.getElementById('idImageUpload')
        let dataInicio = document.getElementById('idDataInicio').value
        let dataFim = document.getElementById('idDataFim').value

        if (nome == null || nome.trim() == '') {
            alert('Digite algum Nome para o Evento')
            return
        } else if (categoria == null || categoria.trim() == '') {
            alert('Digite alguma Categoria para o Evento')
            return
        } else if (descricao == null || descricao.trim() == '') {
            alert('Digite alguma Descrição para o Evento')
            return
        } else if (dataInicio == null || dataInicio.trim() == '') {
            alert('Digite alguma Data de Ínicio para o Evento')
            return
        } else if (dataFim == null || dataFim.trim() == '') {
            alert('Digite alguma Data de Fim para o Evento')
            return
        }

        if (!image.files || !image.files[0]) {
            alert('Selecione alguma imagem!')
            return;
        }

        const formData = new FormData();
        formData.append("imagem", image.files[0])
        formData.append("nome", nome)
        formData.append("categoria", categoria)
        formData.append("descricao", descricao)
        formData.append("dataInicio", dataInicio)
        formData.append("dataFim", dataFim)

        fetch('http://localhost:8080/eventos', {
            method: 'POST',
            body: formData
        })
        .then(res => {
            if (res.ok) {
                res.json().then(dados => {
                    props.funcSetEventos((eventosAtuais) => [
                        ...eventosAtuais,
                        dados
                    ])
                })
            } else {
                console.log("Não deu Ok...")
            }
        })
        .catch(error => {
            console.log('Deu errooo: ', error)
        })

        props.funcModalCE()
    }
}

export default CriarEvento;