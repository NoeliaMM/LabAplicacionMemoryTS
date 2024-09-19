
export function pintarCartas(): void{

    const contenedorCartas = document.getElementById('contenedor_cartas');

    for (let i = 0; i < 12; i++) {
      
        const carta = document.createElement('div');
        carta.classList.add('carta');

        if(contenedorCartas !==null&& contenedorCartas !== undefined && contenedorCartas instanceof HTMLElement){
            contenedorCartas.appendChild(carta);
        }
    }
}