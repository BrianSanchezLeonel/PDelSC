const numeros = [];
const palabras = [];
const usuarios = [];

document.getElementById("formNumeros").addEventListener("submit", e => {
  e.preventDefault();
  const num = parseFloat(document.getElementById("inputNumero").value);
  if (!isNaN(num)) {
    numeros.push(num);
    document.getElementById("inputNumero").value = '';
  }
});

document.getElementById("filtrarNumeros").addEventListener("click", () => {
  const filtrados = numeros.filter(n => n > 10);
  document.getElementById("resultadoNumeros").innerHTML =
    filtrados.map(n => `<li>${n}</li>`).join('');
});

document.getElementById("formPalabras").addEventListener("submit", e => {
  e.preventDefault();
  const palabra = document.getElementById("inputPalabra").value.trim();
  if (palabra) {
    palabras.push(palabra);
    document.getElementById("inputPalabra").value = '';
  }
});

document.getElementById("filtrarPalabras").addEventListener("click", () => {
  const filtradas = palabras.filter(p => p.length > 5);
  document.getElementById("resultadoPalabras").innerHTML =
    filtradas.map(p => `<li>${p}</li>`).join('');
});

document.getElementById("formUsuarios").addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.getElementById("inputUsuario").value.trim();
  const activo = document.getElementById("inputActivo").value === "true";
  if (nombre) {
    usuarios.push({ nombre, activo });
    document.getElementById("inputUsuario").value = '';
  }
});

document.getElementById("filtrarUsuarios").addEventListener("click", () => {
  const activos = usuarios.filter(u => u.activo);
  document.getElementById("resultadoUsuarios").innerHTML =
    activos.map(u => `<li>${u.nombre} (activo)</li>`).join('');
});