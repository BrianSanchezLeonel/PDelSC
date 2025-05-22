const numeros = [];
const nombres = [];
const precios = [];

document.getElementById("formNumeros").addEventListener("submit", function(e) {
  e.preventDefault();
  const valor = parseFloat(document.getElementById("inputNumero").value);
  if (!isNaN(valor)) {
    numeros.push(valor);
    document.getElementById("inputNumero").value = '';
  }
});

document.getElementById("mostrarTriple").addEventListener("click", () => {
  const resultado = numeros.map(n => n * 3);
  const ul = document.getElementById("resultadoNumeros");
  ul.innerHTML = resultado.map(n => `<li>${n}</li>`).join('');
});

document.getElementById("formNombres").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("inputNombre").value.trim();
  if (nombre) {
    nombres.push(nombre);
    document.getElementById("inputNombre").value = '';
  }
});

document.getElementById("mostrarMayus").addEventListener("click", () => {
  const resultado = nombres.map(n => n.toUpperCase());
  const ul = document.getElementById("resultadoNombres");
  ul.innerHTML = resultado.map(n => `<li>${n}</li>`).join('');
});

document.getElementById("formPrecios").addEventListener("submit", function(e) {
  e.preventDefault();
  const precio = parseFloat(document.getElementById("inputPrecio").value);
  if (!isNaN(precio)) {
    precios.push(precio);
    document.getElementById("inputPrecio").value = '';
  }
});

document.getElementById("mostrarIVA").addEventListener("click", () => {
  const resultado = precios.map(p => (p * 1.21).toFixed(2));
  const ul = document.getElementById("resultadoPrecios");
  ul.innerHTML = resultado.map(p => `<li>$${p}</li>`).join('');
});