import { cartas,tablero} from "./model";

import { iniciaPartida, sePuedeVoltearLaCarta, sonPareja, voltearLaCarta,parejaEncontrada } from "./motor";

export const agregarEventoBotonIniciarPartida = () => {
 
    const btnEmpezarPartida = document.getElementById('iniciarPartida');

    if(btnEmpezarPartida !== null && btnEmpezarPartida !== undefined && btnEmpezarPartida instanceof HTMLButtonElement ){
        btnEmpezarPartida.addEventListener('click',clickBtnEmpezarPartida)
    }
}

const clickBtnEmpezarPartida =()=>{
    iniciaPartida(tablero);    
}

export function pintarTablero(): void{

    const contenedorCartas = document.getElementById('contenedor_cartas');

    for(let i=0; i < cartas.length;i++){
        const carta = document.createElement('div');
        carta.classList.add('carta');   
        carta.setAttribute('data-indice-id',i.toString());

        const imagen = document.createElement('img');
        imagen.src = cartas[i].imagen;    
        imagen.setAttribute('data-indice-imagen', cartas[i].idFoto.toString());   
        carta.appendChild(imagen);     
       
        carta.addEventListener('click', () => {
            console.log('Carta clickeada, índice:', i);
            let voltearSN = sePuedeVoltearLaCarta(tablero,i);
            if(voltearSN){
                voltearLaCarta(tablero,i);
               
                let sonParejaSN : boolean = sonPareja(tablero);

                if(sonParejaSN){
                    parejaEncontrada(tablero);
                }

                }
            
        });

        if(contenedorCartas !==null&& contenedorCartas !== undefined && contenedorCartas instanceof HTMLElement){
            contenedorCartas.appendChild(carta);
        }
    }      
       
}
