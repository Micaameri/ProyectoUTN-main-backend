import pool from '../db.js'; 

export const Pisos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Piso');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener pisos' });
  }
};


export const crearPiso = async (req, res) => {
  const { piso } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Piso (piso) VALUES (?)',
      [piso]
    );
    res.status(201).json({ message: 'Piso creado', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el piso' });
  }
};

export const eliminarPiso = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Piso WHERE id_piso = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Piso no encontrado' });
    }
    res.json({ message: 'Piso eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el piso' });
  }
};
