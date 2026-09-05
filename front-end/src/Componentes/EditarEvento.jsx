import style from "./editarEvento.module.css"
import { useState } from "react"

function EditarEvento (props) {

    const imageUpload = document.getElementById('imageUpload');
    // const fileNameHint = document.getElementById('fileName');
    const [ fileNameHint, setFileNameHint ] = new useState('')

    function colocarImagem() {
        document.getElementById("idImageUpload").click()
    }

    const [ button, setButton ] = new useState("Atualizar")
    const [ contentAlterarImagem, setContentAlterarImagem ] = new useState(false)

    return (
        <div className={style.container_criarEvento}>
            <h2>Editar Evento {props.getInputEditEventoNome ? `- ${props.getInputEditEventoNome}` : null}</h2>
            <form action="" method="post">
                <div className={style.container_stringImage}>
                    <div className={style.container_inputStrings}>
                        <label htmlFor="idNome">Nome</label>
                        <input type="text" name="" id="idNome" value={props.getInputEditEventoNome} onChange={(e) => {
                            props.setInputEditEventoNome(e.target.value)
                        }} />
                        <br />
                        <label htmlFor="idCategoria">Categoria</label>
                        <input type="text" name="" id="idCategoria" value={props.getInputEditEventoCategoria} onChange={(e) => {
                            props.setInputEditEventoCategoria(e.target.value)
                        }} />
                        <br />
                        <label htmlFor="idDescricao">Descrição</label>
                        <input type="text" name="" id="idDescricao" value={props.getInputEditEventoDescricao} onChange={(e) => {
                            props.setInputEditEventoDescricao(e.target.value)
                        }} />
                    </div>

                    <div className={style.container_inputImage}>
                        {
                            contentAlterarImagem ?
                            <div>
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
                            :
                            null
                        }
                        <div className={style.containerAlterarImagem}>
                            <label htmlFor="idAlterarImagem">Alterar Imagem</label>
                            <input type="checkbox" name="" id={style.idAlterarImagem} value={contentAlterarImagem} onChange={(e) => {
                                setContentAlterarImagem(e.target.checked) 
                            }} />
                        </div>
                    </div>
                </div>

                <div className={style.container_datas}>
                    <div className={style.container_dataInicio}>
                        <label htmlFor="idDataInicio">Data Início</label>
                        <input type="date" name="" id="idDataInicio" value={props.getInputEditEventoDataInicio?.split("T")[0]} onChange={(e) => {
                            props.setInputEditEventoDataInicio(e.target.value)
                        }} />
                    </div>
                    <div className={style.container_dataFim}>
                        <label htmlFor="idDataFim">Data Fim</label>
                        <input type="date" name="" id="idDataFim" value={props.getInputEditEventoDataFim?.split("T")[0]} onChange={(e) => {
                            props.setInputEditEventoDataFim(e.target.value)
                        }} />
                    </div>
                </div>

                <div className={style.container_buttons}>
                    <input type="button" name="" id={style.idButtonCancel} value={"Cancelar"} onClick={props.funcModalCE} />
                    <input type="button" name="" id={style.idButton} value={button} onClick={functionEditarEvento} />
                </div>
            </form>

        </div>
    )

    function functionEditarEvento() {
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

export default EditarEvento;