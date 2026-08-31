import style from "./tituloPagina.module.css"

function TituloPagina ({titulo}) {
    return (
        <div className={style.container_tituloPagina}>
            <h1>{titulo}</h1>
        </div>
    )
}

export default TituloPagina;