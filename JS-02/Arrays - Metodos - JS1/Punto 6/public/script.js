let numeros = [];
let peliculas = [];
const frutas = ['Manzana', 'Pera', 'Uva', 'Kiwi', 'Banana', 'Anana'];

document.getElementById('formNumeros').addEventListener('submit', function (e) {
    e.preventDefault();
    const num = parseInt(document.getElementById('inputNumero').value);
    numeros.push(num);
    document.getElementById('inputNumero').value = '';
});

document.getElementById('desplegarNumeros').addEventListener('click', () => {
    mostrar('numeros', numeros);
});

document.getElementById('copiarNumeros').addEventListener('click', () => {
    const copia = numeros.slice(0, 3);
    mostrar('numerosResultado', copia);
});

document.getElementById('formPeliculas').addEventListener('submit', function (e) {
    e.preventDefault();
    const pelicula = document.getElementById('inputPelicula').value;
    peliculas.push(pelicula);
    document.getElementById('inputPelicula').value = '';
});

document.getElementById('desplegarAmigos').addEventListener('click', () => {
    mostrar('peliculas', peliculas);
});

document.getElementById('copiarPeliculas').addEventListener('click', () => {
    const copia = peliculas.slice(2, 4);
    mostrar('peliculasResultado', copia);
});

document.getElementById('copiarUltimos').addEventListener('click', () => {
    const copia = frutas.slice(-3);
    mostrar('ultimosResultado', copia);
});

function mostrar(id, array) {
    const div = document.getElementById(id);
    div.innerHTML = array.length
        ? `<ul>${array.map(item => `<li>${item}</li>`).join('')}</ul>`
        : '<p class="text-muted">No hay elementos para mostrar.</p>';
}