const tiempo = require('./tiempo.js');
const calculo = require('./calculo.js');

console.log("Fecha actual:", tiempo.fechaActual());
console.log("Hora actual:", tiempo.tiempoActual());

console.log("5 + 3 =", calculo.suma(5, 3));
console.log("4 * 7 =", calculo.multiplicar(4, 7));