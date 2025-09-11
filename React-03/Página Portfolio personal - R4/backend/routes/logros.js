import express from 'express';
import { connectDB } from '../dbconnection.js';

const router = express.Router();

router.get('/', (req, res) => {
  connectDB.query('SELECT * FROM logros', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const data = req.body;
  connectDB.query('INSERT INTO logros SET ?', data, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, ...data });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const data = req.body;
  connectDB.query('UPDATE logros SET ? WHERE id = ?', [data, id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  connectDB.query('DELETE FROM logros WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

export default router;