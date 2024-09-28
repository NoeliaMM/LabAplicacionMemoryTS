

import {esPartidaCompleta, sePuedeVoltearLaCarta, sonPareja} from "./motor";
import { tablero,Tablero } from "./model";

describe("sonPareja", () => {
  it('Debe devolver true si las cartas son iguales', () => {

    const indiceA:number=1;
    const indiceB:number=1;

    const resultado : boolean = sonPareja(tablero,indiceA,indiceB);

    expect(resultado).toBe(true);
   
  });
  it('Debe devolver false si las cartas son diferentes', () => {

    const indiceA:number=1;
    const indiceB:number=2;

    const resultado : boolean = sonPareja(tablero,indiceA,indiceB);

    expect(resultado).toBe(false);
   
  });


});

describe('sePuedeVoltearLaCarta', () => {

  it('Debe permitir voltear la carta si la carta no está vuelta ni encontrada', () => {
    const tablero: Tablero = {
      estadoPartida: 'CeroCartasLevantadas',
      cartas: [
        { idFoto: 1, imagen: 'imagen1.png', estaVuelta: false, encontrada: false },
      ],
      intentos :2
    };

    const resultado = sePuedeVoltearLaCarta(tablero, 0);
    expect(resultado).toBe(true); 
  });

  it('No debe permitir voltear la carta cuando ya está vuelta', () => {
    const tablero: Tablero = {
      estadoPartida: 'CeroCartasLevantadas',
      cartas: [
        { idFoto: 1, imagen: 'imagen1.png', estaVuelta: true, encontrada: true },
      ],
      intentos :2
    };

    const resultado = sePuedeVoltearLaCarta(tablero, 0);
    expect(resultado).toBe(false); 
  });

  it('No debe permitir voltear la carta cuando ya está encontrada, pero no está vuelta', () => {
    const tablero: Tablero = {
      estadoPartida: 'CeroCartasLevantadas',
      cartas: [
        { idFoto: 1, imagen: 'imagen1.png', estaVuelta: false, encontrada: true },
      ],
      intentos :2
    };

    const resultado = sePuedeVoltearLaCarta(tablero, 0);
    expect(resultado).toBe(false); 
  });  
});

describe("esPartidaCompleta", () => {
  it('Debe devolver true  si todas las cartas son encontradas y están vueltas', () => {

  tablero.cartas.map(item=>{
    item.encontrada=true;
    item.estaVuelta=true
  });

    const resultado : boolean = esPartidaCompleta(tablero);

    expect(resultado).toBe(true);
   
  });
  it('Debe devolver true  si alguna carta no está encontrada o no está vuelta', () => {

    tablero.cartas.map(item=>{
      
      item.encontrada=true;
      item.estaVuelta=true
    });
      tablero.cartas[0].encontrada = false;
      const resultado : boolean = esPartidaCompleta(tablero);
  
      expect(resultado).toBe(false);
     
    });
   
  });
