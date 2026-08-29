import Evento from './Evento'

function Main() {
    return (
        <main>
            <Evento numeroEvento={1} image={"./assets/anime-friends.png"} titulo={"Anime Friends"} descricao={"Evento de Animes que acontece na Paulista."} dataInicio={"22/10/2026"} dataFim={"30/10/2026"} />

            <Evento numeroEvento={2} image={"./assets/anime-friends.png"} titulo={"Anime Friends"} descricao={"Evento de Animes que acontece na Paulista."} dataInicio={"22/10/2026"} dataFim={"30/10/2026"} />

            <Evento numeroEvento={3} image={"./assets/anime-friends.png"} titulo={"Anime Friends"} descricao={"Evento de Animes que acontece na Paulista."} dataInicio={"22/10/2026"} dataFim={"30/10/2026"} />
        </main>
    )
}

export default Main;