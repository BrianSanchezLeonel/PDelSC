const express = require('express');
const app = express();
const port = 3000;
const path = require ("path");

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

app.use(express.static (path.join(__dirname, 'public')));

app.get ('/', (req, res) => {
    res.sendFile (path.join(__dirname, 'public', 'index.html'));
});

app.get ('/pagina1', (req, res) => {
    res.sendFile (path.join(__dirname, 'public' , 'pagina1.html'));
});

app.get ('/pagina2', (req, res) => {
    res.sendFile (path.join(__dirname, 'public' , 'pagina2.html'));
});

app.get ('/pagina3', (req, res) => {
    res.sendFile (path.join(__dirname, 'public' , 'pagina3.html'));
});

app.get ('/pagina4', (req, res) => {
    res.sendFile (path.join(__dirname, 'public' , 'pagina4.html'));
});