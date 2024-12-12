import pool from '../db.js';

export const Activos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Activo');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener activos' });
  }
};

export const crearActivo = async (req, res) => {
  try {
    const { tipo, tag_diminutivo } = req.body;

    if (!tipo || !tag_diminutivo) {
      console.log('Faltan campos requeridos');
      return res.status(400).json({ error: 'Los campos tipo y tag_diminutivo son obligatorios' });
    }

    console.log('Datos recibidos para crear activo:', { tipo, tag_diminutivo });

    const [result] = await pool.query(
      'INSERT INTO Activo (tipo, tag_diminutivo) VALUES (?, ?)',
      [tipo, tag_diminutivo|| null]
    );

    console.log('Resultado de la inserción:', result); 
    return res.status(201).json({ message: 'Activo creado', id: result.insertId });
  } catch (error) {
    console.error('Error al crear el activo:', error);
    return res.status(500).json({ error: 'Error al crear el activo', details: error.message });
  }
};


export const eliminarActivo = async (req, res) => {
  const { id } = req.params;
  try {

    await pool.query('DELETE FROM activo_tarea WHERE id_activo = ?', [id]);

    const [result] = await pool.query('DELETE FROM Activo WHERE id_activo = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Activo no encontrado' });
    }
    res.json({ message: 'Activo eliminado' });
  } catch (error) {
    console.error('Error al eliminar el activo:', error);
    res.status(500).json({ error: 'Error al eliminar el activo', details: error.message });
  }
};

