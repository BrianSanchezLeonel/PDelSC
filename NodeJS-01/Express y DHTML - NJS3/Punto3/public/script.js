function irPagina(pagina){
  window.location.href = pagina;
}

function cambiarTexto() {
  document.getElementById("texto").textContent = "Texto cambiado";
}

function resaltar(elemento) {
  elemento.style.backgroundColor = "orange";
}
function quitarResalte(elemento) {
  elemento.style.backgroundColor = "lightgray";
}

function cambiarImagen() {
  document.getElementById("imagen").src = "https://images.pexels.com/photos/1770918/pexels-photo-1770918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
}

function actualizarTexto(valor) {
  document.getElementById("salida").textContent = valor;
}

function agrandarTexto() {
  document.getElementById("texto").style.fontSize = "2em";
}

function contarHijos() {
  const contenedor = document.getElementById("contenedor");
  const cantidad = contenedor.children.length;
  document.getElementById("resultado").textContent = `Tiene ${cantidad} hijos.`;
}