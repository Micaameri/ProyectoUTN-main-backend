import pool from '../db.js'; 

export const Sectores = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Sector');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener sectores' });
  }
};

export const crearSector = async (req, res) => {
  const { sector } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Sector (sector) VALUES (?)',
      [sector]
    );
    res.status(201).json({ message: 'Sector creado', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el sector' });
  }
};

export const eliminarSector = async (req, res) => {
  const { id_sector } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM Sector WHERE id_sector = ?', [id_sector]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Sector no encontrado' });
    }
    res.json({ message: 'Sector eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el sector' });
    console.log('ID del edificio a eliminar:', id_sector);
  }
};
