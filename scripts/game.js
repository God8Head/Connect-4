// Turno del Jugador

// Turno del pc, que sea una función ejecutable desde a fuera

// Un iniciador que determine el algoritmo a ejecutarse

// Un redireccionador que intercambie turnos

// Manejar retroalimentaciones en pantalla y compartir variables entre algoritmos

// Esto es un comentario prueba en el que intento pasarme de líneas para ver el cambio en la pantalla: procedo a AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

// Obtener variables que se necesitan manejar acá

let primeros_turnos_partidas = ["J", "IA", "J"]

let PartidosIA_interfaz   = document.getElementById("PartidosIA");
let PartidosJ_interfaz    = document.getElementById("PartidosJ");
let time_interfaz         = document.getElementById("time")
let movimientos_interfaz  = document.getElementById("moves")

let uno = document.querySelector(".uno");
let dos = document.querySelector(".dos");
let tres = document.querySelector(".tres");
let cuatro = document.querySelector(".cuatro");
let cinco = document.querySelector(".cinco");
let seis = document.querySelector(".seis");
let siete = document.querySelector(".siete");

let turno                 = primeros_turnos_partidas[0]
let time                  = 0
let movimientos           = 0
let EnJuego               = 0

let tablero_interfaz = [
  [document.getElementById("a1"), document.getElementById("a2"), document.getElementById("a3"), document.getElementById("a4"), document.getElementById("a5"), document.getElementById("a6"), document.getElementById("a7")],
  [document.getElementById("b1"), document.getElementById("b2"), document.getElementById("b3"), document.getElementById("b4"), document.getElementById("b5"), document.getElementById("b6"), document.getElementById("b7")],
  [document.getElementById("c1"), document.getElementById("c2"), document.getElementById("c3"), document.getElementById("c4"), document.getElementById("c5"), document.getElementById("c6"), document.getElementById("c7")],
  [document.getElementById("d1"), document.getElementById("d2"), document.getElementById("d3"), document.getElementById("d4"), document.getElementById("d5"), document.getElementById("d6"), document.getElementById("d7")],
  [document.getElementById("e1"), document.getElementById("e2"), document.getElementById("e3"), document.getElementById("e4"), document.getElementById("e5"), document.getElementById("e6"), document.getElementById("e7")],
  [document.getElementById("f1"), document.getElementById("f2"), document.getElementById("f3"), document.getElementById("f4"), document.getElementById("f5"), document.getElementById("f6"), document.getElementById("f7")],
]

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

var Juego = (tablero) => {
  
  while (EnJuego) {

    turno = turno == "J" ? "IA" : "J"

    tablero = turno == "J" ? TurnoJugador(tablero) : TurnoIA(tablero)
  
    EnJuego = verificar(tablero)

  }

}

var TurnoJugador = (tablero) => {

  uno.addEventListener(   JugadaJ(1))
  dos.addEventListener(   JugadaJ(1))
  tres.addEventListener(   JugadaJ(1))
  cuatro.addEventListener(JugadaJ(1))
  cinco.addEventListener( JugadaJ(1))
  seis.addEventListener(JugadaJ(1))

}

var TurnoIA = (tablero) => {

}

var Verificar = (tablero) => {

}



