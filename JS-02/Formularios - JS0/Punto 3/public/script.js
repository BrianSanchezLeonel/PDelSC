const formulario = document.getElementById('formulario');
const tieneHijos = document.getElementById('tieneHijos');
const campoCantidadHijos = document.getElementById('campoCantidadHijos');
const cantidadHijos = document.getElementById('cantidadHijos');

tieneHijos.addEventListener('change', () => {
    if (tieneHijos.value === 'si') {
        campoCantidadHijos.classList.remove('d-none');
        cantidadHijos.setAttribute('required', 'true');
    } else {
        campoCantidadHijos.classList.add('d-none');
        cantidadHijos.removeAttribute('required');
        cantidadHijos.value = '';
    }
});

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const usuario = document.getElementById('usr').value.trim();
    const edad = document.getElementById('edad').value;
    const fecha = document.getElementById('fecha').value;
    const sexo = document.querySelector('select[name="sexo"]').value;
    const documento = document.getElementById('documento').value;
    const estadoCivil = document.querySelector('select[name="estadoCivil"]').value;
    const nacionalidad = document.getElementById('nac').value.trim();
    const telefono = document.getElementById('tel').value;
    const hijos = tieneHijos.value;
    const cantHijos = hijos === 'si' ? cantidadHijos.value : 0;
    const email = document.getElementById('email').value.trim();
    const pass = document.getElementById('pass').value;
    const deportes = Array.from(document.querySelectorAll('input[name="deportes"]:checked')).map(cb => cb.value);

    if (!usuario || !edad || !fecha || !sexo || !documento || !estadoCivil || !nacionalidad || !telefono || !email || !pass) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }

    const persona = {
        nombreCompleto: usuario,
        edad,
        fecha,
        sexo,
        documento,
        estadoCivil,
        nacionalidad,
        telefono,
        hijos,
        cantHijos,
        email,
        pass,
        deportes
    };

    let personas = JSON.parse(localStorage.getItem('personas')) || [];
    personas.push(persona);
    localStorage.setItem('personas', JSON.stringify(personas));

    document.getElementById('mensajeUsuario').textContent = 'Usuario: ' + usuario;
    document.getElementById('mensajeEdad').textContent = 'Edad: ' + edad;
    document.getElementById('mensajeNacimiento').textContent = 'Fecha de nacimiento: ' + fecha;
    document.getElementById('mensajeSexo').textContent = 'Sexo: ' + sexo;
    document.getElementById('mensajeDocumento').textContent = 'Documento: ' + documento;
    document.getElementById('mensajeEstCivil').textContent = 'Estado Civil: ' + estadoCivil;
    document.getElementById('mensajeNacionalidad').textContent = 'Nacionalidad: ' + nacionalidad;
    document.getElementById('mensajeTelefono').textContent = 'Teléfono: ' + telefono;
    document.getElementById('mensajeHijos').textContent = 'Hijos: ' + hijos;
    document.getElementById('mensajeEmail').textContent = 'Email: ' + email;
    document.getElementById('mensajeDeportes').textContent = 'Deportes: ' + (deportes.length ? deportes.join(', ') : 'Ninguno');

    mostrarListado();
    formulario.reset();
    campoCantidadHijos.classList.add('d-none');
});

function mostrarListado() {
    const listaDiv = document.getElementById('listaPersonas');
    const personas = JSON.parse(localStorage.getItem('personas')) || [];

    listaDiv.innerHTML = '<h3>Listado de Personas:</h3><ul class="list-group">';
    personas.forEach(p => {
        listaDiv.innerHTML += `<li class="list-group-item">${p.nombreCompleto}</li>`;
    });
    listaDiv.innerHTML += '</ul>';
}

document.addEventListener('DOMContentLoaded', mostrarListado);