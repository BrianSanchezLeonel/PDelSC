import express from 'express';  
import { connectDB } from '../dbconnection.js';  // Usamos la conexión a la base de datos

const router = express.Router();

// Obtener todos los usuarios
router.get('/', (req, res) => {
  connectDB.query('SELECT * FROM usr', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);  // Devuelve los resultados de la consulta
  });
});

// Agregar un usuario
router.post('/', (req, res) => {
  const usuario = req.body;
  connectDB.query('INSERT INTO usr SET ?', usuario, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, ...usuario });
  });
});

// Actualizar un usuario
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const usuario = req.body;
  connectDB.query('UPDATE usr SET ? WHERE id = ?', [usuario, id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  connectDB.query('DELETE FROM usr WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

export default router;