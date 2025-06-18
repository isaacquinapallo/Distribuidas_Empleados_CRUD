const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta "HTML"
app.use(express.static(path.join(__dirname, 'HTML')));

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'HTML', 'index.html'));
});

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: 'password',
  database: 'base_empleados'
});

// ------------------- RUTAS API -------------------

// CREATE: Agregar nuevo empleado
app.post('/empleados', (req, res) => {
  const { nombre, cargo, sueldo } = req.body;
  const sueldoNum = parseFloat(sueldo);
  console.log('🔍 Body recibido en /empleados:', req.body);
  
  if (!nombre || !cargo || isNaN(sueldoNum)) {
    return res.status(400).send('Faltan campos o sueldo inválido');
  }

  const sql = 'INSERT INTO personal (nombre, cargo, sueldo) VALUES (?, ?, ?)';
  connection.query(sql, [nombre, cargo, sueldo], (err, result) => {
    if (err) {
      console.error('Error al crear empleado:', err.sqlMessage || err);
      return res.status(500).send('Error al crear empleado');
    }
    res.status(201).json({ id: result.insertId, message: 'Empleado creado' });
  });
});

// READ: Obtener todos los empleados
app.get('/empleados', (req, res) => {
  connection.query('SELECT * FROM personal', (err, results) => {
    if (err) {
      console.error('Error al obtener empleados:', err);
      return res.status(500).send('Error al obtener empleados');
    }
    res.json(results);
  });
});

// UPDATE: Actualizar datos de un empleado
app.put('/empleados/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, cargo, sueldo } = req.body;

  if (!nombre || !cargo || typeof sueldo !== 'number') {
    return res.status(400).send('Faltan campos o sueldo inválido');
  }

  const sql = 'UPDATE personal SET nombre = ?, cargo = ?, sueldo = ? WHERE id = ?';
  connection.query(sql, [nombre, cargo, sueldo, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar empleado:', err.sqlMessage || err);
      return res.status(500).send('Error al actualizar empleado');
    }
    res.json({ message: 'Empleado actualizado correctamente' });
  });
});

// DELETE: Eliminar empleado por ID
app.delete('/empleados/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM personal WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar empleado:', err.sqlMessage || err);
      return res.status(500).send('Error al eliminar empleado');
    }
    res.json({ message: 'Empleado eliminado correctamente' });
  });
});

// ------------------- INICIAR SERVIDOR -------------------
app.listen(port, () => {
  console.log(`✅ Servidor web corriendo en: http://localhost:${port}`);
});
