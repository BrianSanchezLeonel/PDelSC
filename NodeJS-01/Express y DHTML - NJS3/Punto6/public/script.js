document.getElementById("registroForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const nombre = form.nombre.value;
  const edad = form.edad.value;
  const email = form.email.value;
  const genero = form.genero.value;
  const pais = form.pais.value;

  const interesesSeleccionados = [];
  form.querySelectorAll("input[name='intereses']:checked").forEach(chk => {
    interesesSeleccionados.push(chk.value);
  });

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Edad:</strong> ${edad}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Género:</strong> ${genero}</p>
    <p><strong>País:</strong> ${pais}</p>
    <p><strong>Intereses:</strong> ${interesesSeleccionados.join(", ")}</p>
  `;
});