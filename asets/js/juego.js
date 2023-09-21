
/**
 * 2C = Two of Clubs
 * 2D = Two of Diaminds
 * 2H = Two of Hearts
 * 2S = Two of Spades 
 */


(() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K' ];

    let puntosJugadores = [];



    // -------------- REFERENCIAS DEL HTML -----------

    const btnPedir = document.querySelector('#btnPedir'),
        btnNuevo = document.querySelector('#btnNuevo'),
        btnDetener = document.querySelector('#btnDetener');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');

    // console.log(btnPedir)

    const iniciarJuego = (numJugadores = 2) =>{
        deck = crearDeck();
         puntosJugadores = [];
        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }
        // console.log({puntosJugadores})
        console.log(deck)

        

        btnPedir.disabled = false;
        btnDetener.disabled = false;


        // puntosHTML[0].innerText = 0 ;
        // puntosHTML[1].innerText = 0 ;  
        //AQUI trabajamos con el forEach ya que puntosHTML y divCartasJugadores son arreglos
        puntosHTML.forEach( elem => elem.innerText = 0)
        divCartasJugadores.forEach( elem => elem.innerHTML = '')

    }


    // Esta función me permite tomar una carta
    const crearDeck = () => {

        deck = [];
        for( let i = 2; i <= 10; i++ ) {
            for( let tipo of tipos ) {
                deck.push( i + tipo);
            }
        }

        for( let tipo of tipos ) {
            for( let esp of especiales ) {
                deck.push( esp + tipo);
            }
        }
        return _.shuffle( deck );;
    }

    
    const pedirCarta = () => {

        if(deck.length === 0){ throw 'No hay cartas en el deck';} //El THROW nos ayuda a finalizar nuestra app y mandar un mensaje de error 
        const carta = deck.pop()
        return carta;

    }

    

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1); //El metodo substring nos ayuda a obtener la parte del string que queremos.
        return (isNaN( valor )) ? // SOLO NECESITAMOS LA PARTE NUMERICA PAARA SABER SU VALOR RECORDEMOS QUE EL JUEGO SE TRATA DE LLEGAR A 21.
            ( valor  === 'A') ? 11 : 10
        : valor * 1; //De esta manera convertimos los string en numeros

    }
    // const valor = valorCarta('AC');  //De esta manera se llama y se imprime el valor de la carta segun la funcion
    // console.log( {valor} );


    // Turno: 0 = primer jugador y el ultimo sera la computadora
    const acumularPuntos = (carta, turno) =>{

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno]

    }

    const crearCarta = (carta, turno) => {

        const nuevaCarta = document.createElement('img') 
        nuevaCarta.src = `asets/cartas/${carta}.png`
        nuevaCarta.classList.add('cartas')
        divCartasJugadores[turno].append(nuevaCarta)
    }

    const determinarGanador = () =>{

        const [puntosMinimos, puntosComputadora ] = puntosJugadores
        setTimeout(() => {
            if (puntosMinimos === puntosComputadora ) {
                alert('Nadie gana')
            }else if (puntosMinimos > 21 ) {
                alert('Perdiste')
            }else if (puntosComputadora > 21){ 
                alert('Ganaste')
            }else {
                alert('Perdiste')
            }
        
        }, 1000);
    }

    // ------------  TURNO COMPUTADOR
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length-1)
            crearCarta(carta, puntosJugadores.length - 1)

        

            // puntosComputadora = puntosComputadora + valorCarta(carta)

            // console.log(puntosJugador)
            // puntajeComputadora.innerText = puntosComputadora;

            if (puntosMinimos > 21) {
                    break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosComputadora <= 21) ){


        };

        determinarGanador();
    }

    
    
    
    //--------------------- EVENTOS ------------------

    //funcion detener

    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    })

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0)

        if (puntosJugador > 21 ) {

            console.warn('perdiste')
            
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
            
        }else if (puntosJugador === 21 ){ 
            console.warn('21, genial')
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        }
    });

    // NUEVO JUEGO   ------------------

    btnNuevo.addEventListener('click', () => {
        console.clear();
        console.warn('juego nuevo')

        iniciarJuego();
    })



})();

