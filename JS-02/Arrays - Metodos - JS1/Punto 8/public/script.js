const usuarios = [];
const colores = [];
const numeros = [];

document.getElementById("formUsuario").addEventListener("submit", e => {
  e.preventDefault();
  const valor = document.getElementById("inputUsuario").value.trim();
  if (valor) {
    usuarios.push(valor);
    document.getElementById("inputUsuario").value = "";
  }
});

document.getElementById("verificarAdmin").addEventListener("click", () => {
  const div = document.getElementById("resultadoAdmin");
  div.textContent = usuarios.includes("admin")
    ? '"admin" está en la lista de usuarios.'
    : '"admin" no está en la lista.';
});

document.getElementById("verificarVerde").addEventListener("click", () => {
  const div = document.getElementById("resultadoVerde");
  div.textContent = colores.includes("verde")
    ? 'El color "verde" está en la lista.'
    : 'El color "verde" no está en la lista.';
});

document.getElementById("formNumero").addEventListener("submit", e => {
  e.preventDefault();
  const valor = parseInt(document.getElementById("inputNumero").value);
  const div = document.getElementById("resultadoNumero");
  if (!isNaN(valor)) {
    if (numeros.includes(valor)) {
      div.textContent = `El número ${valor} ya existe en el array.`;
    } else {
      numeros.push(valor);
      div.textContent = `El número ${valor} fue agregado al array.`;
    }
    document.getElementById("inputNumero").value = "";
  }
});
