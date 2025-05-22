const numeros = [];
const mensajes = [];
const clientes = [];

document.getElementById('formNumeros').addEventListener('submit', e => {
  e.preventDefault();
  const num = parseInt(document.getElementById('inputNumero').value);
  numeros.push(num);
  document.getElementById('inputNumero').value = '';
});

document.getElementById('quitarNumero').addEventListener('click', () => {
  numeros.shift();
  mostrarLista('numeros', numeros);
});

document.getElementById('formMensajes').addEventListener('submit', e => {
  e.preventDefault();
  const msg = document.getElementById('inputMensaje').value;
  mensajes.push(msg);
  document.getElementById('inputMensaje').value = '';
});

document.getElementById('quitarMensaje').addEventListener('click', () => {
  mensajes.shift();
  mostrarLista('mensajes', mensajes);
});

document.getElementById('formClientes').addEventListener('submit', e => {
  e.preventDefault();
  const cliente = document.getElementById('inputCliente').value;
  clientes.push(cliente);
  document.getElementById('inputCliente').value = '';
  mostrarLista('colaClientes', clientes);
});

document.getElementById('atenderCliente').addEventListener('click', () => {
  const atendido = clientes.shift();
  mostrarLista('colaClientes', clientes);
  const div = document.getElementById('clienteAtendido');
  div.textContent = atendido ? `Cliente atendido: ${atendido}` : 'No hay clientes en la cola.';
});

function mostrarLista(id, arreglo) {
  const div = document.getElementById(id);
  div.innerHTML = arreglo.length
    ? `<ul>${arreglo.map(e => `<li>${e}</li>`).join('')}</ul>`
    : '<p class="text-muted">Vacío</p>';
}