const resultado = require('./Script4-1.js');

document.addEventListener('DOMContentLoaded', function () {
    const resultado1 = document.getElementById("suma");
    const resultado2 = document.getElementById("resta");
    const resultado3 = document.getElementById("multiplicacion");
    const resultado4 = document.getElementById("division");

    resultado1.innerText = resultado.suma(5, 3);
    resultado2.innerText = resultado.resta(5, 3);
    resultado3.innerText = resultado.multiplicacion(5, 3);
    resultado4.innerText = resultado.division(5, 3);
});