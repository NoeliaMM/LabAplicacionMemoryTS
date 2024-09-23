import { Tablero, tablero } from "./model";

import { iniciaPartida, sePuedeVoltearLaCarta, sonPareja, voltearLaCarta, parejaEncontrada, parejaNoEncontrada } from "./motor";

export const agregarEventoBotonIniciarPartida = () => {

    const btnEmpezarPartida = document.getElementById('iniciarPartida');

    if (btnEmpezarPartida !== null && btnEmpezarPartida !== undefined && btnEmpezarPartida instanceof HTMLButtonElement) {
        btnEmpezarPartida.addEventListener('click', clickBtnEmpezarPartida)
    }
}

export const clickBtnEmpezarPartida = () => {
    iniciaPartida(tablero);
    pintarTablero(tablero);
    tablero.intentos=0;
    actualizarIntentos();
    mostrarOcultarMensajeFin();
}

export const pintarTablero = (tablero: Tablero) => {

    const contenedorCartas = document.getElementById('contenedor_cartas');
    if (contenedorCartas) {
        contenedorCartas.innerHTML = '';  // Elimina todo el contenido anterior
    }
 
    for (let i = 0; i < tablero.cartas.length; i++) {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.setAttribute('data-indice-id', i.toString());

        const imagen = document.createElement('img');
        imagen.src = tablero.cartas[i].imagen;
        imagen.setAttribute('data-indice-imagen', tablero.cartas[i].idFoto.toString());
        carta.appendChild(imagen);

        carta.addEventListener('click', () => { 
      
        const voltearSN:boolean = sePuedeVoltearLaCarta(tablero, i);
            if (voltearSN) {
                voltearLaCarta(tablero, i);
                actualizarIntentos();
            const sonParejaSN :boolean= sonPareja(tablero);
                if (sonParejaSN) {                
   
                    parejaEncontrada(tablero);
                    mostrarOcultarMensajeFin();
                }
                else { 
                    setTimeout(() => {
                        parejaNoEncontrada(tablero);                            
                    }, 1000);                 
                 }
            }           
        });

        if (contenedorCartas !== null && contenedorCartas !== undefined && contenedorCartas instanceof HTMLElement) {
            contenedorCartas.appendChild(carta);
        }
    }

}

export const actualizarIntentos = () => {
    if(tablero.estadoPartida=="DosCartasLevantadas"){
        tablero.intentos++;
    }
        const divIntentos = document.getElementById("intentos");
    
        if(divIntentos !==null && divIntentos !== undefined && divIntentos instanceof HTMLElement){
            divIntentos.innerHTML = `<b>Nº de intentos:</b> ${tablero.intentos}`;
        }
    
};
 const mostrarOcultarMensajeFin=() =>{

    const divMensaje = document.getElementById("mensaje"); 
    if( divMensaje !==null && divMensaje !== undefined && divMensaje instanceof HTMLElement )
        if(tablero.estadoPartida === "PartidaCompleta"){
            divMensaje.style.display='block';
        }else {
            divMensaje.style.display='none';
        }
    }
    


