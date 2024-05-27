import styles from './cabecalho.module.css'
import Logo from './img/logo.svg'

function Cabecalho(){
    return(
        <header>
            <div className={styles.cabecalho}>
                <img className='logo' src={Logo}></img>
            </div>
            
        </header>
    )
}

export default Cabecalho;