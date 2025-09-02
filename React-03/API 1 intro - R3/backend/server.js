import express from 'express';
import cors from 'cors';
import { connectDB } from './dbconnection.js';  // Importa la conexión

const app = express();
const port = 3000;

app.use(cors()); // Para permitir solicitudes desde React
app.use(express.json());  // Para manejar solicitudes con JSON

// Ruta predeterminada
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de usuarios!');
});

// Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
  connectDB.query('SELECT * FROM usr', (err, results) => {
    if (err) {
      res.status(500).send('Error al obtener usuarios');
    } else {
      res.json(results); // Enviar resultados en formato JSON
    }
  });
});

// Ruta para agregar un usuario
app.post('/users', (req, res) => {
  const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email } = req.body;
  connectDB.query(
    'INSERT INTO usr (nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email],
    (err, result) => {
      if (err) {
        res.status(500).send('Error al agregar usuario');
      } else {
        res.status(201).send('Usuario agregado');
      }
    }
  );
});

// Ruta para eliminar un usuario
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  connectDB.query('DELETE FROM usr WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).send('Error al eliminar usuario');
    } else {
      res.send('Usuario eliminado');
    }
  });
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email } = req.body;

  connectDB.query(
    'UPDATE usr SET nombre=?, apellido=?, direccion=?, telefono=?, celular=?, fecha_nacimiento=?, email=? WHERE id=?',
    [nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email, id],
    (err) => {
      if (err) {
        res.status(500).send('Error al actualizar usuario');
      } else {
        res.send('Usuario actualizado');
      }
    }
  );
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});