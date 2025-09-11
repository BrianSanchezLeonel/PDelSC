import express from 'express';
import cors from 'cors';
import { connectDB } from './dbconnection.js';  
import presentacionRouter from './routes/presentacion.js';
import proyectosRouter from './routes/proyectos.js';
import sobreMiRouter from './routes/sobreMi.js';
import contactoRouter from './routes/contacto.js';
import logrosRouter from './routes/logros.js';
import habilidadesRouter from './routes/habilidades.js';


const app = express();
const port = 3000;

app.use(cors()); // Permitir solicitudes desde React u otro frontend
app.use(express.json()); // Manejar JSON en el body

app.get('/', (req, res) => {
  res.send('Bienvenido a la API del Portafolio!');
});

app.use('/presentacion', presentacionRouter);
app.use('/proyectos', proyectosRouter);
app.use('/sobre-mi', sobreMiRouter);
app.use('/contacto', contactoRouter);
app.use('/logros', logrosRouter);
app.use('/habilidades', habilidadesRouter);

app.get('/ping', (req, res) => {
  connectDB.query('SELECT 1 + 1 AS resultado', (err, results) => {
    if (err) return res.status(500).send('Error en la base de datos');
    res.json({ db_status: 'ok', resultado: results[0].resultado });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});