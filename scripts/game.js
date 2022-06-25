// Turno del Jugador

// Turno del pc, que sea una función ejecutable desde a fuera

// Un iniciador que determine el algoritmo a ejecutarse

// Un redireccionador que intercambie turnos

// Manejar retroalimentaciones en pantalla y compartir variables entre algoritmos

// Esto es un comentario prueba en el que intento pasarme de líneas para ver el cambio en la pantalla: procedo a AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

// Obtener variables que se necesitan manejar acá

const Infinito = Number.MAX_SAFE_INTEGER
let primeros_turnos_partidas = ["J", "IA", "J"]

let PartidosIA_interfaz   = document.getElementById("PartidosIA");
let PartidosJ_interfaz    = document.getElementById("PartidosJ");
let time_interfaz         = document.getElementById("time")
let movimientos_interfaz  = document.getElementById("moves")
let turno_interfaz        = document.getElementById("turno") 

let uno = document.querySelector(".uno");
let dos = document.querySelector(".dos");
let tres = document.querySelector(".tres");
let cuatro = document.querySelector(".cuatro");
let cinco = document.querySelector(".cinco");
let seis = document.querySelector(".seis");
let siete = document.querySelector(".siete");

var turno                 = primeros_turnos_partidas[0]
let time                  = 0
let movimientos           = 0
let EnJuego               = true

/*let tablero_interfaz = [
  [document.getElementById("a1"), document.getElementById("a2"), document.getElementById("a3"), document.getElementById("a4"), document.getElementById("a5"), document.getElementById("a6"), document.getElementById("a7")],
  [document.getElementById("b1"), document.getElementById("b2"), document.getElementById("b3"), document.getElementById("b4"), document.getElementById("b5"), document.getElementById("b6"), document.getElementById("b7")],
  [document.getElementById("c1"), document.getElementById("c2"), document.getElementById("c3"), document.getElementById("c4"), document.getElementById("c5"), document.getElementById("c6"), document.getElementById("c7")],
  [document.getElementById("d1"), document.getElementById("d2"), document.getElementById("d3"), document.getElementById("d4"), document.getElementById("d5"), document.getElementById("d6"), document.getElementById("d7")],
  [document.getElementById("e1"), document.getElementById("e2"), document.getElementById("e3"), document.getElementById("e4"), document.getElementById("e5"), document.getElementById("e6"), document.getElementById("e7")],
  [document.getElementById("f1"), document.getElementById("f2"), document.getElementById("f3"), document.getElementById("f4"), document.getElementById("f5"), document.getElementById("f6"), document.getElementById("f7")],
]*/

const CargarTablero_interfaz = () => {
  let output = Array(Array())

  output.pop()

  for (let i = 0; i <= 5; i++) {
    let rows = Array()
    for (let j = 1; j <= 7; j++) {
      // El código 97 es el caracter a en ascii.
      rows.push(document.getElementById(`${String.fromCharCode(97 + i)}${j}`))
    }

    output.push(rows)
  }
  return output
}

tablero_interfaz = CargarTablero_interfaz()

let tablero = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
]

var reiniciarPartida = () => {

  time = 0
  movimientos = 0

  tablero = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ]
}

function Juego() {

  console.log("Juegoooo!")

  if (turno == "J") {
    InicioJugador()
  } else {
    TurnoIA()
  }

}

function InicioJugador() {

  console.log("Jugador")

  turno_interfaz.className = "turnoy"

  uno.addEventListener(     "click", unoFinJ)
  dos.addEventListener(     "click", dosFinJ)
  tres.addEventListener(    "click", tresFinJ)
  cuatro.addEventListener(  "click", cuatroFinJ)
  cinco.addEventListener(   "click", cincoFinJ)
  seis.addEventListener(    "click", seisFinJ)
  siete.addEventListener(   "click", sieteFinJ)

}

function unoFinJ(){
  FinJugador(0)
}
function dosFinJ(){
  FinJugador(1)
}
function tresFinJ(){
  FinJugador(2)
}
function cuatroFinJ(){
  FinJugador(3)
}
function cincoFinJ(){
  FinJugador(4)
}
function seisFinJ(){
  FinJugador(5)
}
function sieteFinJ(){
  FinJugador(6)
}

var FinJugador = (columna) => {
  
  InsertarFicha("J", columna)

  // uno.replaceWith(uno.cloneNode(true))
  // dos.replaceWith(dos.cloneNode(true))
  // tres.replaceWith(tres.cloneNode(true))
  // cuatro.replaceWith(cuatro.cloneNode(true))
  // cinco.replaceWith(cinco.cloneNode(true))
  // seis.replaceWith(seis.cloneNode(true))
  // siete.replaceWith(siete.cloneNode(true))

  uno.removeEventListener(     "click", unoFinJ)
  dos.removeEventListener(     "click", dosFinJ)
  tres.removeEventListener(    "click", tresFinJ)
  cuatro.removeEventListener(  "click", cuatroFinJ)
  cinco.removeEventListener(   "click", cincoFinJ)
  seis.removeEventListener(    "click", seisFinJ)
  siete.removeEventListener(   "click", sieteFinJ)

  EnJuego = Verificar()
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function Aleatorio(inferior, superior) {
  let numPosibilidades = superior - inferior;
  let aleatorio = Math.random() * (numPosibilidades + 1);
  aleatorio = Math.floor(aleatorio);
  return inferior + aleatorio;
}

async function TurnoIA() {

  console.log("IA")

  turno_interfaz.className = "turnor"

  await sleep(1000)

  let aleatoria = Aleatorio(1, 7)
  console.log(aleatoria)

  InsertarFicha("IA", aleatoria)

  EnJuego = Verificar()

}

const InsertarFicha = (turno, columna) => {

  let altura_ultima_ficha = 5

  for (let i = 0; i < tablero.length; i++) {
    let fila = tablero[i]
    if ( fila[columna] != "" ) {
      altura_ultima_ficha = i - 1
      break
    }
  }

  if (turno == "J") {
    tablero[altura_ultima_ficha][columna] = "y"
    tablero_interfaz[altura_ultima_ficha][columna].className = "celly"
  } else {
    tablero[altura_ultima_ficha][columna] = "r"
    tablero_interfaz[altura_ultima_ficha][columna].className = "cellr"
  }

}

const Verificar = () => {

  // turno = turno == J ? "IA" : "J"
  if (turno == "J") {turno = "IA"} else {turno = "J"}

  console.log(turno)

  // Si existe una línea de 4 fichas o el tiempo es mayor a un minuto Fin
  if (EnJuego) {
    Juego()
  }
  return true
}

const MiniMax = (nodo, profundidad, MaximizandoJugador) => {
  if (profundidad == 0 || nodo.hijos.length == 0) {
    return nodo.ValorHeuristico

  } else if (MaximizandoJugador) {
    let valor = -Infinito

    for (hijo of nodo.hijos) {
      valor = Math.max(valor, MiniMax(hijo, profundidad - 1, false))
    }

    return valor

  } else {

    let valor = Infinito

    // puede ser:
    // let hijo = estado == 'J' ? 'IA' : 'J'

    for (hijo of nodo.hijos) {
      valor = Math.min(valor, MiniMax(hijo, profundidad - 1, true))
    }

    return valor
  }
}