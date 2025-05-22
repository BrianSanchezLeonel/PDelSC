const letras = [];
const numeros = [];

document.getElementById("formLetras").addEventListener("submit", e => {
  e.preventDefault();
  const letra = document.getElementById("inputLetra").value.trim();
  if (letra) {
    letras.push(letra);
    document.getElementById("inputLetra").value = "";
  }
});

document.getElementById("invertirLetras").addEventListener("click", () => {
  const invertido = [...letras].reverse();
  document.getElementById("resultadoLetras").textContent = `Invertido: ${invertido.join(", ")}`;
});

document.getElementById("formNumeros").addEventListener("submit", e => {
  e.preventDefault();
  const numero = parseFloat(document.getElementById("inputNumero").value);
  if (!isNaN(numero)) {
    numeros.push(numero);
    document.getElementById("inputNumero").value = "";
  }
});

document.getElementById("invertirNumeros").addEventListener("click", () => {
  const invertido = [...numeros].reverse();
  document.getElementById("resultadoNumeros").textContent = `Invertido: ${invertido.join(", ")}`;
});

document.getElementById("invertirTexto").addEventListener("click", () => {
  const texto = document.getElementById("inputTexto").value;
  const invertido = texto.split("").reverse().join("");
  document.getElementById("resultadoTexto").textContent = `Texto invertido: ${invertido}`;
});