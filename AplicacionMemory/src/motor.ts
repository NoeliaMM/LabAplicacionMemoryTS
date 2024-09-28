import {
  Carta,
  Tablero,
  infoCartas,
  crearColeccionDeCartasInicial,
} from "./model";

const barajarCartas = (cartas: Carta[]): Carta[] => {
  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [{...cartas[i]},{...cartas[j]}] = [cartas[j], cartas[i]];
  }
  return cartas;
};

/*
  Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
*/
export const sePuedeVoltearLaCarta = (  tablero: Tablero,  indice: number): boolean => {

  return !tablero.cartas[indice].estaVuelta &&  !tablero.cartas[indice].encontrada;
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => { 

  switch (tablero.estadoPartida) {
    case "CeroCartasLevantadas":
      tablero.indiceCartaVolteadaA = indice;
      tablero.estadoPartida = "UnaCartaLevantada";
      break;
      
    case "UnaCartaLevantada":
      tablero.indiceCartaVolteadaB = indice;
      tablero.estadoPartida = "DosCartasLevantadas";
      break;
  }

    tablero.cartas[indice].estaVuelta = true;
};

//   /*
//     Dos cartas son pareja si en el array de tablero de canda una tienen el mismo id
//   */
export const sonPareja = (tablero: Tablero,indiceA : number,indiceB:number): boolean => {

    return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;  
};

/*
  Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
*/
export const parejaEncontrada = (tablero: Tablero,indiceA:number, indiceB:number): void => {

    tablero.cartas[indiceA].encontrada = true;
    tablero.cartas[indiceB].encontrada = true;
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
    tablero.estadoPartida="CeroCartasLevantadas";

};

//   /*
//     Aquí asumimos que no son pareja y las volvemos a poner boca abajo
//   */
export const parejaNoEncontrada = (tablero: Tablero,indiceA:number, indiceB:number): void => {

    tablero.cartas[indiceA].encontrada = false;
    tablero.cartas[indiceB].encontrada = false;
    tablero.cartas[indiceA].estaVuelta = false;
    tablero.cartas[indiceB].estaVuelta = false;
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
  
    tablero.estadoPartida="CeroCartasLevantadas";
  
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.estaVuelta && carta.encontrada);
};

/*
Iniciar partida
*/
export const iniciaPartida = (tablero: Tablero): void => {
  const cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);
  const cartasBarajadas: Carta[] = barajarCartas(cartas);
  tablero.cartas = [...cartasBarajadas];
  tablero.estadoPartida = "CeroCartasLevantadas";
};
