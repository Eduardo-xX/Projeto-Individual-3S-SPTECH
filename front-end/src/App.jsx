import Style from "./App.module.css"
import Header from "./Componentes/Header"
import Main from "./Componentes/Main"
import Footer from "./Componentes/Footer"
import { useState, useEffect } from "react"
import Evento from "./Componentes/Evento"
import CriarEvento from "./Componentes/CriarEvento"

function App() {
  const [ eventos, setEventos ] = useState([]);
  const [ tela, setTela ] = useState("catalogo");

  useEffect(() => {

    fetch("http://localhost:8080/eventos")
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Erro ao buscar eventos")
        }
  
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((dados) => {
        console.log(dados)
        setEventos(dados)
      })      
      .catch((erro) => {
        console.log("Deu erro -> ", erro)
      })

  }, [])


  return (
    <div>
      <Header></Header>
      {
        tela == "catalogo" && (
          <Main>
            {
              eventos.map((evento) => {

                let dataInicioFormatada = new Date(evento.dataInicio).toLocaleDateString("pt-BR")
                let dataFimFormatada = new Date(evento.dataFim).toLocaleDateString("pt-BR")

                return <Evento 
                  numeroEvento={evento.id}
                  caminhoImagem={"http://localhost:8080/images/" + evento.caminhoImagem} 
                  titulo={evento.nome}
                  descricao={evento.descricao}
                  dataInicio={dataInicioFormatada}
                  dataFim={dataFimFormatada}
                />
              })
            }
            <CriarEvento></CriarEvento>
          </Main>
        ) 
      }
      <Footer></Footer>
    </div>
  )

}

export default App;