import pool from '../db.js';

export const UbicacionesActivos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Ubicacion_Activo');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ubicaciones de activos' });
  }
};

export const crearUbicacionActivo = async (req, res) => {
  const { ubicacion } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Ubicacion_Activo (ubicacion) VALUES (?)',
      [ubicacion]
    );
    res.status(201).json({ message: 'Ubicación de activo creada', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la ubicación de activo' });
  }
};


export const eliminarUbicacionActivo = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Ubicacion_Activo WHERE id_ubicacion_activo = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ubicación no encontrada' });
    }
    res.json({ message: 'Ubicación de activo eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la ubicación de activo' });
  }
};

