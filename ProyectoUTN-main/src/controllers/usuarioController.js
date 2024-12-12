import pool from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.js';

export const Usuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Usuario');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
}

export const CrearUsuario = async (req, res) => {
    const {nombre, area, email, contraseña, apellido} = req.body;
    if (!nombre || !area || !email || !contraseña || !apellido) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }
      try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const [result] = await pool.query('INSERT INTO Usuario (nombre, area, email, contraseña, apellido) VALUES (?,?,?,?,?)',
       [nombre, area, email, hashedPassword, apellido]);

    res.json({ nombre, area, email, hashedPassword });
  } catch (err) {
    console.error('Error al registrar usuario: ' + err);
    res.json({ error: 'Error al registrar usuario' });
  };
}

export const UsuarioLogin = async (req, res) => {
  const { email, contraseña } = req.body;
  if (!email || !contraseña) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }
  try {
    const [results] = await pool.query('SELECT * FROM Usuario WHERE email = ?', [email]);
    if (results.length === 0 || !(await bcrypt.compare(contraseña, results[0].contraseña))) {
      return res.status(401).json({ error: 'Usuario y/o contraseña incorrectos' });
    }

  
    const token = jwt.sign({ id: results[0].id_usuario,nombre:results[0].nombre, email: results[0].email, area: results[0].area }, SECRET_KEY, { expiresIn: '2h' });

    res.json({ token });  
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};


export const obtenerOperarios = async (req, res) => {
  try {
      const [rows] = await pool.query("SELECT * FROM Usuario WHERE area = 'operario'");
      res.json(rows);
  } catch (error) {
      console.error('Error al obtener los operarios:', error);
      res.status(500).json({ error: 'Error al obtener los operarios' });
  }

};
export const eliminarUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Usuario WHERE id_usuario = ?', [id_usuario]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
}
