
/**
 * 2C = Two of Clubs
 * 2D = Two of Diaminds
 * 2H = Two of Hearts
 * 2S = Two of Spades 
 */


let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K' ];

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
    console.log( deck );


}

crearDeck();

const pedirCarta = () => {

    if(deck.length === 0){ throw 'No hay cartas en el deck';} //El THROW nos ayuda a finalizar nuestra app y mandar un mensaje de error 
    const carta = deck.pop()
    console.log(deck);
    console.log(carta);
    return carta;

}

// pedirCarta()

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1); //El metodo substring nos ayuda a obtener la parte del string que queremos.
    return (isNaN( valor )) ? // SOLO NECESITAMOS LA PARTE NUMERICA PAARA SABER SU VALOR RECORDEMOS QUE EL JUEGO SE TRATA DE LLEGAR A 21.
        ( valor  === 'A') ? 11 : 10
    : valor * 1; //De esta manera convertimos los string en numeros

}
const valor = valorCarta('AC');
console.log( {valor} );