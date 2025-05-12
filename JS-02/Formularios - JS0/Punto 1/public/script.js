document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); 

    const usr = document.querySelector('input[name="usr"]').value;

    document.getElementById("mensajeUsuario").textContent = `Usuario Ingresado: ${usr}`;
});