

import {sePuedeVoltearLaCarta, sonPareja} from "./motor";
import { tablero,Tablero } from "./model";

describe("sonPareja", () => {
  it('Debería devolver true si las cartas son iguales', () => {

    tablero.indiceCartaVolteadaA =  1;
    tablero.indiceCartaVolteadaB =  1;

    const resultado : boolean = sonPareja(tablero);

    expect(resultado).toBe(true);
   
  });
  it('Debería devolver false si las cartas son diferentes', () => {

    tablero.indiceCartaVolteadaA =  1;
    tablero.indiceCartaVolteadaB =  2;

    const resultado : boolean = sonPareja(tablero);

    expect(resultado).toBe(false);
   
  });


});

describe('sePuedeVoltearLaCarta', () => {

  it('debería permitir voltear la carta cuando el estado es "CeroCartasLevantadas" y la carta no está vuelta ni encontrada', () => {
    const tablero: Tablero = {
      estadoPartida: 'CeroCartasLevantadas',
      cartas: [
        { idFoto: 1, imagen: 'imagen1.png', estaVuelta: false, encontrada: false },
      ],
      intentos :2
    };

    const resultado = sePuedeVoltearLaCarta(tablero, 0);
    expect(resultado).toBe(true); // Debería ser true porque se puede voltear
  });

  it('no debería permitir voltear la carta cuando ya está vuelta', () => {
    const tablero: Tablero = {
      estadoPartida: 'CeroCartasLevantadas',
      cartas: [
        { idFoto: 1, imagen: 'imagen1.png', estaVuelta: true, encontrada: false },
      ],
      intentos :2
    };

    const resultado = sePuedeVoltearLaCarta(tablero, 0);
    expect(resultado).toBe(false); // No se puede voltear porque ya está vuelta
  });

  it('no debería permitir voltear la carta cuando ya está encontrada', () => {
    const tablero: Tablero = {
      estadoPartida: 'CeroCartasLevantadas',
      cartas: [
        { idFoto: 1, imagen: 'imagen1.png', estaVuelta: false, encontrada: true },
      ],
      intentos :2
    };

    const resultado = sePuedeVoltearLaCarta(tablero, 0);
    expect(resultado).toBe(false); // No se puede voltear porque ya está encontrada
  });

  it('debería permitir voltear la carta cuando el estado es "UnaCartaLevantada"', () => {
    const tablero: Tablero = {
      estadoPartida: 'UnaCartaLevantada',
      cartas: [
        { idFoto: 1, imagen: 'imagen1.png', estaVuelta: false, encontrada: false },
      ],
      intentos :2
    };

    const resultado = sePuedeVoltearLaCarta(tablero, 0);
    expect(resultado).toBe(true); // Debería ser true porque se puede voltear
  });

  it('no debería permitir voltear la carta si el estado es diferente de "CeroCartasLevantadas" o "UnaCartaLevantada"', () => {
    const tablero: Tablero = {
      estadoPartida: 'DosCartasLevantadas',
      cartas: [
        { idFoto: 1, imagen: 'imagen1.png', estaVuelta: false, encontrada: false },
      ],
      intentos :2
    };

    const resultado = sePuedeVoltearLaCarta(tablero, 0);
    expect(resultado).toBe(false); // No se puede voltear porque el estado no es correcto
  });
});
