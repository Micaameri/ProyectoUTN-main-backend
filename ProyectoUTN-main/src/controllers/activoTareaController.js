import pool from '../db.js';

export const ActivoTareas = async (req, res) => {
  const { id_activo } = req.params;
  const { tipo_tarea } = req.query;

  if (!id_activo || !tipo_tarea) {
    return res.status(400).json({ error: 'id_activo y tipo_tarea son requeridos.' });
  }

  try {
    const query = `
      SELECT tarea.id_tarea, activo.tag_diminutivo, tarea.tarea, tarea.tipo_tarea
FROM activo
JOIN activo_tarea ON activo.id_activo = activo_tarea.id_activo
JOIN tarea ON tarea.id_tarea = activo_tarea.id_tarea
WHERE activo.id_activo = ? AND tarea.tipo_tarea = ?

    `;
    const [rows] = await pool.query(query, [id_activo, tipo_tarea]);
    console.log('Tareas obtenidas:', rows);
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener tareas:', err);
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
};


export const crearTareaYRelacion = async (req, res) => {
  const { id_activo, tarea, tipo_tarea } = req.body;

  if (!id_activo || !tarea || !tipo_tarea) {
    return res.status(400).json({ error: 'Faltan datos para crear la tarea.' });
  }

  try {
    
    const [resultadoTarea] = await pool.query(
      `INSERT INTO tarea (tarea, tipo_tarea) VALUES (?, ?)`,
      [tarea, tipo_tarea]
    );

    if (resultadoTarea.affectedRows === 0) {
      return res.status(500).json({ error: 'No se pudo crear la tarea.' });
    }

    const idTarea = resultadoTarea.insertId;

  
    const [resultadoRelacion] = await pool.query(
      `INSERT INTO activo_tarea (id_activo, id_tarea) VALUES (?, ?)`,
      [id_activo, idTarea]
    );

    if (resultadoRelacion.affectedRows === 0) {
      return res.status(500).json({ error: 'No se pudo crear la relación activo-tarea.' });
    }

    res.status(201).json({
      message: 'Tarea y relación activo-tarea creadas.',
      id_tarea: idTarea,
      id_activo_tarea: resultadoRelacion.insertId,
    });
  } catch (error) {
    console.error('Error al crear la tarea o la relación activo-tarea:', error);
    res.status(500).json({ error: 'Error al crear la tarea o la relación activo-tarea.' });
  }
};
