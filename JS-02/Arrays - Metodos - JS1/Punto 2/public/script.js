const animales = [];
const productos = [];
const numeros = [];

document.getElementById('formAnimales').addEventListener('submit', function (e) {
    e.preventDefault();
    const animal = document.getElementById('inputAnimal').value;
    animales.push(animal);
    document.getElementById('inputAnimal').value = '';
});

document.getElementById('desplegarAnimales').addEventListener('click', () => {
    const div = document.getElementById('animales');
    div.innerHTML = animales.length
        ? `<ul>${animales.map(a => `<li>${a}</li>`).join('')}</ul>`
        : `<p class="text-muted">No hay animales.</p>`;
});

document.getElementById('formProductos').addEventListener('submit', function (e) {
    e.preventDefault();
    const producto = document.getElementById('inputProducto').value;
    productos.push(producto);
    document.getElementById('inputProducto').value = '';
});

document.getElementById('desplegarProductos').addEventListener('click', () => {
    mostrarProductos();
});

document.getElementById('borrarProductos').addEventListener('click', () => {
    const eliminado = productos.pop();
    mostrarProductos(eliminado);
});

function mostrarProductos(eliminado = '') {
    const div = document.getElementById('productos');
    let html = productos.length
        ? `<ul>${productos.map(p => `<li>${p}</li>`).join('')}</ul>`
        : `<p class="text-muted">No hay productos.</p>`;

    if (eliminado) {
        html += `<p class="mt-2 text-danger">Producto eliminado: <strong>${eliminado}</strong></p>`;
    }

    div.innerHTML = html;
}