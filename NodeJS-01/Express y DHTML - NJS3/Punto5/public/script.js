function agregarParrafo() {
  document.getElementById("contenedor").innerHTML += "<p>Párrafo</p>";
}

function agregarImagen() {
  document.getElementById("contenedor").innerHTML += '<img style="width: 300px"; heigth: 300px; src="https://images.pexels.com/photos/1770918/pexels-photo-1770918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Imagen" />';
}

function agregarInput() {
  document.getElementById("contenedor").innerHTML += '<input type="text" placeholder="Escribe algo" /><br>';
}

function agregarTabla() {
  const tabla = `
    <table style="margin: auto;" border="1">
      <tr><th>Nombre</th><th>Edad</th></tr>
      <tr><td>Ana</td><td>25</td></tr>
      <tr><td>Luis</td><td>30</td></tr>
    </table>
    <br>`;
  document.getElementById("contenedor").innerHTML += tabla;
}

function agregarLista() {
  const lista = `
    <ul style="list-style-type: none; margin: auto">
      <li>Elemento 1</li>
      <li>Elemento 2</li>
      <li>Elemento 3</li>
    </ul>`;
  document.getElementById("contenedor").innerHTML += lista;
}