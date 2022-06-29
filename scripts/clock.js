window.onload = init;

var s, m, h, clock;
var playing = false

function init(){
    document.querySelector(".play").addEventListener("click", cronometrar);
    // document.querySelector(".pause").addEventListener("click", parar);
    // document.querySelector(".restock").addEventListener("click", reiniciar);

    h = 0; // Horas
    m = 0; // Minutos
    s = 0; // Segundos

    document.getElementById("time").innerHTML="00:00:00";
}

function cronometrar() {

    escribir();
    clock = setInterval(escribir,1000);
    
    document.querySelector(".play").removeEventListener("click", cronometrar);
    
    playing = true
    Inicio()

}
function escribir(){
    var hAux, mAux, sAux;
    s++;
    if (s>59){m++;s=0;}
    if (m>59){h++;m=0;}
    if (h>24){h=0;}

    if (s<10){sAux="0"+s;}else{sAux=s;}
    if (m<10){mAux="0"+m;}else{mAux=m;}
    if (h<10){hAux="0"+h;}else{hAux=h;}

    document.getElementById("time").innerHTML = hAux + ":" + mAux + ":" + sAux; 

}