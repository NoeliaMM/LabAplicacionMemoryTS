import { InfoCarta } from './model';


export function barajar(cartas:InfoCarta[]): InfoCarta[] {
    for (let i = cartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));       
        [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    }
    console.log(cartas);
    return cartas;
}
