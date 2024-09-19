
export function pintarCartas(): void{

    const contenedorCartas = document.getElementById('contenedor_cartas');

    for (let i = 0; i < 2; i++) {
      
        const carta = document.createElement('div');
        carta.classList.add('carta');       

        carta.addEventListener('click', () => {
    
            carta.classList.toggle('carta_vuelta');
        
            setTimeout(() => {
                if (!carta.classList.contains('carta_vuelta')) {          
                    carta.style.backgroundColor = "";
                    carta.innerHTML = ""; 
                } else {   
                    const img = document.createElement("img");
                    img.src =`https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/${i+1}.png`;
                    carta.style.backgroundColor = "#a4a8ee"; 
                    carta.appendChild(img); 
                }
            }, 300); 
        });    

        if(contenedorCartas !==null&& contenedorCartas !== undefined && contenedorCartas instanceof HTMLElement){
            contenedorCartas.appendChild(carta);
        }
    }
}