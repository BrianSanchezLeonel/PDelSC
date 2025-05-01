function crearNodos() {
  const contenedor = document.getElementById("contenedor-enlaces");
  contenedor.innerHTML = ""; 

  const enlaces = [
    { texto: "Google", href: "https://www.google.com" },
    { texto: "YouTube", href: "https://www.youtube.com" },
    { texto: "Wikipedia", href: "https://www.wikipedia.org" },
    { texto: "Twitter", href: "https://www.x.com" },
    { texto: "Instagram", href: "https://www.instagram.com" }
  ];

  enlaces.forEach((enlace, i) => {
    const a = document.createElement("a");
    a.textContent = enlace.texto;
    a.href = enlace.href;
    a.target = "_blank";
    a.id = `enlace${i}`;
    a.style.display = "block";
    contenedor.appendChild(a);
  });
}  

function modificarNodos() {
  const cambios = {
    "https://www.google.com": {
      nuevoHref: "https://classroom.google.com/",
      nuevoTexto: "Classroom"
    },
    "https://www.youtube.com": {
      nuevoHref: "https://docs.google.com/document/",
      nuevoTexto: "Docs"
    },
    "https://www.wikipedia.org": {
      nuevoHref: "https://docs.google.com/spreadsheets/",
      nuevoTexto: "Hojas de calculo"
    },
    "https://www.x.com": {
      nuevoHref: "https://web.facebook.com/",
      nuevoTexto: "Facebook"
    },
    "https://www.instagram.com": {
      nuevoHref: "https://www.snapchat.com/es",
      nuevoTexto: "Snapchat"
    }
  };

  const contenedor = document.getElementById("contenedor-enlaces");
  const historial = document.getElementById("historial-cambios");
  const enlaces = contenedor.getElementsByTagName("a");

  for (let a of enlaces) {
    const hrefOriginal = a.href;
    for (let original in cambios) {
      if (hrefOriginal.includes(original)) {
        const nuevoHref = cambios[original].nuevoHref;
        const nuevoTexto = cambios[original].nuevoTexto;

        a.href = nuevoHref;
        a.textContent = nuevoTexto;

        const li = document.createElement("li");
        li.textContent = `Modificado: href cambiado a ${nuevoHref}, texto cambiado a "${nuevoTexto}"`;
        historial.appendChild(li);

        break;
      }
    }
  }
}