import { suma, resta, multiplicacion, division } from './Script4-1.js';

document.addEventListener('DOMContentLoaded', function () {
    const r1 = document.getElementById("suma");
    const r2 = document.getElementById("resta");
    const r3 = document.getElementById("multiplicacion");
    const r4 = document.getElementById("division");

    r1.innerText = suma(5, 3);
    r2.innerText = resta(5, 3);
    r3.innerText = multiplicacion(5, 3);
    r4.innerText = division(5, 3);
});