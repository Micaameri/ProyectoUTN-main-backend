import pool from '../db.js'; 

export const Edificios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Edificio');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener edificios' });
  }
};

export const crearEdificio = async (req, res) => {
  const { nombre, direccion } = req.body; 
  try {
    const [result] = await pool.query(
      'INSERT INTO Edificio (nombre, direccion) VALUES (?, ?)',
      [nombre, direccion]
    );
    res.status(201).json({ message: 'Edificio creado', id: result.insertId });
  } catch (error) {
    console.error('Error al crear el edificio:', error);
    res.status(500).json({ error: 'Error al crear el edificio' });


  }
};




export const eliminarEdificio = async (req, res) => {
   
    const { id } = req.params;
  
    try {
      const [result] = await pool.query(`DELETE FROM edificio WHERE id_edificio = ?`, [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Edificio no encontrado' });
      }
      res.json({ message: 'Edificio eliminado' });
    } catch (error) {
      console.error('Error al eliminar el edificio:', error);
      res.status(500).json({ error: 'Error al eliminar el edificio' });
      
      console.log('ID del edificio a eliminar:', id);
    }
  
  
};






