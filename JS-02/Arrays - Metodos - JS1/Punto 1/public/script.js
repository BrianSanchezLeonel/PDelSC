const frutas = [];
const amigos = [];
const numeros = [];

document.getElementById('formFrutas').addEventListener('submit', function (e) {
    e.preventDefault();
    const fruta = document.getElementById('inputFruta').value;
    frutas.push(fruta);
    document.getElementById('inputFruta').value = '';
});

document.getElementById('desplegarFrutas').addEventListener('click', () => {
    const div = document.getElementById('frutas');
    div.innerHTML = frutas.map(f => `<li>${f}</li>`).join('');
});

document.getElementById('formAmigos').addEventListener('submit', function (e) {
    e.preventDefault();
    const amigo = document.getElementById('inputAmigo').value;
    amigos.push(amigo);
    document.getElementById('inputAmigo').value = '';
});

document.getElementById('desplegarAmigos').addEventListener('click', () => {
    const div = document.getElementById('amigos');
    div.innerHTML = amigos.map(a => `<li>${a}</li>`).join('');
});

document.getElementById('formNumeros').addEventListener('submit', function (e) {
    e.preventDefault();
    const errorDiv = document.getElementById('errorNumero');
    errorDiv.textContent = ''; // Limpiar mensaje anterior

    const num = parseInt(document.getElementById('inputNumero').value, 10);
    if (isNaN(num)) {
        errorDiv.textContent = 'Por favor, ingrese un número válido.';
    } else if (numeros.length === 0 || num > numeros[numeros.length - 1]) {
        numeros.push(num);
    } else {
        errorDiv.textContent = `El número debe ser mayor al último (${numeros[numeros.length - 1]}).`;
    }

    document.getElementById('inputNumero').value = '';
});

document.getElementById('desplegarNumeros').addEventListener('click', () => {
    const div = document.getElementById('numeros');
    div.innerHTML = numeros.map(n => `<li>${n}</li>`).join('');
});