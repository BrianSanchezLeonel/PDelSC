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

app.get ('/componente1', (req, res) => {
    res.sendFile (path.join(__dirname, 'public' , 'componente1.html'));
});

app.get ('/componente2', (req, res) => {
    res.sendFile (path.join(__dirname, 'public' , 'componente2.html'));
});

app.get ('/componente3', (req, res) => {
    res.sendFile (path.join(__dirname, 'public' , 'componente3.html'));
});

app.get ('/componente4', (req, res) => {
    res.sendFile (path.join(__dirname, 'public' , 'componente4.html'));
});

app.get ('/componente5', (req, res) => {
    res.sendFile (path.join(__dirname, 'public' , 'componente5.html'));
});

app.get ('/componente6', (req, res) => {
    res.sendFile (path.join(__dirname, 'public' , 'componente6.html'));
});