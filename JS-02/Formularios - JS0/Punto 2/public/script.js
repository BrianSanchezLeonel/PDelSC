const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
            const usuario = document.getElementById('usr').value;
            const email = document.getElementById('email').value;
            const pass = document.getElementById('pass').value;
            const deportes = [];
            
            const checkboxes = document.querySelectorAll('input[name="deportes"]:checked');
            checkboxes.forEach((checkbox) => {
                deportes.push(checkbox.value);
            });

            document.getElementById('mensajeUsuario').textContent = 'Usuario: ' + usuario;
            document.getElementById('mensajeEmail').textContent = 'Email: ' + email;
            document.getElementById('mensajeContraseña').textContent = 'Contraseña: ' + pass;
            document.getElementById('mensajeDeportes').textContent = 'Deportes: ' + (deportes.length > 0 ? deportes.join(', ') : 'Ninguno seleccionado');
});