const letras = ['A', 'B', 'C', 'D', 'E'];
const nombres = [];
const colores = [];

document.getElementById('eliminarLetras').addEventListener('click', () => {
  letras.splice(1, 2);
  mostrar('letrasResultado', letras);
});

document.getElementById('formNombre').addEventListener('submit', e => {
  e.preventDefault();
  const nuevo = document.getElementById('inputNombre').value;
  nombres.splice(1, 0, nuevo);
  document.getElementById('inputNombre').value = '';
  mostrar('nombresResultado', nombres);
});

document.getElementById('formReemplazo').addEventListener('submit', e => {
  e.preventDefault();
  const nuevo1 = document.getElementById('nuevo1').value;
  const nuevo2 = document.getElementById('nuevo2').value;
  const posicion = parseInt(document.getElementById('posicion').value);

  if (posicion >= 0 && posicion < colores.length) {
    colores.splice(posicion, 2, nuevo1, nuevo2);
  }

  document.getElementById('formReemplazo').reset();
  mostrar('coloresResultado', colores);
});

function mostrar(id, array) {
  const div = document.getElementById(id);
  div.innerHTML = array.length
    ? `<ul>${array.map(e => `<li>${e}</li>`).join('')}</ul>`
    : '<p class="text-muted">Arreglo vacío.</p>';
}