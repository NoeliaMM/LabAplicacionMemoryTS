import { Tablero, tablero } from "./model";

import {
  iniciaPartida,
  sePuedeVoltearLaCarta,
  sonPareja,
  voltearLaCarta,
  parejaEncontrada,
  parejaNoEncontrada,
  esPartidaCompleta,
} from "./motor";

export const agregarEventoBotonIniciarPartida = () => {
  const btnEmpezarPartida = document.getElementById("iniciarPartida");

  if (btnEmpezarPartida !== null && btnEmpezarPartida !== undefined && btnEmpezarPartida instanceof HTMLButtonElement) {
    btnEmpezarPartida.addEventListener("click", clickBtnEmpezarPartida);
  }
};

export const clickBtnEmpezarPartida = () => {
  iniciaPartida(tablero);
  pintarTablero(tablero);
  tablero.intentos = 0;
  actualizarIntentos();
  mostrarOcultarMensajeFin();
};

const manejadorMensaje = (evento: MouseEvent) => {
  const carta = evento.currentTarget;

  if (carta !== null && carta !== undefined && carta instanceof HTMLElement ) {
    
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");

    const mensaje = carta.classList.contains("encontrada") ? "Carta emparejada, no puedes volverla 😉" : 
                    (carta.classList.contains("carta_vuelta") ? "Esta carta está ya vuelta" :'');

    if(mensaje !==''){
      tooltip.textContent = mensaje;
      tooltip.style.position = "absolute";
      tooltip.style.top = `${evento.pageY}px`;
      tooltip.style.left = `${evento.pageX + 10}px`;  
      document.body.appendChild(tooltip);
  
      setTimeout(() => {
        tooltip.remove();
      }, 1000);
    }    
    evento.preventDefault();
  }
};

const efectoEncontrada = (indiceA: number,indiceB:number) => {
  const cartaA = document.querySelector(`[data-indice-id="${indiceA}"]`);
  const cartaB = document.querySelector(`[data-indice-id="${indiceB}"]`);

  if (cartaA != null && cartaA !== undefined && cartaA instanceof HTMLElement
    && cartaB != null && cartaB !== undefined && cartaB instanceof HTMLElement
  ) {
    cartaA.classList.add("encontrada");
    cartaB.classList.add("encontrada");
  }
};

const mapearDivsCartas = (indice:number) : HTMLElement =>{

   const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.setAttribute("data-indice-id", indice.toString());

    const imagen = document.createElement("img");
    imagen.src = tablero.cartas[indice].imagen;
    imagen.setAttribute("data-indice-imagen",tablero.cartas[indice].idFoto.toString()
    );
    carta.appendChild(imagen);  
  
    carta.addEventListener("click", (event) => {
      manejadorDivCarta(indice,event);
      
    });

    return carta;  
}


const manejadorDivCarta = (indice:number,evento:MouseEvent)=>{

  if(sePuedeVoltearLaCarta(tablero,indice)){
    voltearLaCarta(tablero, indice);
    actualizarIntentos();
    mostrarImagenAnimal(indice);   
    mirarSiEsLaSegundaCarta(tablero);    
  }
  else{
    manejadorMensaje(evento);
  }

}
const mirarSiEsLaSegundaCarta =(tablero:Tablero)=>{
  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB; 

  if(indiceA !== undefined && indiceB !== undefined){
    if(sonPareja(tablero,indiceA,indiceB)){
      parejaEncontrada(tablero,indiceA,indiceB);
      efectoEncontrada(indiceA,indiceB);
      if (esPartidaCompleta(tablero)) {
        tablero.estadoPartida = "PartidaCompleta";
        mostrarOcultarMensajeFin();
      }
     
    }else{
      setTimeout(() => {
        parejaNoEncontrada(tablero,indiceA,indiceB);
        ocultarImagenesAnimal(indiceA,indiceB);
       
      }, 1000);
    }
  }
}

const mostrarImagenAnimal =(indice:number)=>{
  const carta = document.querySelector(`[data-indice-id="${indice}"]`);

  if (carta != null && carta !== undefined && carta instanceof HTMLElement) {
    carta.classList.toggle("carta_vuelta");   

  } else {
    console.error(`No se encontró ninguna carta con el índice ${indice}`);
  }
}
const ocultarImagenesAnimal =(indiceA:number,indiceB:number)=>{
    const cartaA = document.querySelector(`[data-indice-id="${indiceA}"]`);
    const cartaB = document.querySelector(`[data-indice-id="${indiceB}"]`);

    if (cartaA != null && cartaA !== undefined && cartaA instanceof HTMLElement) {
      cartaA.classList.toggle("carta_vuelta");
    }
    if (cartaB != null && cartaB !== undefined && cartaB instanceof HTMLElement) {
      cartaB.classList.toggle("carta_vuelta");
    }
}

export const pintarTablero = (tablero: Tablero) => {
  const contenedorCartas = document.getElementById("contenedor_cartas");
  if (contenedorCartas) {
     contenedorCartas.innerHTML = "";
  }

  for (let i = 0; i < tablero.cartas.length; i++) {
      const divCarta = mapearDivsCartas(i);

    if (contenedorCartas !== null && contenedorCartas !== undefined &&contenedorCartas instanceof HTMLElement) {
      contenedorCartas.appendChild(divCarta);
    }    
  }
};

export const actualizarIntentos = () => {
  if (tablero.estadoPartida === "DosCartasLevantadas") {
    tablero.intentos++;
  }
  const divIntentos = document.getElementById("intentos");

  if (divIntentos !== null && divIntentos !== undefined && divIntentos instanceof HTMLElement) {
    divIntentos.innerHTML = `<b>Nº de intentos:</b> ${tablero.intentos}`;
  }
};

const mostrarOcultarMensajeFin = () => {
  const divMensaje = document.getElementById("mensaje");
  if (divMensaje !== null && divMensaje !== undefined && divMensaje instanceof HTMLElement)
    if (tablero.estadoPartida === "PartidaCompleta") {
      divMensaje.style.display = "block";
    } else {
      divMensaje.style.display = "none";
    }
};
