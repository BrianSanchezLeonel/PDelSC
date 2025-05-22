const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', { resultado: null });
});

app.post('/decodificar', (req, res) => {
    const mensaje = req.body.mensaje;
    const decodificado = decodificarMensaje(mensaje);
    res.render('index', { resultado: decodificado });
});

function decodificarMensaje(texto) {
    let resultado = '';
    let i = 0;

    while (i < texto.length) {
        if (texto[i] === '(') {
            i++;
            let fragmento = '';
            while (i < texto.length && texto[i] !== ')') {
                fragmento += texto[i++];
            }
            i++; // saltar ')'
            resultado += fragmento.split('').reverse().join('');
        } else {
            resultado += texto[i++];
        }
    }
    return resultado;
}

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});