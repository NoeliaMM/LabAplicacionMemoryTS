import { barajar } from './motor';
import {cartas} from './model';

const iniciar = () => {
    barajar(cartas);

};
document.addEventListener("DOMContentLoaded", iniciar);

const carta = document.getElementById('carta');

if (carta !== null &&
    carta !== undefined &&
    carta instanceof HTMLElement
  ) {
   carta.addEventListener('click', () => {
    
    carta.classList.toggle('carta_vuelta');

    setTimeout(() => {
        if (!carta.classList.contains('carta_vuelta')) {          
            carta.style.backgroundColor = "";
            carta.innerHTML = ""; 
        } else {   
            const img = document.createElement("img");
            img.src = 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png';
            carta.style.backgroundColor = "#a4a8ee"; 
            carta.appendChild(img); 
        }
    }, 300); 
});
}