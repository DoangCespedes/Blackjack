
/**
 * 2C = Two of Clubs
 * 2D = Two of Diaminds
 * 2H = Two of Hearts
 * 2S = Two of Spades 
 */


let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K' ];

let puntosJugador = 0,
    puntosComputadora = 0;

// -------------- REFERENCIAS DEL HTML -----------

const btnPedir = document.querySelector('#btnPedir')
const btnNuevo = document.querySelector('#btnNuevo')
const btnDetener = document.querySelector('#btnDetener')
const puntajeJugador = document.querySelector('#puntajeJugador')
const puntajeComputadora = document.querySelector('#puntajeComputadora')
const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')

// console.log(btnPedir)

const crearDeck = () => {
    for( let i = 2; i<= 10; i++){
        for( let tipo of tipos){
            deck.push( i + tipo)
        }
    }

    for( let tipo of tipos){
        for(let esp of especiales){
            deck.push( esp + tipo);
        }
    }
    // console.log( deck );
    deck = _.shuffle( deck );
    // console.log( deck );


}

crearDeck();

const pedirCarta = () => {

    if(deck.length === 0){ throw 'No hay cartas en el deck';} //El THROW nos ayuda a finalizar nuestra app y mandar un mensaje de error 
    const carta = deck.pop()
    // console.log(deck);
    // console.log(carta);
    return carta;

}

// pedirCarta()

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1); //El metodo substring nos ayuda a obtener la parte del string que queremos.
    return (isNaN( valor )) ? // SOLO NECESITAMOS LA PARTE NUMERICA PAARA SABER SU VALOR RECORDEMOS QUE EL JUEGO SE TRATA DE LLEGAR A 21.
        ( valor  === 'A') ? 11 : 10
    : valor * 1; //De esta manera convertimos los string en numeros

}
// const valor = valorCarta('AC');  //De esta manera se llama y se imprime el valor de la carta segun la funcion
// console.log( {valor} );



// ------------  TURNO COMPUTADOR
const turnoComputadora = (puntosMinimos) => {
   do {
         
   const carta = pedirCarta();

   const nuevaCarta = document.createElement('img') 
   divCartasComputadora.append( nuevaCarta )
   nuevaCarta.src = `asets/cartas/${carta}.png`
   nuevaCarta.classList.add('cartas')

   puntosComputadora = puntosComputadora + valorCarta(carta)

   // console.log(puntosJugador)
   puntajeComputadora.innerText = puntosComputadora;

   if (puntosMinimos > 21) {
        break;
   }

   } while ((puntosComputadora < puntosMinimos) && (puntosComputadora <= 21) ){


   };

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

//funcion detener

btnDetener.addEventListener('click', () => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
})



//--------------------- EVENTOS ------------------

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    const nuevaCarta = document.createElement('img') 
    divCartasJugador.append( nuevaCarta )
    nuevaCarta.src = `asets/cartas/${carta}.png`
    nuevaCarta.classList.add('cartas')

    puntosJugador = puntosJugador + valorCarta(carta)

    // console.log(puntosJugador)
    puntajeJugador.innerText = puntosJugador;

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
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    puntajeJugador.innerText = 0 ;
    puntajeComputadora.innerText = 0 ;
    puntosJugador = 0;
    puntosComputadora  = 0;

    divCartasJugador.innerHTML = '<p></p>'
    divCartasComputadora.innerHTML = '<p></p>'
})