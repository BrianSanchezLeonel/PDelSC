const numerosSuma = [];
const numerosMultiplicar = [];
const productos = [];

document.getElementById("formSuma").addEventListener("submit", e => {
  e.preventDefault();
  const num = parseFloat(document.getElementById("inputSuma").value);
  if (!isNaN(num)) {
    numerosSuma.push(num);
    document.getElementById("inputSuma").value = '';
  }
});

document.getElementById("sumar").addEventListener("click", () => {
  const total = numerosSuma.reduce((acc, val) => acc + val, 0);
  document.getElementById("resultadoSuma").textContent = `Total: ${total}`;
});

document.getElementById("formMultiplicar").addEventListener("submit", e => {
  e.preventDefault();
  const num = parseFloat(document.getElementById("inputMultiplicar").value);
  if (!isNaN(num)) {
    numerosMultiplicar.push(num);
    document.getElementById("inputMultiplicar").value = '';
  }
});

document.getElementById("multiplicar").addEventListener("click", () => {
  const total = numerosMultiplicar.reduce((acc, val) => acc * val, 1);
  document.getElementById("resultadoMultiplicacion").textContent = `Producto: ${total}`;
});

document.getElementById("formPrecios").addEventListener("submit", e => {
  e.preventDefault();
  const precio = parseFloat(document.getElementById("inputPrecio").value);
  if (!isNaN(precio)) {
    productos.push({ precio });
    document.getElementById("inputPrecio").value = '';
  }
});

document.getElementById("calcularTotal").addEventListener("click", () => {
  const total = productos.reduce((acc, obj) => acc + obj.precio, 0);
  document.getElementById("resultadoTotal").textContent = `Total de Precios: $${total.toFixed(2)}`;
});
