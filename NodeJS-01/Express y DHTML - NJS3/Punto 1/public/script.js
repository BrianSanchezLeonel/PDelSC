function agregarH1() {
    let contenedor = document.getElementById("contenedor");
    if (!document.getElementById("h1-dinamico")) {
      let h1 = document.createElement("h1");
      h1.id = "h1-dinamico";
      h1.textContent = "Hola Mundo";
      contenedor.appendChild(h1);
    }
  }
  
  function cambiarTextoH1() {
    let h1 = document.getElementById("h1-dinamico");
    if (h1) h1.textContent = "Chau Mundo";
  }
  
  function cambiarColorH1() {
    let h1 = document.getElementById("h1-dinamico");
    if (h1) h1.style.color = "#" + Math.floor(Math.random()*16777215).toString(16);
  }
  
  function agregarImagen() {
    let contenedor = document.getElementById("contenedor");
    if (!document.getElementById("imagen-dinamica")) {
      let img = document.createElement("img");
      img.id = "imagen-dinamica";
      img.src = "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
      contenedor.appendChild(img);
    }
  }
  
  function cambiarImagen() {
    let img = document.getElementById("imagen-dinamica");
    if (img) {
      img.src = "https://images.pexels.com/photos/1770918/pexels-photo-1770918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    }
  }
  
  function cambiarTamañoImagen() {
    let img = document.getElementById("imagen-dinamica");
    if (img) {
      let width = Math.floor(Math.random() * 300) + 100;
      let height = Math.floor(Math.random() * 200) + 100;
      img.style.width = width + "px";
      img.style.height = height + "px";
    }
  }