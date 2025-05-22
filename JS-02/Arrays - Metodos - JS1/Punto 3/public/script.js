const colores = [];
const tareas = [];
const usuarios = [];

document.getElementById('formColores').addEventListener('submit', e => {
    e.preventDefault();
    const color = document.getElementById('inputColor').value;
    colores.unshift(color);
    document.getElementById('inputColor').value = '';
});

document.getElementById('mostrarColores').addEventListener('click', () => {
    const div = document.getElementById('colores');
    div.innerHTML = colores.length
        ? `<ul>${colores.map(c => `<li>${c}</li>`).join('')}</ul>`
        : '<p class="text-muted">No hay colores agregados.</p>';
});

document.getElementById('formTareas').addEventListener('submit', e => {
    e.preventDefault();
    const tarea = document.getElementById('inputTarea').value;
    tareas.unshift(tarea);
    document.getElementById('inputTarea').value = '';
});

document.getElementById('mostrarTareas').addEventListener('click', () => {
    const div = document.getElementById('tareas');
    div.innerHTML = tareas.length
        ? `<ul>${tareas.map(t => `<li>${t}</li>`).join('')}</ul>`
        : '<p class="text-muted">No hay tareas.</p>';
});

document.getElementById('formUsuarios').addEventListener('submit', e => {
    e.preventDefault();
    const usuario = document.getElementById('inputUsuario').value;
    usuarios.unshift(usuario);
    document.getElementById('inputUsuario').value = '';
});

document.getElementById('mostrarUsuarios').addEventListener('click', () => {
    const div = document.getElementById('usuarios');
    div.innerHTML = usuarios.length
        ? `<ul>${usuarios.map(u => `<li>${u}</li>`).join('')}</ul>`
        : '<p class="text-muted">No hay usuarios conectados.</p>';
});