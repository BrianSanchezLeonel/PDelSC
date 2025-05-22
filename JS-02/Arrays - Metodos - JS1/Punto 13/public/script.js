const numeros = [];
const palabras = [];
const personas = [];

document.getElementById("formNumeros").addEventListener("submit", e => {
  e.preventDefault();
  const num = parseFloat(document.getElementById("inputNumero").value);
  if (!isNaN(num)) {
    numeros.push(num);
    document.getElementById("inputNumero").value = "";
  }
});

document.getElementById("ordenarNumeros").addEventListener("click", () => {
  const ordenados = [...numeros].sort((a, b) => a - b);
  document.getElementById("resultadoNumeros").textContent = `Ordenado: ${ordenados.join(", ")}`;
});

document.getElementById("formPalabras").addEventListener("submit", e => {
  e.preventDefault();
  const palabra = document.getElementById("inputPalabra").value.trim();
  if (palabra) {
    palabras.push(palabra);
    document.getElementById("inputPalabra").value = "";
  }
});

document.getElementById("ordenarPalabras").addEventListener("click", () => {
  const ordenadas = [...palabras].sort((a, b) => a.localeCompare(b));
  document.getElementById("resultadoPalabras").textContent = `Ordenado: ${ordenadas.join(", ")}`;
});

document.getElementById("formPersonas").addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.getElementById("inputNombre").value.trim();
  const edad = parseInt(document.getElementById("inputEdad").value);
  if (nombre && !isNaN(edad)) {
    personas.push({ nombre, edad });
    document.getElementById("inputNombre").value = "";
    document.getElementById("inputEdad").value = "";
  }
});

document.getElementById("ordenarPersonas").addEventListener("click", () => {
  const ordenadas = [...personas].sort((a, b) => a.edad - b.edad);
  const resultado = ordenadas.map(p => `${p.nombre} (${p.edad} años)`).join("<br>");
  document.getElementById("resultadoPersonas").innerHTML = resultado;
});