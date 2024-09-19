import { barajar } from './motor';
import {cartas} from './model';

const iniciar = () => {
    barajar(cartas);

};
document.addEventListener("DOMContentLoaded", iniciar);