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

const columnas_interfaz = [
  document.querySelector(".uno"),
  document.querySelector(".dos"),
  document.querySelector(".tres"),
  document.querySelector(".cuatro"),
  document.querySelector(".cinco"),
  document.querySelector(".seis"),
  document.querySelector(".siete")
]

const columnas_funciones = [
    unoFinJ,
    dosFinJ,
    tresFinJ,
    cuatroFinJ,
    cincoFinJ,
    seisFinJ,
    sieteFinJ
]

var turno           = primeros_turnos_partidas[0]
let movimientos     = 0
let EnJuego         = true
let TableroColsDisp = [6, 6, 6, 6, 6, 6, 6]
let FichasJugador   = 21
let FichasIA        = 21

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

const reiniciarPartida = () => {

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
  setTimeout(FinPorTiempo, 600000);
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

const FinJugador = (columna) => {

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
  console.log("Pasé por IA")

  // await sleep(5)

  //let aleatoria = Aleatorio(0, 6)

  //InsertarFicha("IA", aleatoria)
  {
    let nodoActual = new Nodo(tablero, 'r')
    nodoActual.GenerarHijos()
    let nodoProximo = MiniMax(nodoActual, 2, true)

    let jugada = -1

    for (let i = 0; i < tablero.length; i++) {
      for (let j = 0; j < tablero[i].length; j++) {
        if (tablero[i][j] != nodoProximo.estado[i][j]) {
          jugada = j
          break
        }
      }
      if (jugada != -1) break
    }
    // console.log(nodoProximo)

    InsertarFicha("IA", jugada)
  }

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

  // console.log("___________________________________________________")
  // console.log(NumHorizontales)
  // console.log(NumVerticales)
  // console.log(NumDiagonalNeg)
  // console.log(NumDiagonalPos)

  lineasEncontradas =
      NumHorizontales +
      NumVerticales +
      NumDiagonalNeg +
      NumDiagonalPos
  return lineasEncontradas
}

function PuntuarSituacion(situacion, jugador) {

  function Contar(arreglo, aContar) {
    return arreglo.reduce((total, actual) => {
      return actual == aContar ? total + 1 : total
    })
  }

  let puntaje = 0
  let enemigo = jugador == "y" ? "r" : "y"

  if (Contar(situacion, jugador) == 4) {
    puntaje += 100
  } else if (Contar(situacion, jugador) == 3 && Contar(situacion, "") == 1) {
    puntaje += 5
  } else if (Contar(situacion, jugador) == 2 && Contar(situacion, "") == 2) {
    puntaje += 2
  }

  if (Contar(situacion, enemigo) == 3 && Contar(situacion, "") == 1) {
    puntaje -= 4
  }

}

function PuntuarTablero(tablero, jugador) {

  let puntaje = 0

  //Puntuando toda situación horizontal posible
  for (let fila of tablero) {
    let cantidad = 0;
    for (let celda of fila) {
      cantidad = (celda == jugador || celda == posible) ? cantidad + 1 : 0
      NumHorizontales = cantidad >= numToWin ? NumHorizontales + 1 : NumHorizontales
    }
  }

  for (let fil = 0; fil < tablero.length; fil++) {
    let fila = tablero[fil]
    for (let col = 0; col < tablero.length - numToWin; col++) {

      let situacion = fila.slice(col, col + numToWin)
      score += PuntuarSituacion(situacion, jugador)
    }
  }



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
    if (Victoria_PosibleVictoria(tablero, jugador, jugador) != 0) {
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
    boton.src = "data/images/restock.svg"
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
    this.estado = this.#DeepCopy(estado)
    this.jugador = jugador

    //this.#GenerarHijos()
    //this.HeuristicaEstado()
  }

  #DeepCopy(dato) {
    return JSON.parse(JSON.stringify(dato))
  }

  HeuristicaEstado() {
    let oponente = this.jugador == 'y' ? 'r' : 'y'
    this.ValorHeuristico = this.TresEnRaya(this.jugador) + this.DosEnRaya(this.jugador) -
        (this.TresEnRaya(oponente) + this.DosEnRaya(oponente))
  }

  TresEnRaya(color) {
    const CP = 3 // Cantidad de piezas
    const premio = 10
    let rango = [8, 7, 6, 5, 4, 3]

    let puntosH  = 0 // puntos horizontales         -
    let puntosV  = 0 // puntos verticales           |
    let puntosDN = 0 // puntos diagonales negativos \
    let puntosDP = 0 // puntos diagonales positivos /


    // Buscando diagonales negativos.
    for (let i of rango) {
      let espacios = 0
      let puntos   = 0

      for (let x = 0; x <= 6; x++) {
        let y = 5 - (i - x)

        try {
          if (this.estado[y][x] == color) {
            puntos++

          } else if (this.estado[y][x] == '' && puntos != 0 && espacios < CP - 1) {
            espacios++
          } else {
            espacios = 0
            puntos = 0
          }
        } catch (e) {}
      }
      if (puntos > CP) {
        puntosDN += premio
      } else if (puntos == CP) {
        puntosDN++
      }
    }

    // Buscando diagonales positivos
    rango = [-3, -2, -1, 0, 1, 2]

    for (let i of rango) {
      let espacios = 0
      let puntos   = 0

      for (let x = 0; x <= 6; x++) {
        let y = 5 - (x + i)

        try {
          if (this.estado[y][x] == color) {
            puntos++

          } else if (this.estado[y][x] == '' && puntos != 0 && espacios < CP - 1) {
            espacios++
          } else {
            espacios = 0
            puntos = 0
          }
        } catch (e) {}
      }
      if (puntos > CP) {
        puntosDP += premio
      } else if (puntos == CP) {
        puntosDP++
      }
    }

    // Buscando horizontales
    for (let j = 5; j >= 0; j--) {
      const validos = [color, '']
      let espacios = 0
      let puntos = 0

      for (let i = 0; i < 7; i++) {
        try {
          if (this.estado[j][i] == color) {
            puntos++

          } else if (!validos.includes(this.estado[j][i]) || this.estado[j][i] == '' && j + 1 < 6 && this.estado[j+1][i] == '' || espacios == 2) {
            espacios = 0
            puntos = 0

          } else if (j + 1 < 6 && this.estado[j+1][i] != '' || j == 5 && this.estado[j][i] == '') {
            espacios++
          }
        } catch (e) {}
        if (puntos == CP) {
          puntosH++
          espacios = 0
          puntos = 0
        }
      }
      if (puntos > CP) {
        puntosH += premio
      } else if (puntos == CP) {
        puntosH++
      }
    }
    //console.log(puntosH)

    // Buscando verticales
    for (let i = 0; i < 7; i++) {
      let puntos = 0
      const validos = [color, '']

      for (let j = 5; j >= 0; j--) {
        try {
          if (this.estado[j][i] == color) {
            puntos++

          } else if (!validos.includes(this.estado[j][i])) {
            puntos = 0

          }
        } catch (e) {}
      }
      if (puntos > CP) {
        puntosV += premio
      } else if (puntos == CP) {
        puntosV++
      }
    }

    return 1000 * (puntosDP +
        puntosDN +
        puntosV +
        puntosH)

  }

  DosEnRaya(color) {
    const CP = 2 // Cantidad de piezas
    const premio = 5
    let rango = [8, 7, 6, 5, 4, 3]

    let puntosH  = 0 // puntos horizontales         -
    let puntosV  = 0 // puntos verticales           |
    let puntosDN = 0 // puntos diagonales negativos \
    let puntosDP = 0 // puntos diagonales positivos /


    // Buscando diagonales negativos.
    for (let i of rango) {
      let espacios = 0
      let puntos   = 0

      for (let x = 0; x <= 6; x++) {
        let y = 5 - (i - x)

        try {
          if (this.estado[y][x] == color) {
            puntos++

          } else if (this.estado[y][x] == '' && puntos != 0 && espacios < CP - 1) {
            espacios++
          } else {
            espacios = 0
            puntos = 0
          }
        } catch (e) {}
      }
      if (puntos > CP) {
        puntosDN += premio
      } else if (puntos == CP) {
        puntosDN++
      }
    }

    // Buscando diagonales positivos
    rango = [-3, -2, -1, 0, 1, 2]

    for (let i of rango) {
      let espacios = 0
      let puntos   = 0

      for (let x = 0; x <= 6; x++) {
        let y = 5 - (x + i)

        try {
          if (this.estado[y][x] == color) {
            puntos++

          } else if (this.estado[y][x] == '' && puntos != 0 && espacios < CP - 1) {
            espacios++
          } else {
            espacios = 0
            puntos = 0
          }
        } catch (e) {}
      }
      if (puntos > CP) {
        puntosDP += premio
      } else if (puntos == CP) {
        puntosDP++
      }
    }

    // Buscando horizontales
    for (let j = 5; j >= 0; j--) {
      const validos = [color, '']
      let espacios = 0
      let puntos = 0

      for (let i = 0; i < 7; i++) {
        try {
          if (this.estado[j][i] == color) {
            puntos++

          } else if (!validos.includes(this.estado[j][i]) || this.estado[j][i] == '' && j + 1 < 6 && this.estado[j+1][i] == '' || espacios == 2) {
            espacios = 0
            puntos = 0

          } else if (j + 1 < 6 && this.estado[j+1][i] != '' || j == 5 && this.estado[j][i] == '') {
            espacios++
          }
        } catch (e) {}
        if (puntos == CP) {
          puntosH++
          espacios = 0
          puntos = 0
        }
      }
      if (puntos > CP) {
        puntosH += premio
      } else if (puntos == CP) {
        puntosH++
      }
    }
    //console.log(puntosH)

    // Buscando verticales
    for (let i = 0; i < 7; i++) {
      let puntos = 0
      const validos = [color, '']

      for (let j = 5; j >= 0; j--) {
        try {
          if (this.estado[j][i] == color) {
            puntos++

          } else if (!validos.includes(this.estado[j][i])) {
            puntos = 0

          }
        } catch (e) {}
      }
      if (puntos > CP) {
        puntosV += premio
      } else if (puntos == CP) {
        puntosV++
      }
    }

    return 1000 * (puntosDP +
        puntosDN +
        puntosV +
        puntosH)

  }

  GenerarHijos() {

    for(let i = 0; i < this.estado.length; i++) {
      for(let j = 0; j < this.estado[i].length; j++) {

        try {
          if ((i + 1 == this.estado.length || this.estado[i+1][j] != '') && this.estado[i][j] == '') {
            let nuevoHijo = this.#DeepCopy(this.estado)
            nuevoHijo[i][j] = this.jugador
            this.hijos.push(nuevoHijo)
          }
        } catch (e) { }
      }
    }
  }

  Heuristica() {
    this.HeuristicaEstado()
  }
}

