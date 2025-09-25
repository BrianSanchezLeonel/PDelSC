const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",     // tu contraseña de MySQL
  database: "space_invaders",
});

module.exports = pool.promise();