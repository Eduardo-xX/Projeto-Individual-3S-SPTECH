import '../index.module.css'
import style from "./main.module.css"
import TituloPagina from "./TituloPagina"
import Evento from './Evento'

function Main(props) {
    return (
        <main className={style.container_main}>
            <TituloPagina titulo={"Eventos"} />

            <div className={style.container_eventos}>
                {props.children}
            </div>

        </main>
    )
}

export default Main;