import { cartas} from "./model";

export function pintarCartas(): void{

    const contenedorCartas = document.getElementById('contenedor_cartas');

    cartas.forEach(element => {

        const carta = document.createElement('div');
        carta.classList.add('carta');   
        carta.setAttribute('data-indice-id',element.idFoto.toString());

        const imagen = document.createElement('img');
        imagen.src = element.imagen;    
        imagen.setAttribute('data-indice-id', element.idFoto.toString());   
        carta.appendChild(imagen);     
       
        carta.addEventListener('click', () => {
            volverCarta(carta);
        });

        if(contenedorCartas !==null&& contenedorCartas !== undefined && contenedorCartas instanceof HTMLElement){
            contenedorCartas.appendChild(carta);
        }
    
    }); 
     
       
}

function volverCarta (divCarta:HTMLElement): void {

    const carta = divCarta.getAttribute('data-indice-id');
    
    if (carta !== null) { 
      
        divCarta.classList.toggle('carta_vuelta');
       
    }

}