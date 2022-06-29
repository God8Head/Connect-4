"use strict"

const Infinito = Number.MAX_SAFE_INTEGER
let primeros_turnos_partidas = ["J", "IA", "J"]

let time_interfaz        = document.getElementById("time")
let movimientos_interfaz = document.getElementById("moves")
let turno_interfaz       = document.getElementById("turno")
const boton              = document.getElementById("boton")

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
const numToWin            = 4

let GameScore             = 100000
let ArregloGanador        =  []

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

var tablero = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
]

var numnodos = 0

const TablaHauristica = [
  [3, 4, 5,  7,  5,  4, 3],
  [4, 6, 8,  10, 8,  6, 4],
  [5, 8, 11, 13, 11, 8, 5],
  [5, 8, 11, 13, 11, 8, 5],
  [4, 6, 8,  10, 8,  6, 4],
  [3, 4, 5,  7,  5,  4, 3],
]

var reiniciarPartida = () => {

  let time = 0
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

let cantTurnos = 0

async function Juego() {
  if (turno == "J") {
    InicioJugador()

    cantTurnos++
    movimientos_interfaz.textContent = cantTurnos

  } else {
    await TurnoAlphaBeta()
    //await TurnoMinimax()
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

async function TurnoMinimax() {
  turno_interfaz.className = "turnor"

  await sleep(150)

  var jugada = Maximizar(tablero, 5)[0]

  var fila = TopeColumna(tablero, jugada)
  InsertarFicha("IA", jugada)
  Verificar()

}

async function TurnoAlphaBeta() {
  turno_interfaz.className = "turnor"

  await sleep(150)

  var jugada = Alphalizar(tablero, 5, -1000000000, 1000000000)[0]

  var fila = TopeColumna(tablero, jugada)
  InsertarFicha("IA", jugada)
  Verificar()

}

function InsertarFicha(turno, columna) {

  if (columna >= 7 || columna < 0 || TableroColsDisp[columna] < 1) return

  TableroColsDisp[columna] -= 1

  let altura_ultima_ficha = -1

  altura_ultima_ficha = TopeColumna(tablero, columna)

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

function Victoria_PosibleVictoria(tablero, jugador, posible) {

  let table = DeepCopy(tablero)

  const numToWin = 4
  let lineasEncontradas = 0

  //Búscando líneas de 4 horizontales
  let NumHorizontales = 0

  for (let fila of table) {

    let cantidad = 0;
    for (let celda of fila) {
      cantidad = (celda == jugador || celda == posible) ? cantidad + 1 : 0
      NumHorizontales = cantidad >= numToWin ? NumHorizontales + 1 : NumHorizontales
    }
  }

  //Buscando lineas de 4 verticales
  let NumVerticales = 0

  for (let col = 0; col < table[0].length; col++) {
    let cantidad = 0;
    for (let fil = 0; fil < table.length; fil++) {
      cantidad = (table[fil][col] == jugador ||
          table[fil][col] == posible) ? cantidad + 1 : 0
      NumVerticales = cantidad >= numToWin ? NumVerticales + 1 : NumVerticales
    }
  }

  //Buscando líneaas de 4 diagonales de pendiente negativa
  let NumDiagonalNeg = 0

  for (let fil = 0; fil <= table.length - numToWin; fil++) {
    for (let col = 0; col <= table[0].length - numToWin; col++) {

      let cantidad = 0
      for (let posLinea = 0; posLinea < numToWin; posLinea++) {
        cantidad = (table[fil + posLinea][col + posLinea] == jugador ||
            table[fil + posLinea][col + posLinea] == posible) ? cantidad + 1 : 0
        NumDiagonalNeg += cantidad >= numToWin ? 1 : 0
      }
    }
  }

  //Buscando líneas de 4 diagonales de pendiente positiva
  let NumDiagonalPos = 0

  for (let fil = table.length - 1; fil >= numToWin - 1; fil--) {
    for (let col = 0; col <= table[0].length - numToWin; col++) {

      let cantidad = 0
      for (let posLinea = 0; posLinea < numToWin; posLinea++) {
        cantidad = (table[fil - posLinea][col + posLinea] == jugador ||
            table[fil - posLinea][col + posLinea] == posible) ? cantidad + 1 : 0
        NumDiagonalPos += cantidad >= numToWin ? 1 : 0
      }
    }
  }

  lineasEncontradas =
      NumHorizontales +
      NumVerticales +
      NumDiagonalNeg +
      NumDiagonalPos
  return lineasEncontradas
}

function Verificar() {

  let estado = ""
  let EnJuego = true
  let SinFichas = false

  // Si te quedas sin fichas
  if (FichasIA <= 0 && FichasJugador <= 0) {SinFichas = true}

  //Si existe alguna línea de 4 fichas, se acabó el juego
  let jugadores = ["y", "r"]
  let HayCuatroLineas = false
  jugadores.forEach((jugador) => {

    if ( Victoria_PosibleVictoria(tablero, jugador, jugador) ) {
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

// Revisión pendiente
function DeepCopy(tablero) {
  var nuevo_tablero = new Array();
  for (var i = 0; i < tablero.length; i++) {
    nuevo_tablero.push(tablero[i].slice());
  }
  return nuevo_tablero
}

//Check
function PuntuarSituacion(tablero, fila, columna, dir_x, dir_y) {
  var table = DeepCopy(tablero)
  var Puntos_J = 0
  var Puntos_IA = 0

  for (let i = 0; i < 4; i++) {
    if ( table[ fila ][ columna ] == "y" ) {
      Puntos_J = Puntos_J + 1
    } else if ( table[ fila ][ columna ] == "r" ) {
      Puntos_IA = Puntos_IA + 1
    }
    fila += dir_x
    columna += dir_y
  }

  if ( Puntos_J == 4 ) {
    return -GameScore
  } else if ( Puntos_IA == 4 ) {
    return GameScore
  } else {
    return Puntos_IA - Puntos_J
  }
}
//Check
function PuntuarTablero(tablero) {

  var table = DeepCopy(tablero)

  var puntaje = 0

  var puntos_verticales = 0
  var puntos_horizontales = 0
  var puntos_diagonales_1 = 0
  var puntos_diagonales_2 = 0

  var puntuacion = 0

  //Puntuando toda situación vertical
  for (var fila = 0; fila < table.length - 3; fila++) {
    for (var columna = 0; columna < table[0].length; columna++) {

      puntuacion = PuntuarSituacion(table, fila, columna, 1, 0)
      //console.log("fila: " + fila + " --- " + "columna: " + columna)
      //console.log(puntuacion)
      if ( puntuacion == GameScore ) { return GameScore }
      if ( puntuacion == -GameScore) { return -GameScore }
      puntos_verticales += puntuacion

    }
  }

  //Puntuando toda situación horizontal
  for (var fila = 0; fila < table.length; fila++) {
    for (var columna = 0; columna < table[0].length - 3; columna++) {

      puntuacion = PuntuarSituacion(table, fila, columna, 0, 1)
      //console.log("fila: " + fila + " --- " + "columna: " + columna)
      //console.log(puntuacion)
      if ( puntuacion == GameScore ) { return GameScore }
      if ( puntuacion == -GameScore) { return -GameScore }
      puntos_horizontales += puntuacion

    }
  }

  //Puntuando toda situacion diagonal negativa posible
  for (var fila = 0; fila < table.length - 3; fila++) {
    for (var columna = 0; columna < table[0].length - 3; columna++) {

      puntuacion = PuntuarSituacion(table, fila, columna, 1, 1)
      //console.log("fila: " + fila + " --- " + "columna: " + columna)
      //console.log(puntuacion)
      if ( puntuacion == GameScore ) { return GameScore }
      if ( puntuacion == -GameScore) { return -GameScore }
      puntos_diagonales_1 += puntuacion

    }
  }

  //Puntuando toda situacion positiva posible
  for (var fila = 3; fila < table.length; fila++) {
    for (var columna = 0; columna < table[0].length - 3; columna++) {

      puntuacion = PuntuarSituacion(table, fila, columna, -1, +1)
      //console.log("fila: " + fila + " --- " + "columna: " + columna)
      //console.log(puntuacion)
      if ( puntuacion == GameScore ) { return GameScore }
      if ( puntuacion == -GameScore) { return -GameScore }
      puntos_diagonales_2 += puntuacion

    }
  }

  puntaje = puntos_horizontales +
            puntos_verticales +
            puntos_diagonales_1 +
            puntos_diagonales_2

  return puntaje
}

function TopeColumna(tablero, posibleJugada) {

  let table = DeepCopy(tablero)

  for (let fila = table.length - 1; fila >= 0; fila--) {
    if ( table[fila][posibleJugada] == "" ) {
      return fila
    }
  }
}

function TableroLleno(tablero) {

  let table = DeepCopy(tablero)

  for (let i = 0; i < table[0].length; i++) {
    if (table[0][i] == "") {return false}
  }
  return true
}

function Intento(tablero, columna, jugador) {

  let tabla = DeepCopy(tablero)

  if ( tabla[0][columna] == "" && columna >= 0 && columna < tabla[0].length ) {

    for (let y = tabla.length - 1; y >= 0; y--) {

      if ( tabla[y][columna] == "" ) {
        tabla[y][columna] = jugador
        break
      }
    }

    return [true, tabla]
  } else {
    return [false, tabla]
  }

}

function TableroTerminado(tablero, profundidad, puntuar) {

  let table = DeepCopy(tablero)

  return  profundidad == 0 ||
          puntuar == GameScore ||
          puntuar == -GameScore ||
          TableroLleno(table)
}

function Minimizar(tablero, profundidad) {

  let table = DeepCopy(tablero)

  var puntuar = PuntuarTablero(table)

  if ( TableroTerminado(table, profundidad, puntuar) ) {
    return [null, puntuar]
  }

  var min = [null, 99999]

  for (let columna = 0; columna < table[0].length; columna++) {

    let nuevo_tablero = DeepCopy(table)

    let Buen_Intento = Intento(nuevo_tablero, columna, "y" )

    if ( Buen_Intento[0] ) {

      let jugada = Maximizar(Buen_Intento[1], profundidad - 1)

      if ( min[0] == null || jugada[1] < min[1] ) {
        min[0] = columna
        min[1] = jugada.slice(1,2)[0]
      }
    }
  }

  return min
}

function Betalizar(tablero, profundidad, alpha, beta) {

  let table = DeepCopy(tablero)

  var puntuar = PuntuarTablero(table)

  if ( TableroTerminado(table, profundidad, puntuar) ) {
    return [null, puntuar]
  }

  var min = [null, 99999]

  for (let columna = 0; columna < table[0].length; columna++) {

    let nuevo_tablero = DeepCopy(table)

    let Buen_Intento = Intento(nuevo_tablero, columna, "y" )

    if ( Buen_Intento[0] ) {

      let jugada = Alphalizar(Buen_Intento[1], profundidad - 1, alpha, beta)

      if ( min[0] == null || jugada[1] < min[1] ) {
        min[0] = columna
        min[1] = jugada.slice(1,2)[0]
        beta = jugada.slice(1,2)[0]
      }

      if ( alpha >= beta ) {return min}
    }
  }

  return min
}

function Maximizar(tablero, profundidad) {

  let table = DeepCopy(tablero)

  var puntuar = PuntuarTablero(table)

  if ( TableroTerminado(table, profundidad, puntuar) ) {
    return [null, puntuar]
  }

  var max = [null, -99999]

  for (let columna = 0; columna < table[0].length; columna++) {

    let nuevo_tablero = DeepCopy(table)

    let Buen_Intento = Intento(nuevo_tablero, columna, "r" )

    if ( Buen_Intento[0] ) {

      let jugada = Minimizar(Buen_Intento[1], profundidad - 1)

      if ( max[0] == null || jugada[1] > max[1] ) {
        max[0] = columna
        max[1] = jugada.slice(1,2)[0]
      }
    }
  }

  return max
}

function Alphalizar(tablero, profundidad, alpha, beta) {

  let table = DeepCopy(tablero)

  var puntuar = PuntuarTablero(table)

  if ( TableroTerminado(table, profundidad, puntuar) ) {
    return [null, puntuar]
  }

  var max = [null, -99999]

  for (let columna = 0; columna < table[0].length; columna++) {

    let nuevo_tablero = DeepCopy(table)

    let Buen_Intento = Intento(nuevo_tablero, columna, "r" )

    if ( Buen_Intento[0] ) {

      let jugada = Betalizar(Buen_Intento[1], profundidad - 1, alpha, beta)

      if ( max[0] == null || jugada[1] > max[1] ) {
        max[0] = columna
        max[1] = jugada.slice(1,2)[0]
        alpha = jugada.slice(1,2)[0]
      }

      if ( alpha >= beta ) {return max}
    }
  }

  return max
}

