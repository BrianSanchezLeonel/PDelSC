const express = require("express");
const cors = require("cors");
const db = require("./db"); // tu conexión a MySQL
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ------------------------
// Registro de usuario
// ------------------------
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password]
    );
    res.json({ success: true, id: result.insertId, username });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------------
// Login
// ------------------------
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );
    if (rows.length > 0) res.json({ success: true, user: rows[0] });
    else res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------------
// Guardar puntaje
// ------------------------
app.post("/api/score", async (req, res) => {
  const { userId, game, score, level, time } = req.body;
  try {
    await db.query(
      "INSERT INTO scores (user_id, game, score, level, time) VALUES (?, ?, ?, ?, ?)",
      [userId, game, score, level, time]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------------
// Obtener mejores puntajes globales (Top 10)
// ------------------------
app.get("/api/scores", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT s.score, s.level, s.time, s.game, u.username
       FROM scores s
       JOIN users u ON s.user_id = u.id
       ORDER BY s.score DESC, s.level DESC, s.time ASC
       LIMIT 10`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ------------------------
// Obtener mejor puntaje de un usuario por juego
// ------------------------
app.get("/api/best-score/:game/:userId", async (req, res) => {
  const { userId, game } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT score, level, time
       FROM scores
       WHERE user_id = ? AND game = ?
       ORDER BY score DESC, level DESC, time ASC
       LIMIT 1`,
      [userId, game]
    );

    if (rows.length > 0) res.json({ success: true, best: rows[0] });
    else res.json({ success: true, best: null });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
