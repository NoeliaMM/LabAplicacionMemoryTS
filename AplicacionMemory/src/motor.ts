import { Carta, Tablero,infoCartas,crearColeccionDeCartasInicial } from './model';
// import { pintarTablero} from './ui';


const barajarCartas = (cartas: Carta[]): Carta[] => {
  for (let i = cartas.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }
  return cartas;
}

//   /*
//   Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
// */
export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  console.log('Comprobar si se puede volver, índice:', indice);
  console.log(tablero.cartas);
  if ((tablero.estadoPartida == "CeroCartasLevantadas" || tablero.estadoPartida == "UnaCartaLevantada")
    && (!tablero.cartas[indice].estaVuelta && !tablero.cartas[indice].encontrada)) {
    return true;
  }
  return false;
}

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  const carta = document.querySelector(`[data-indice-id="${indice}"]`);  

  if (carta != null && carta !== undefined && carta instanceof HTMLElement) {
    carta.classList.toggle('carta_vuelta');
  
    if(tablero.estadoPartida === "CeroCartasLevantadas"){ 
      tablero.indiceCartaVolteadaA = indice;
    }

    if(tablero.estadoPartida === "UnaCartaLevantada"){ 
      tablero.indiceCartaVolteadaB = indice;
    }
  
    tablero.cartas[indice] = {
      ...tablero.cartas[indice],  
      estaVuelta: true           
    };
    cambiarEstadoPartida(tablero);

  } else {
    console.error(`No se encontró ninguna carta con el índice ${indice}`);
  }
}

const cambiarEstadoPartida = (tablero: Tablero) => {
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
      break;
   
  }
}

//   /*
//     Dos cartas son pareja si en el array de tablero de canda una tienen el mismo id
//   */
export const sonPareja = (tablero: Tablero): boolean => {
  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB;

  if ((indiceA !== undefined && indiceA >= 0 && indiceA < tablero.cartas.length) &&
    (indiceB !== undefined && indiceB >= 0 && indiceB < tablero.cartas.length)
  ) {
    return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
  } else {
    return false;
  }
}
const efectoEncontrada = (indice:number) => {
  const carta = document.querySelector(`[data-indice-id="${indice}"]`);

  if (carta != null && carta !== undefined && carta instanceof HTMLElement) {
    carta.classList.add('encontrada');  
  } 
};
/*
  Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
*/
export const parejaEncontrada = (tablero: Tablero): void => {
  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB;
  console.log(tablero);

  if ((indiceA !== undefined && indiceA >= 0 && indiceA < tablero.cartas.length) &&
    (indiceB !== undefined && indiceB >= 0 && indiceB < tablero.cartas.length)
  ) {
    tablero.cartas[indiceA].encontrada = true;
    tablero.cartas[indiceB].encontrada = true;
    efectoEncontrada(indiceA);
    efectoEncontrada(indiceB);
  }

  if (esPartidaCompleta(tablero)) {
    tablero.estadoPartida == "PartidaCompleta";
  }
  cambiarEstadoPartida(tablero);

}

//   /*
//     Aquí asumimos que no son pareja y las volvemos a poner boca abajo
//   */
export const parejaNoEncontrada = (tablero: Tablero): void => {
  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB;
  if (tablero.estadoPartida === "DosCartasLevantadas" && (indiceA !== undefined && indiceA >= 0 && indiceA < tablero.cartas.length) &&
    (indiceB !== undefined && indiceB >= 0 && indiceB < tablero.cartas.length)
  ) {  
    const cartaA = document.querySelector(`[data-indice-id="${indiceA}"]`);
    const cartaB = document.querySelector(`[data-indice-id="${indiceB}"]`);

    if (cartaA != null && cartaA !== undefined && cartaA instanceof HTMLElement) {
      cartaA.classList.toggle('carta_vuelta');
    }
    if (cartaB != null && cartaB !== undefined && cartaB instanceof HTMLElement) {
      cartaB.classList.toggle('carta_vuelta');
    }

    tablero.cartas[indiceA].encontrada = false;
    tablero.cartas[indiceB].encontrada = false;
    tablero.cartas[indiceA].estaVuelta = false;
    tablero.cartas[indiceB].estaVuelta = false;
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;   

    cambiarEstadoPartida(tablero);
  }
}

const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every(carta => carta.estaVuelta);
}

/*
Iniciar partida
*/
export const iniciaPartida = (tablero: Tablero): void => {  
  const cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);
  const cartasBarajadas: Carta[] = barajarCartas(cartas);
  tablero.cartas = [...cartasBarajadas];
  tablero.estadoPartida = 'CeroCartasLevantadas';
}



