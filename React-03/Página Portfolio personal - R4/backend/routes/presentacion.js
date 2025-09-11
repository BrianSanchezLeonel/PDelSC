import express from 'express';
import { connectDB } from '../dbconnection.js';

const router = express.Router();

// Obtener todas las presentaciones
router.get('/', (req, res) => {
  connectDB.query('SELECT * FROM presentacion', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Agregar una presentación
router.post('/', (req, res) => {
  const data = req.body;
  connectDB.query('INSERT INTO presentacion SET ?', data, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, ...data });
  });
});

// Actualizar presentación
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const data = req.body;
  connectDB.query('UPDATE presentacion SET ? WHERE id = ?', [data, id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// Eliminar presentación
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  connectDB.query('DELETE FROM presentacion WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

export default router;