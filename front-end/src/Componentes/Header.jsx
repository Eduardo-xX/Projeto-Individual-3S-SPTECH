import style from './header.module.css'
import plusCircle from '../assets/plus_circle-evento.png'

function Header (props) {
    return (
        <header>
            <div></div>
            <div></div>
            <div className={style.container_addEvento} onClick={props.funcModalCE}>
                <img src={plusCircle} alt="+" />
                <span>Novo Evento</span>
            </div>
        </header>
    )
}

export default Header;