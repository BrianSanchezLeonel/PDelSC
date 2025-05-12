const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const personas = [];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});