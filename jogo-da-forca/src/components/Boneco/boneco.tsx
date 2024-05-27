import React from 'react';
import styles from './boneco.module.css'; // Supondo que você tenha estilos para o Boneco

const Boneco: React.FC = () => {
    return(
        <div className={styles.boneco}>

            <div className={styles.base}></div>
            <div className={styles.barra1}></div>
            <div className={styles.barra2}></div>

        </div>
    );
};

export default Boneco;