const nombres = [];
const numeros = [];
const personas = [];

document.getElementById("formNombres").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("inputNombre").value.trim();
  if (nombre) {
    nombres.push(nombre);
    document.getElementById("inputNombre").value = '';
  }
});

document.getElementById("mostrarSaludos").addEventListener("click", () => {
  const ul = document.getElementById("listaSaludos");
  ul.innerHTML = "";
  nombres.forEach(nombre => {
    const li = document.createElement("li");
    li.textContent = `¡Hola, ${nombre}!`;
    ul.appendChild(li);
  });
});

document.getElementById("formNumeros").addEventListener("submit", function(e) {
  e.preventDefault();
  const numero = parseFloat(document.getElementById("inputNumero").value);
  if (!isNaN(numero)) {
    numeros.push(numero);
    document.getElementById("inputNumero").value = '';
  }
});

document.getElementById("mostrarDobles").addEventListener("click", () => {
  const ul = document.getElementById("listaDobles");
  ul.innerHTML = "";
  numeros.forEach(num => {
    const li = document.createElement("li");
    li.textContent = `${num} x 2 = ${num * 2}`;
    ul.appendChild(li);
  });
});

document.getElementById("formPersonas").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("inputNombrePersona").value.trim();
  const edad = parseInt(document.getElementById("inputEdad").value);
  if (nombre && !isNaN(edad)) {
    personas.push({ nombre, edad });
    document.getElementById("inputNombrePersona").value = '';
    document.getElementById("inputEdad").value = '';
  }
});

document.getElementById("mostrarPersonas").addEventListener("click", () => {
  const ul = document.getElementById("listaPersonas");
  ul.innerHTML = "";
  personas.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} tiene ${p.edad} años.`;
    ul.appendChild(li);
  });
});