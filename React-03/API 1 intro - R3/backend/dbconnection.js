import mysql from 'mysql2';

const connectDB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // Si tienes una contraseña, añádela aquí
  database: 'usuarios_db'  // Asegúrate de que este sea el nombre correcto de la base de datos
});

connectDB.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

export { connectDB };