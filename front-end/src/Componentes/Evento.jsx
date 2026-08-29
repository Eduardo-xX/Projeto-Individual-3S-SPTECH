import style from "./evento.module.css"
import menuEvento from "../assets/menu-evento.png"
import edit from "../assets/edit-evento-blue.png"
import trash from "../assets/trash-evento-red.png"
import { useState } from "react"

function Evento (props) {
    const [ buttons, setButtons ] = useState(false);

    function buttonMenu(id) {
        setButtons(!buttons)
    }    

    return (
        <div id={"evento-" + props.numeroEvento} className={style.container_evento}>
            <div className={style.container_buttonOptions} onClick={() => buttonMenu("evento-" + props.numeroEvento)}>
                <img src={menuEvento} alt="menu" className={style.menuEvento}/>
            </div>
            <div className={style.container_image}>
                <img src={props.image} alt="sla" />
            </div>
            <div className={style.container_titulo}>
                <span>{props.titulo}</span>
            </div>
            <div className={style.container_descricao}>
                <span>{props.descricao}</span>
            </div>
            <div className={style.container_datas}>
                <span>{props.dataInicio} - {props.dataFim}</span>
            </div>

            {buttons && (
                <div className={style.container_options}>
                    <div className={style.container_update}>
                        <img src={edit} alt="editar" />
                    </div>
                    <div className={style.container_delete}>
                        <img src={trash} alt="deletar" />
                    </div>
                </div>    
            )}
        </div>
    )
}

export default Evento;