import style from "./criarEvento.module.css"
import { useState } from "react"

function CriarEvento () {

    const imageUpload = document.getElementById('imageUpload');
    const fileNameHint = document.getElementById('fileName');

    function colocarImagem() {
        document.getElementById("idImageUpload").click()
    }

    const [ button, setButton ] = useState("Cadastrar")

    return (
        <div className={style.container_criarEvento}>
            <h2>Criar Evento</h2>
            <form action="" method="post">
                <div className={style.container_stringImage}>
                    <div className={style.container_inputStrings}>
                        <label htmlFor="idNome">Nome</label>
                        <input type="text" name="" id="idNome" />
                        <br />
                        <label htmlFor="idDescricao">Descrição</label>
                        <input type="text" name="" id="idDescricao" />
                        <br />
                        <label htmlFor="idCategoria">Categoria</label>
                        <input type="text" name="" id="idCategoria" />
                    </div>

                    <div className={style.container_inputImage}>
                        <div className={style.file_upload_zone} onClick={colocarImagem}>
                            <span>📸 Clique para escolher uma foto</span>
                            <input type="file" id={"idImageUpload"} accept="image/*" onChange={(ev) => {
                                if (ev.target.files && ev.target.files.length > 0) {
                                    fileNameHint.textContent = `Arquivo selecionado: ${ev.target.files[0].name}`;
                                } else {
                                    fileNameHint.textContent = '';
                                }
                            }}/>
                        </div>
                        <p id="fileName" className={style.file_name_hint}></p>
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
                    <input type="button" name="" id={style.idButtonCancel} value={"Cancelar"} />
                    <input type="submit" name="" id={style.idButton} value={button} />
                </div>
            </form>

        </div>
    )
}

export default CriarEvento;