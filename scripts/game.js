// Turno del Jugador

// Turno del pc, que sea una función ejecutable desde a fuera

// Un iniciador que determine el algoritmo a ejecutarse

// Un redireccionador que intercambie turnos

// Manejar retroalimentaciones en pantalla y compartir variables entre algoritmos

// Obtener variables que se necesitan manejar acá
"use strict"

const Infinito = Number.MAX_SAFE_INTEGER
let primeros_turnos_partidas = ["J", "IA", "J"]

let PartidosIA_interfaz  = document.getElementById("PartidosIA");
let PartidosJ_interfaz   = document.getElementById("PartidosJ");
let time_interfaz        = document.getElementById("time")
let movimientos_interfaz = document.getElementById("moves")
let turno_interfaz       = document.getElementById("turno")
const boton              = document.getElementById("boton")

// let uno    = document.querySelector(".uno");
// let dos    = document.querySelector(".dos");
// let tres   = document.querySelector(".tres");
// let cuatro = document.querySelector(".cuatro");
// let cinco  = document.querySelector(".cinco");
// let seis   = document.querySelector(".seis");
// let siete  = document.querySelector(".siete");

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

let columnas_interfaz = [
  document.querySelector(".uno"),
  document.querySelector(".dos"),
  document.querySelector(".tres"),
  document.querySelector(".cuatro"),
  document.querySelector(".cinco"),
  document.querySelector(".seis"),
  document.querySelector(".siete")
]

let columnas_funciones = [
    unoFinJ,
    dosFinJ,
    tresFinJ,
    cuatroFinJ,
    cincoFinJ,
    seisFinJ,
    sieteFinJ
]

var turno                 = primeros_turnos_partidas[0]
let movimientos           = 0
let EnJuego               = true
let TableroColsDisp       = [6, 6, 6, 6, 6, 6, 6]
let FichasJugador         = 21
let FichasIA              = 21

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

const tablero_interfaz = CargarTablero_interfaz()

let tablero = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
]

