const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const personas = [];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/enviar', (req, res) => {
    const persona = {
        usr: req.body.usr,
        pass: req.body.pass
    };
    personas.push(persona);
    console.log(personas);
    res.send(`
        <div style="font-family: Arial; text-align: center; margin-top: 50px;">
            <h2 style="color: green;">Usuario agregado correctamente</h2>
            <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;">
                Volver
            </a>
        </div>
    `);
});

app.get('/personas', (req, res) => {
    let lista = `
        <div style="font-family: Arial; text-align: center; margin-top: 30px;">
            <h1 style="color: #333;">Listado de usuarios</h1>
            <ul style="list-style: none; padding: 0;">
    `;
    personas.forEach(p => {
        lista += `<li style="margin: 8px 0; color: #555;">👤 ${p.usr} -  ${p.pass}</li>`;
    });
    lista += `
            </ul>
            <a href="/" style="display: inline-block; margin-top: 30px; padding: 10px 20px; background-color: #28A745; color: white; text-decoration: none; border-radius: 5px;">
                Volver
            </a>
        </div>
    `;
    res.send(lista);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});