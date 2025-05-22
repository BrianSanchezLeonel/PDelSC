const palabras = [];
const numeros = [];
const ciudades = [];

document.getElementById("formAnimal").addEventListener("submit", e => {
  e.preventDefault();
  const valor = document.getElementById("inputAnimal").value.trim();
  if (valor) {
    palabras.push(valor.toLowerCase());
    document.getElementById("inputAnimal").value = "";
  }
});

document.getElementById("buscarPerro").addEventListener("click", () => {
  const index = palabras.indexOf("perro");
  const div = document.getElementById("resultadoPerro");
  div.textContent = index !== -1
    ? `"perro" está en la posición ${index}`
    : `"perro" no se encontró.`;
});

document.getElementById("formNumero").addEventListener("submit", e => {
  e.preventDefault();
  const valor = parseInt(document.getElementById("inputNumero").value);
  if (!isNaN(valor)) {
    numeros.push(valor);
    document.getElementById("inputNumero").value = "";
  }
});

document.getElementById("buscar50").addEventListener("click", () => {
  const index = numeros.indexOf(50);
  const div = document.getElementById("resultado50");
  div.textContent = index !== -1
    ? `El número 50 está en la posición ${index}`
    : `El número 50 no está en el array.`;
});

document.getElementById("formCiudad").addEventListener("submit", e => {
  e.preventDefault();
  const valor = document.getElementById("inputCiudad").value.trim();
  if (valor) {
    ciudades.push(valor);
    document.getElementById("inputCiudad").value = "";
  }
});

document.getElementById("buscarMadrid").addEventListener("click", () => {
  const index = ciudades.indexOf("Madrid");
  const div = document.getElementById("resultadoMadrid");
  div.textContent = index !== -1
    ? `"Madrid" está en la posición ${index}`
    : `"Madrid" no se encuentra en la lista de ciudades.`;
});