const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const upload = multer({ dest: 'uploads/' });

// Ruta para ingresar los números
app.post('/guardar', (req, res) => {
  const numeros = req.body.numeros?.split(',').map(n => n.trim());

  if (!numeros || numeros.length < 10 || numeros.length > 20) {
    return res.send('Debe ingresar entre 10 y 20 números.');
  }

  const contenido = numeros.join('\n');
  const nombreArchivo = `uploads/numeros-${Date.now()}.txt`;

  fs.writeFileSync(nombreArchivo, contenido);
  res.send(`Archivo guardado como ${nombreArchivo}`);
});

// Ruta para subir y procesar archivo
app.post('/subir', upload.single('archivo'), (req, res) => {
  const archivo = req.file.path;
  const contenido = fs.readFileSync(archivo, 'utf-8');

  const numeros = contenido.split('\n').map(n => n.trim()).filter(n => n !== '');
  const utiles = numeros.filter(n => n.length > 0 && n[0] === n[n.length - 1]).sort();
  const inutiles = numeros.length - utiles.length;
  const porcentaje = ((utiles.length / numeros.length) * 100).toFixed(2);

  const resultado = `
Números útiles:
${utiles.join('\n')}

Total útiles: ${utiles.length}
Total no útiles: ${inutiles}
Porcentaje útiles: ${porcentaje}%
`;

  const nombreResultado = `resultados/resultado-${Date.now()}.txt`;
  fs.writeFileSync(nombreResultado, resultado);

  res.send(`
    <h2>Resultado del filtrado:</h2>
    <pre>${resultado}</pre>
    <p>Guardado en: ${nombreResultado}</p>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});