const TablaHauristica = [
  [3, 4, 5,  7,  5,  4, 3],
  [4, 6, 8,  10, 8,  6, 4],
  [5, 8, 11, 13, 11, 8, 5],
  [5, 8, 11, 13, 11, 8, 5],
  [4, 6, 8,  10, 8,  6, 4],
  [3, 4, 5,  7,  5,  4, 3],
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

function FinPorTiempo() {
  for (let i = 0; i < columnas_interfaz.length; i++) {
    if (TableroColsDisp[i] != 0) {
      columnas_interfaz[i].removeEventListener("click", columnas_funciones[i])
    }
  }

  clearInterval(clock);
  console.log("Fin del Tiempo Límite")
  swal({
    title: "Que lástima, se ha agotado el tiempo",
    text: "No has podido finalizar la aprtida",
    icon: "warning",
    button: "Listo",
  });
}

function Inicio() {
  setTimeout(FinPorTiempo, 59000);
  Juego()
}

function Juego() {
  if (turno == "J") {
    InicioJugador()
  } else {
    TurnoIA()
  }
}

function InicioJugador() {

  turno_interfaz.className = "turnoy"

  for (let i = 0; i < columnas_interfaz.length; i++) {
    if (TableroColsDisp[i] != 0) {
      columnas_interfaz[i].addEventListener("click", columnas_funciones[i])
    }
  }

}

var FinJugador = (columna) => {

  for (let i = 0; i < columnas_interfaz.length; i++) {
    if (TableroColsDisp[i] != 0) {
      columnas_interfaz[i].removeEventListener("click", columnas_funciones[i])
    }
  }

  InsertarFicha("J", columna)

  Verificar()
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function Aleatorio(inferior, superior) {
  let numPosibilidades = superior - inferior;
  let aleatorio = Math.random() * (numPosibilidades + 1);
  aleatorio = Math.floor(aleatorio);

  if (FichasIA <= 0) return -1;

  if (TableroColsDisp[inferior + aleatorio] < 1) return Aleatorio(inferior, superior)

  return inferior + aleatorio;
}

async function TurnoIA() {

  turno_interfaz.className = "turnor"

  // await sleep(500)

  let aleatoria = Aleatorio(0, 6)

  InsertarFicha("IA", aleatoria)
  // InsertarFicha("IA", MiniMax(nodo, 4, true))

  Verificar()

}

const InsertarFicha = (turno, columna) => {

  if (columna >= 7 || columna < 0 || TableroColsDisp[columna] < 1) return

  TableroColsDisp[columna] -= 1

  let altura_ultima_ficha = 5

  for (let i = 0; i < tablero.length; i++) {
    let fila = tablero[i]
    if ( fila[columna] != "" ) {
      altura_ultima_ficha = i - 1
      break
    }
  }

  console.log(altura_ultima_ficha)
  console.log(columna)

  if (turno == "J") {
    tablero[altura_ultima_ficha][columna] = "y"
    tablero_interfaz[altura_ultima_ficha][columna].className = "celly"
    FichasJugador -= 1
  } else {
    tablero[altura_ultima_ficha][columna] = "r"
    tablero_interfaz[altura_ultima_ficha][columna].className = "cellr"
    FichasIA -= 1
  }

}

function Victoria_PosibleVictoria(jugador, posible) {
  const numToWin = 4
  let lineasEncontradas = 0

  //Búscando líneas de 4 horizontales
  let NumHorizontales = 0

  for (let fila of tablero) {

    let cantidad = 0;
    for (let celda of fila) {
      cantidad = (celda == jugador || celda == posible) ? cantidad + 1 : 0
      NumHorizontales = cantidad >= numToWin ? NumHorizontales + 1 : NumHorizontales
    }

  }

  //Buscando lineas de 4 verticales
  let NumVerticales = 0

  for (let col = 0; col < tablero[0].length; col++) {
    let cantidad = 0;
    for (let fil = 0; fil < tablero.length; fil++) {
      cantidad = (tablero[fil][col] == jugador ||
                  tablero[fil][col] == posible) ? cantidad + 1 : 0
      NumVerticales = cantidad >= numToWin ? NumVerticales + 1 : NumVerticales
    }
  }

  //Buscando líneaas de 4 diagonales de pendiente negativa
  let NumDiagonalNeg = 0

  for (let fil = 0; fil <= tablero.length - numToWin; fil++) {
    for (let col = 0; col <= tablero[0].length - numToWin; col++) {

      let cantidad = 0
      for (let posLinea = 0; posLinea < numToWin; posLinea++) {
        cantidad = (tablero[fil + posLinea][col + posLinea] == jugador ||
                    tablero[fil + posLinea][col + posLinea] == posible) ? cantidad + 1 : 0
        NumDiagonalNeg += cantidad >= numToWin ? 1 : 0
      }
    }
  }

  //Buscando líneas de 4 diagonales de pendiente positiva
  let NumDiagonalPos = 0

  for (let fil = tablero.length - 1; fil >= numToWin - 1; fil--) {
    for (let col = 0; col <= tablero[0].length - numToWin; col++) {

      let cantidad = 0
      for (let posLinea = 0; posLinea < numToWin; posLinea++) {
        cantidad = (tablero[fil - posLinea][col + posLinea] == jugador ||
                    tablero[fil - posLinea][col + posLinea] == posible) ? cantidad + 1 : 0
        NumDiagonalPos += cantidad >= numToWin ? 1 : 0
      }
    }
  }

  console.log("___________________________________________________")
  console.log(NumHorizontales)
  console.log(NumVerticales)
  console.log(NumDiagonalNeg)
  console.log(NumDiagonalPos)

  lineasEncontradas =
      NumHorizontales +
      NumVerticales +
      NumDiagonalNeg +
      NumDiagonalPos
  return lineasEncontradas
}

const Verificar = () => {

  let estado = ""
  let EnJuego = true
  let SinFichas = false

  // Si te quedas sin fichas
  if (FichasIA <= 0 && FichasJugador <= 0) {SinFichas = true}

  //Si existe alguna línea de 4 fichas, se acabó el juego
  let jugadores = ["y", "r"]
  let HayCuatroLineas = false
  jugadores.forEach((jugador) => {
    if (Victoria_PosibleVictoria(jugador, jugador) != 0) {
      HayCuatroLineas = true
    }
  })

  if (!HayCuatroLineas && !SinFichas) {
    // Si no hay cuatro lineas y no se han quedado sin fichas
    turno = turno == "J" ? "IA" : "J"
    Juego()
  } else if (SinFichas && !HayCuatroLineas) {
    //Si se quedaron ambos sin fichas y nadie ganó, empate
    console.log("Hubo empate")
    swal({
      title: "Wao...Eso fue...Un Empate!",
      text: "Has empatado contra la IA",
      icon: "info",
      button: "Listo",
    });
    boton.src = "/data/images/restock.svg"
    clearInterval(clock);
  } else {

    console.log("Hubo victoria")

    if (turno == "J") {
      swal({
        title: "Victoria!",
        text: "Has ganado la partida contra la IA",
        icon: "success",
        button: "Listo",
      });

    } else {
      swal({
        title: "Ohh no!",
        text: "Has perdido la partida contra la IA!",
        icon: "error",
        button: "Listo",
      });
    }
    boton.src = "/data/images/restock.svg"

    clearInterval(clock);
  }
}

class Nodo {

  constructor(estado, jugador) {
    this.hijos = Array()
    this.ValorHeuristico = 0
    //this.estado = Array(Array())
    this.estado = this.#DeepCopy(estado)
    this.jugador = jugador

    this.#GenerarHijos()
  }

  #DeepCopy(dato) {
    return JSON.parse(JSON.stringify(dato))
  }

  #GenerarHijos() {

    for(let i = 0; i < nuevoEstado.length; i++) {
      for(let j = 0; j < nuevoEstado[i].length; j++) {

        try {
          if ((i + 1 == nuevoEstado.length || nuevoEstado[i+1][j] != '') && nuevoEstado[i][j] == '') {
            let nuevoHijo = this.#DeepCopy(this.estado)
            nuevoHijo[i][j] = this.jugador
            this.hijos.push(nuevoHijo)
          }
        } catch (e) { }
      }
    }
  }
}
{
  // Cuando se quiere llamar a la función minimax junto con los nodos
  let estadoFicticio = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "y", "", "", ""],
    ["", "", "y", "y", "y", "", ""],
  ]
  let nodo = new Nodo(estadoFicticio, 'r')
}

const MiniMax = (nodo, profundidad, MaximizandoJugador) => {
  let jugador = MaximizandoJugador ? "IA" : "J"

  if (profundidad == 0 || nodo.hijos.length == 0) {
    let heuristica =
        Victoria_PosibleVictoria("r", "") -
        Victoria_PosibleVictoria("y", "")
    return heuristica

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