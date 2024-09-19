import {Carta,Tablero } from './model';


const barajarCartas = (cartas : Carta[]): Carta[] => {
    for (let i = cartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));       
        [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    }
    
    return cartas;
  }

//   /*
//   Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
// */
export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
  console.log('Comprobar si se puede volver, índice:', indice);
  console.log(tablero);
    if((tablero.estadoPartida=="CeroCartasLevantadas" || tablero.estadoPartida =="UnaCartaLevantada") 
    && (!tablero.cartas[indice].estaVuelta && !tablero.cartas[indice].encontrada)){
    return true;
   }
   return false;
  }
  
  export const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
    const carta = document.querySelector(`[data-indice-id="${indice}"]`);

    if (carta != null && carta !== undefined && carta instanceof HTMLElement) {     
      carta.classList.toggle('carta_vuelta');      

        if(tablero.estadoPartida = "CeroCartasLevantadas"){ // no está bien, hay que mirar el estado
          tablero.indiceCartaVolteadaA = indice;
        }

        if(tablero.estadoPartida = "UnaCartaLevantada"){ // no está bien, hay que mirar el estado
          tablero.indiceCartaVolteadaB = indice;
        }
        tablero.cartas[indice].estaVuelta =  tablero.cartas[indice].estaVuelta ? true :false;
        console.log('estado',tablero.estadoPartida);
        cambiarEstadoPartida(tablero);
        console.log('estado',tablero.estadoPartida);

    } else {
      console.error(`No se encontró ninguna carta con el índice ${indice}`);
    }
  }

  const cambiarEstadoPartida =(tablero:Tablero)=>{
    switch (tablero.estadoPartida) {
      case "PartidaNoIniciada":
        tablero.estadoPartida = "CeroCartasLevantadas";
        break;
        case "CeroCartasLevantadas":
          tablero.estadoPartida = "UnaCartaLevantada";
          break;
        case "UnaCartaLevantada":
          tablero.estadoPartida = "DosCartasLevantadas";
          break;  
        case "DosCartasLevantadas":
          tablero.estadoPartida = "CeroCartasLevantadas";
          break;   
        case "PartidaCompleta":
          tablero.estadoPartida = "CeroCartasLevantadas";
          break;     
      default:
       console.error(tablero.estadoPartida);
        break;
    }
  }
  
//   /*
//     Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
//   */
  export const sonPareja = (tablero: Tablero): boolean => {
    const indiceA =tablero.indiceCartaVolteadaA;
    const indiceB =tablero.indiceCartaVolteadaB;

    if ((indiceA && indiceA >= 0 && indiceA < tablero.cartas.length) &&
        (indiceB && indiceB >= 0 && indiceB < tablero.cartas.length)
      ) {      
        return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
      } else {
       
        console.error("Índices no se encuentran.");
        return false;
      }
  }
  
  /*
    Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
  */
  export const parejaEncontrada = (tablero: Tablero) : void => {
    const indiceA =tablero.indiceCartaVolteadaA;
    const indiceB =tablero.indiceCartaVolteadaB;
    if ((indiceA && indiceA >= 0 && indiceA < tablero.cartas.length) &&
    (indiceB && indiceB >= 0 && indiceB < tablero.cartas.length)
    ) {      
      tablero.cartas[indiceA].encontrada=true;
      tablero.cartas[indiceB].encontrada=true;
    } else {
    
      console.error("Índices no se encuentran.");
      
    }  

    if(todasCartasVueltas(tablero)){
      tablero.estadoPartida == "PartidaCompleta";
    }
    cambiarEstadoPartida(tablero);
   
  }

  const  todasCartasVueltas=(tablero: Tablero): boolean =>{
    return tablero.cartas.every(carta => carta.estaVuelta);
  }
  
//   /*
//     Aquí asumimos que no son pareja y las volvemos a poner boca abajo
//   */
//   const parejaNoEncontrada = (tablero: Tablero, indiceA :number, indiceB : number) : void => {
//     // ...
//   }
  
//   /*
//     Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
//   */
//   export const esPartidaCompleta(tablero: Tablero) : boolean => {
//     //...
//   }  


  /*
Iniciar partida
*/

export const iniciaPartida = (tablero: Tablero): void => {
  const cartasBarajadas : Carta[] = barajarCartas(tablero.cartas);
  tablero.cartas = [...cartasBarajadas];
  tablero.estadoPartida='CeroCartasLevantadas';

    // pintarTablero();

    // const cartas = document.querySelectorAll('.carta');

    // cartas.forEach((carta) => {
    //   if (carta instanceof HTMLElement) {
    //     carta.addEventListener('click', () => {
    //       const indice = carta.getAttribute('data-indice-id');
          
    //       if (indice !== null) {
    //         if(sePuedeVoltearLaCarta(tablero, parseInt(indice, 10))){
               
    //             voltearLaCarta(tablero,parseInt(indice, 10));
    //         }
    //         else{
    //             console.log("No se puede volver la carta")
    //         };
    //       }
    //     });
    //   }
    // });
}


