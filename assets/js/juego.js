// modulo patron para proteger el codigo no se podrá accedor a las variable
let deck = [];
const tipos = ['C', 'D', 'H', 'S'],
    especiales = ['A', 'J', 'Q', 'K'];
const btngetCard = document.querySelector('#btn-getCards'),
    Detener = document.querySelector('#btn-stop'),
    btnnewGame = document.querySelector('#btn-newGame');
let puntosJugador = 0,
    puntosComputadora = 0;
const Small = document.querySelector('#smallJugador'),
    Small2 = document.querySelector('#smallComputadora'),
    divCartasJugador = document.querySelector('#jugador'),
    divCartasComputadora = document.querySelector('#computadora');
function DetenerBotones() {
    btngetCard.disabled = true;
    Detener.disabled = true;
}
// inserta las cartas en el div correspondiente
function insertarImagen(carta, divCartas) { // inserta las cartas en el div correspondiente
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartas.append(imgCarta);
}
// esta funciona crea la baraja de cartas
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }
    deck = _.shuffle(deck);
    return deck;
}
crearDeck();
// esta funcion pide la carta
const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}
// esta funcion da el valor de la carta
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
}
// logica computadora
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        Small2.innerText = puntosComputadora;
        insertarImagen(carta, divCartasComputadora);

        if (puntosMinimos > 21) {
            break;
        }
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
}
// eventos
btngetCard.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    console.log(puntosJugador);
    Small.innerText = puntosJugador;
    insertarImagen(carta, divCartasJugador);

    if (puntosJugador > 21) {
        Swal.fire("Perdiste! 21 superado");
        DetenerBotones();
        turnoComputadora(puntosJugador);

    } else if (puntosJugador === 21) {
        Swal.fire("Ganaste");// sweet alert
        btngetCard.disabled = true;
        Detener.disabled = true;
        turnoComputadora(puntosJugador);
    }
});
btnnewGame.addEventListener('click', () => {
    deck = []; //vuelve a crear la baraja
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    Small.innerText = puntosJugador;
    Small2.innerText = puntosComputadora;
    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';
    btngetCard.disabled = false;
    Detener.disabled = false;

});
Detener.addEventListener('click', () => {
    DetenerBotones();
    turnoComputadora(puntosJugador);
    setTimeout(() => {
        if (puntosJugador === puntosComputadora) {
            Swal.fire("Empate");
        } else if (puntosJugador > puntosComputadora && puntosJugador <= 21) {
            Swal.fire("Ganaste! ");
        } else if (puntosComputadora <= 21) {
            Swal.fire("Computadora gana");
        }
        else if (puntosComputadora > 21) {
            Swal.fire("Ganaste! Computadora supero 21");
        }
    }, 100);
});






