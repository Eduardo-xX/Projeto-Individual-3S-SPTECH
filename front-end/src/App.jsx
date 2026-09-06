import Style from "./App.module.css"
import Header from "./Componentes/Header"
import Main from "./Componentes/Main"
import Footer from "./Componentes/Footer"
import { useState, useEffect } from "react"
import Evento from "./Componentes/Evento"
import CriarEvento from "./Componentes/CriarEvento"
import EditarEvento from "./Componentes/EditarEvento"
import SideBarRight from "./Componentes/SideBarRight"

function App() {
  const [ eventos, setEventos ] = useState([]);
  const [ tela, setTela ] = useState("catalogo");
  const [ modalCriarEvento, setModalCriarEvento ] = useState(false);
  const [ modalEditarEvento, setModalEditarEvento ] = useState(false);
  const [ modalVerEvento, setModalVerEvento ] = useState(false);

  const [ inputEditEventoId, setInputEditEventoId ] = useState('');
  const [ inputEditEventoNome, setInputEditEventoNome ] = useState('');
  const [ inputEditEventoCategoria, setInputEditEventoCategoria ] = useState('');
  const [ inputEditEventoDescricao, setInputEditEventoDescricao ] = useState('');
  const [ inputEditEventoDataInicio, setInputEditEventoDataInicio ] = useState('');
  const [ inputEditEventoDataFim, setInputEditEventoDataFim ] = useState('');

  const [ verEventoImagem, setVerEventoImagem ] = useState('');
  const [ verEventoTitulo, setVerEventoTitulo ] = useState('');
  const [ verEventoCategoria, setVerEventoCategoria ] = useState('');
  const [ verEventoDescricao, setVerEventoDescricao ] = useState('');
  const [ verEventoDataInicio, setVerEventoDataInicio ] = useState('');
  const [ verEventoDataFim, setVerEventoDataFim ] = useState('');

  function trocarModalCriarEvento() {
    setTimeout(() => {
      setModalCriarEvento(!modalCriarEvento)
    }, 50);
  }

  function trocarModalEditarEvento(id) {
    eventos.forEach(evento => {
      if (evento.id == id) {
        setInputEditEventoId(id)
        setInputEditEventoNome(evento.nome)
        setInputEditEventoCategoria(evento.categoria)
        setInputEditEventoDescricao(evento.descricao)
        setInputEditEventoDataInicio(evento.dataInicio)
        setInputEditEventoDataFim(evento.dataFim)
      }
    });
    
    setTimeout(() => {
      setModalEditarEvento(!modalEditarEvento)
    }, 50);
  }

  function trocarModalVerEvento(id) {
    eventos.forEach(evento => {
      if (evento.id == id) {
        setVerEventoImagem(`http://localhost:8080/images/${evento.caminhoImagem}`)
        setVerEventoTitulo(evento.nome)
        setVerEventoCategoria(evento.categoria)
        setVerEventoDescricao(evento.descricao)
        setVerEventoDataInicio(evento.dataInicio)
        setVerEventoDataFim(evento.dataFim)
      }
    });

    setModalVerEvento(!modalVerEvento)
  }

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
      <Header funcModalCE={trocarModalCriarEvento} >

      </Header>
      {
        tela == "catalogo" && (
          <Main>
            {
              eventos.length > 0 ? 
              eventos.map((evento) => {

                let dataInicioFormatada = new Date(evento.dataInicio).toLocaleDateString("pt-BR")
                let dataFimFormatada = new Date(evento.dataFim).toLocaleDateString("pt-BR")

                return <Evento 
                  key={evento.id}
                  numeroEvento={evento.id}
                  caminhoImagem={"http://localhost:8080/images/" + evento.caminhoImagem} 
                  titulo={evento.nome}
                  descricao={evento.descricao}
                  dataInicio={dataInicioFormatada}
                  dataFim={dataFimFormatada}
                  funcSetEventos={setEventos}
                  funcGetEventos={eventos}
                  funcTrocarModalEditarEvento={trocarModalEditarEvento}
                  funcTrocarModalVerEvento={trocarModalVerEvento}
                />
              })

              :
              <div className={Style.container_semEventos}>
                <span>0 eventos cadastrados.</span>
                <span>Cadastre um Evento!</span>
              </div>
            }

            {
              modalCriarEvento ?
              <CriarEvento funcModalCE={trocarModalCriarEvento} funcSetEventos={setEventos} /> :
              null
            }

            {
              modalEditarEvento ?
              <EditarEvento 
              funcModalCE={trocarModalEditarEvento} 
              funcGetEventos={eventos} 
              funcSetEventos={setEventos} 
              getInputEditEventoId={inputEditEventoId}
              getInputEditEventoNome={inputEditEventoNome}
              getInputEditEventoCategoria={inputEditEventoCategoria}
              getInputEditEventoDescricao={inputEditEventoDescricao}
              getInputEditEventoDataInicio={inputEditEventoDataInicio}
              getInputEditEventoDataFim={inputEditEventoDataFim}
              setInputEditEventoNome={setInputEditEventoNome}
              setInputEditEventoCategoria={setInputEditEventoCategoria}
              setInputEditEventoDescricao={setInputEditEventoDescricao}
              setInputEditEventoDataInicio={setInputEditEventoDataInicio}
              setInputEditEventoDataFim={setInputEditEventoDataFim}
              /> :
              null
            }

            {
              modalVerEvento ?
              <SideBarRight funcGetEventos={eventos} 
                funcTrocarModalVerEvento={trocarModalVerEvento}
                imagem={verEventoImagem} 
                titulo={verEventoTitulo} 
                categoria={verEventoCategoria} 
                descricao={verEventoDescricao} 
                dataInicio={verEventoDataInicio} 
                dataFim={verEventoDataFim} 
              /> :
              null
            }
          </Main>
        ) 
      }
      <Footer></Footer>
    </div>
  )

}

export default App;