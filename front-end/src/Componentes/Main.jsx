import style from "./main.module.css"
import TituloPagina from "./TituloPagina"
import Evento from './Evento'

function Main(props) {
    return (
        <main className={style.container_main}>
            <TituloPagina titulo={"Cátalogo"} />

            <div className={style.container_eventos}>
                {/* <Evento numeroEvento={1} image={"http://localhost:8080/images/anime-friends.png"} titulo={"Anime Friends"} descricao={"Evento de Animes que acontece na Paulista."} dataInicio={"22/10/2026"} dataFim={"30/10/2026"} />

                <Evento numeroEvento={2} image={"http://localhost:8080/images/anime-friends.png"} titulo={"Anime Friends"} descricao={"Evento de Animes que acontece na Paulista."} dataInicio={"22/10/2026"} dataFim={"30/10/2026"} />

                <Evento numeroEvento={3} image={"http://localhost:8080/images/anime-friends.png"} titulo={"Anime Friends"} descricao={"Evento de Animes que acontece na Paulista."} dataInicio={"22/10/2026"} dataFim={"30/10/2026"} />

                <Evento numeroEvento={3} image={"http://localhost:8080/images/anime-friends.png"} titulo={"Anime Friends"} descricao={"Evento de Animes que acontece na Paulista."} dataInicio={"22/10/2026"} dataFim={"30/10/2026"} /> */}
                {props.children}
            </div>

        </main>
    )
}

export default Main;