const FakeTablero = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["y", "y", "", "y", "", "", ""],
  ["y", "y", "", "y", "", "y", "y"],
]

const Max = (primero, segundo) => {
  return primero.ValorHeuristico > segundo.ValorHeuristico ? primero : segundo
}
const Min = (primero, segundo) => {
  return primero.ValorHeuristico < segundo.ValorHeuristico ? primero : segundo
}
const MiniMax = (nodo, profundidad, MaximizandoJugador) => {
  let jugador = !MaximizandoJugador ? "IA" : "J"

  if (nodo.hijos.length == 0 || profundidad == 0) {
    nodo.Heuristica()
    return nodo
  }

  let hijos = []
  nodo.GenerarHijos()
  nodo.Heuristica()
  for (let hijo of nodo.hijos) {
    hijos.push(new Nodo(hijo, jugador == "IA" ? 'r' : 'y'))
    hijos[hijos.length - 1].GenerarHijos()
  }

  if (MaximizandoJugador) {

    let nodoMax = new Nodo("", "")
    nodoMax.ValorHeuristico = -Infinito

    for (let hijo of hijos) {
      nodoMax = Max(nodoMax, MiniMax(hijo, profundidad - 1, false))
    }

    return nodoMax

  } else {

    let nodoMin = new Nodo("", "")
    nodoMin.ValorHeuristico = Infinito

    for (let hijo of hijos) {
      nodoMin = Min(nodoMin, MiniMax(hijo, profundidad - 1, true))
    }

    return nodoMin
  }
}