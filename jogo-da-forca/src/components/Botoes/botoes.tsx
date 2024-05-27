import styles from './botoes.module.css'
import React, {useState} from 'react';
import Alerta from './img/alerta.svg';



const Botoes: React.FC = () => {
    const [content, setContent] = useState<string>('home');
    const [palavra, setPalavra] = useState<string>('');
    const [play, setPlay] = useState<string>('');
    const [palavraSalva, setPalavraSalva] = useState <string>(' ');
    const [letrasCorretas, setLetrasCorretas] = useState<string[]>([]);
    const [letrasIncorretas, setLetrasIncorretas] = useState<string[]>([]);
    const [numErros, setNumErros] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(false);
    const [vitoriaJogador, setVitoriaJogador] = useState<number>(0);
    const [vitoriaBoneco, setVitoriaBoneco] = useState<number>(0);
    const [tentativas, setTentativas]= useState<number>(6);


    const tamanhoPalavra = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (newValue.length <= 8) {
            setPalavra(newValue);
        }
    };

    const salvarPalavra = () => {
        setPalavraSalva(palavra.toUpperCase());
        setPlay('salvar');
        setContent('home');
    };

    const AdvinhaLetra = (e: React.ChangeEvent<HTMLInputElement>) => {
        const letra = e.target.value.toUpperCase();
        const novasLetras = ([...letrasCorretas, letra]);
        if (letra.length === 1 && /^[a-zA-Z]$/.test(letra)) {
            if (palavraSalva.includes(letra)) {
                setLetrasCorretas([...letrasCorretas, letra]);
                vitoriaDoJogador(novasLetras);
                
            } else {
                setLetrasIncorretas([...letrasIncorretas, letra]);
                setNumErros (numErros + 1);
                setVisible(true);
                setTentativas(tentativas - 1);

                if ((tentativas - 1) <= 0){
                    setVitoriaBoneco(vitoriaBoneco + 1);
                    alert("Você perdeu!")
                }

            }
            
        }
        e.target.value = '';
    }; 

    const vitoriaDoJogador = (quantLetrasCorretas: string[]) => {
        const palavraCompleta = palavraSalva.split('').every(letra => quantLetrasCorretas.includes(letra));
        if(palavraCompleta){
            setVitoriaJogador (vitoriaJogador + 1);
            alert("Você ganhou!")
        }
    };

    const partesDoBoneco = [
        styles.cabeca,
        styles.corpinho,
        styles.bracoD,
        styles.bracoE,
        styles.pernaD,
        styles.pernaE,
    ]

    const inserirPartesBoneco = () => {
        return(

            <div className={styles.boneco}>
                {partesDoBoneco.slice(0,numErros).map((parte, index) => (
                    <div key={index} className={parte}></div>
                ))}
            </div>

        );
    };

    const renderContent = () => {
        switch (content) {
            case 'jogo':
                return <div className={styles.cancelado}>
                    <h1>Iniciando o jogo...</h1>
                </div>;
            case 'novaPalavra':
                return (
                    <div className={styles.itens}>
                        <h1>Digite uma palavra ou frase</h1>

                        <input 
                            type="text" 
                            value={palavra}
                            onChange={tamanhoPalavra}
                            placeholder="Escreva aqui..."
                        />

                        <div className={styles.alerta}>
                            <img className='alerta' src={Alerta} alt="Alerta" />
                            <p>Máx. de 8 letras</p>
                        </div>

                        <div className={styles.inicializar}>
                            <button className={styles.salvar} onClick={salvarPalavra}>Salvar e começar</button>
                            <button className={styles.cancelar} onClick={() => (setPlay('cancelar'), setContent('home'))}>Cancelar</button>
                        </div>


                    </div>
                );
            default:
                return null;
        }
    };

    const renderPlay = () => {
        switch (play) {
            case 'salvar':
                return (
                    <div>
                        <div className={styles.alinhamentoBoneco}>

                            <div className={visible ? styles.baseBonecoVisible : styles.baseBoneco}>
                                <div className={styles.baseB}></div>
                                <div className={styles.verticalB}></div>
                                <div className={styles.horizontalB}></div>
                                <div className={styles.verticalpqB}></div>
                            </div>


                            {inserirPartesBoneco ()}
                                
                        </div>

                        <div className={styles.placar1}>
                            <h3>PLACAR</h3>
                            Jogador: {vitoriaJogador}<br/>
                            Boneco: {vitoriaBoneco}
                                
                        </div>
                        

                        <div className='corpo'>
                            <div className={styles.base}>
                                {palavraSalva.split('').map((letra, index) => (
                                    <div key={index} className={styles.tracinho}>
                                        <span className={styles.letra}>{letrasCorretas.includes(letra.toUpperCase()) ? letra.toUpperCase() : ' '}</span>

                                    </div>
                                ))}
                            </div>

                            <div className={styles.letrasIncorretas}>
                                {letrasIncorretas.join(' ')}

                            </div>

                        <div className={styles.inLetra}> 

                            <input
                                type='text'
                                onChange={AdvinhaLetra}
                                placeholder='Advinhe uma letra...'
                            />

                        </div>

                        


                        </div>


    
                        <div className={styles.botoesNovo}>
                            <button className={styles.botao1} onClick={() => (setPlay(''), setContent('home'), setPalavraSalva(''), setLetrasCorretas([]),setPalavra(''), setLetrasIncorretas([]), setTentativas(6), setVisible(false), setNumErros(0))}>Novo jogo</button>
                            <button className={styles.cancelar} onClick={() => (setPlay('cancelar'), setContent('home'))}>Desistir</button>
                        </div>
    
                        

        
                    </div>
                );
            case 'cancelar':
                return (
                    <div className={styles.cancelado}>
                        <h1>Jogo cancelado! <br /> Atualize a página para retornar a página inicial.</h1>
                    </div>
                );
            default:
                return null;
        }

    }
    

    return (
        <div>
            {content === 'home' && play === '' ? (
                <div className={styles.botoes}>
                    <button className={styles.botao1} onClick={() => setContent('jogo')}>Começar a jogar</button>
                    <button className={styles.botao2} onClick={() => setContent('novaPalavra')}>Adicionar nova palavra</button>
                </div>
            ) : (
                <div className="conteudo">
                    {renderContent()}
                    {renderPlay()}
                </div>
            )}
        </div>
    );
};


export default Botoes;