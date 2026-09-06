import '../index.module.css'
import style from './sideBarRight.module.css'

function SideBarRight(props) {
    let novaDataInicio = new Date(props.dataInicio.split("T")[0])
    let novaDataFim = new Date(props.dataFim.split("T")[0])

    return (
        <div className={style.container_sideBarRight}>
            
            <div className={style.container_imagem}>
                <img src={props.imagem} alt="Imagem" />
            </div>

            <div className={style.container_titulo}>
                <span>{props.titulo}</span>
            </div>

            <div className={style.container_categoria}>
                <span>{props.categoria}</span>
            </div>

            <div className={style.container_descricao}>
                <span>{props.descricao}</span>
            </div>

            <div className={style.container_datas}>
                <span><strong>{novaDataInicio.toLocaleDateString()}</strong> - <strong>{novaDataFim.toLocaleDateString()}</strong></span>
            </div>

            <div className={style.container_voltar} onClick={props.funcTrocarModalVerEvento}>
                <span>Voltar</span>
            </div>

        </div>
    )
}

export default SideBarRight;