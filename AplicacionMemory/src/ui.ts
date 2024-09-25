import { Tablero, tablero } from "./model";

import {
  iniciaPartida,
  sePuedeVoltearLaCarta,
  sonPareja,
  voltearLaCarta,
  parejaEncontrada,
  parejaNoEncontrada,
} from "./motor";

export const agregarEventoBotonIniciarPartida = () => {
  const btnEmpezarPartida = document.getElementById("iniciarPartida");

  if (
    btnEmpezarPartida !== null &&
    btnEmpezarPartida !== undefined &&
    btnEmpezarPartida instanceof HTMLButtonElement
  ) {
    btnEmpezarPartida.addEventListener("click", clickBtnEmpezarPartida);
  }
};

export const clickBtnEmpezarPartida = () => {
  iniciaPartida(tablero);
  pintarTablero(tablero);
  tablero.intentos = 0;
  actualizarIntentos();
  mostrarOcultarMensajeFin();
};

const mostrarMensaje = (evento: MouseEvent) => {
  const carta = evento.currentTarget;
  if (carta !== null && carta !== undefined && carta instanceof HTMLElement && carta.classList.contains("encontrada")) {
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.textContent = "Carta emparejada, no puedes volverla 😉";

    tooltip.style.position = "absolute";
    tooltip.style.top = `${evento.pageY}px`;
    tooltip.style.left = `${evento.pageX + 10}px`;

    document.body.appendChild(tooltip);

    setTimeout(() => {
      tooltip.remove();
    }, 2000);

    evento.preventDefault();
  }
};

export const pintarTablero = (tablero: Tablero) => {
  const contenedorCartas = document.getElementById("contenedor_cartas");
  if (contenedorCartas) {
    contenedorCartas.innerHTML = "";
  }

  for (let i = 0; i < tablero.cartas.length; i++) {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.setAttribute("data-indice-id", i.toString());

    const imagen = document.createElement("img");
    imagen.src = tablero.cartas[i].imagen;
    imagen.setAttribute(
      "data-indice-imagen",
      tablero.cartas[i].idFoto.toString()
    );
    carta.appendChild(imagen);

    carta.addEventListener("click", (event) => {
      mostrarMensaje(event);

      const voltearSN: boolean = sePuedeVoltearLaCarta(tablero, i);
      if (voltearSN) {
        voltearLaCarta(tablero, i);
        actualizarIntentos();
        const sonParejaSN: boolean = sonPareja(tablero);
        if (sonParejaSN) {
          parejaEncontrada(tablero);
          mostrarOcultarMensajeFin();
        } else {
          setTimeout(() => {
            parejaNoEncontrada(tablero);
          }, 1000);
        }
      }
    });

    if (
      contenedorCartas !== null &&
      contenedorCartas !== undefined &&
      contenedorCartas instanceof HTMLElement
    ) {
      contenedorCartas.appendChild(carta);
    }
  }
};

export const actualizarIntentos = () => {
  if (tablero.estadoPartida == "DosCartasLevantadas") {
    tablero.intentos++;
  }
  const divIntentos = document.getElementById("intentos");

  if (
    divIntentos !== null &&
    divIntentos !== undefined &&
    divIntentos instanceof HTMLElement
  ) {
    divIntentos.innerHTML = `<b>Nº de intentos:</b> ${tablero.intentos}`;
  }
};
const mostrarOcultarMensajeFin = () => {
  const divMensaje = document.getElementById("mensaje");
  if (
    divMensaje !== null &&
    divMensaje !== undefined &&
    divMensaje instanceof HTMLElement
  )
    if (tablero.estadoPartida === "PartidaCompleta") {
      divMensaje.style.display = "block";
    } else {
      divMensaje.style.display = "none";
    }
};
