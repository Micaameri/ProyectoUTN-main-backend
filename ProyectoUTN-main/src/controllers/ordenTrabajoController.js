import pool from '../db.js';

export const  crearOrdenTrabajo = async(req, res) =>{
  const { operario, edificio, piso, sector, ubicacion, id_activo_tarea, codigo_unico, observaciones, estado, fecha } = req.body;

    if (!id_activo_tarea) {
        return res.status(400).json({ error: 'La relación activo-tarea no existe.' });
    }
  

  try {
      const [result] = await pool.query(`
          INSERT INTO orden_trabajo (id_usuario, id_edificio, id_piso, id_sector, id_ubicacion_activo, id_activo_tarea, codigo_unico,observaciones,estado,fecha)
          VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?)`,
          [operario, edificio, piso, sector, ubicacion, id_activo_tarea, codigo_unico,observaciones,estado,fecha]
      );

      console.log('Resultado de la inserción en la base de datos:', result);
      res.json({ message: 'Orden de trabajo creada', id: result.insertId });
  } catch (error) {
      console.error('Error al crear la orden de trabajo:', error);
      res.status(500).json({ error: 'Error al crear la orden de trabajo' });
  }

}

export const eliminarOrdenTrabajo = async (req, res) => {
  const {orden_trabajo_id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM orden_trabajo WHERE id_orden_trabajo = ?', [orden_trabajo_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Orden de trabajo no encontrada' });
    }

    res.json({ message: 'Orden de trabajo eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la orden de trabajo' });
  }
};



export const obtenerOrdenesTrabajoDetalladas = async (req, res) => {
  
  try {
    let query = `
      SELECT 
        ot.id_orden_trabajo AS orden_trabajo_id, 
        ot.codigo_unico,
        ot.fecha,
        ot.estado,
        ot.observaciones,
        ot.tiempo_empleado,
        at.id_activo_tarea AS activo_tarea_id,
        a.tipo AS activo_tipo,
        a.tag_diminutivo AS activo_tag,
        t.tarea AS tarea_descripcion,
        t.tipo_tarea,
        e.nombre AS edificio_nombre,
        p.piso AS piso_nombre,
       u.nombre AS usuario_nombre,
        s.sector AS sector_nombre,
        ua.ubicacion AS ubicacion_nombre
       
      FROM 
        orden_trabajo ot
      JOIN 
        activo_tarea at ON ot.id_activo_tarea = at.id_activo_tarea
      JOIN 
        activo a ON at.id_activo = a.id_activo
      JOIN 
        tarea t ON at.id_tarea = t.id_tarea
      JOIN 
        edificio e ON ot.id_edificio = e.id_edificio
      JOIN 
        piso p ON ot.id_piso = p.id_piso
      JOIN
        usuario u ON ot.id_usuario = u.id_usuario
      JOIN 
        sector s ON ot.id_sector = s.id_sector
      JOIN 
        ubicacion_activo ua ON ot.id_ubicacion_activo = ua.id_ubicacion_activo
  `;

 
      const [rows] = await pool.query(query); 
      res.json(rows);

    
  } catch (error) {
    console.error('Error al obtener las órdenes de trabajo:', error);
    res.status(500).json({ error: 'Error al obtener las órdenes de trabajo detalladas' });
  }
};
export const obtenerOrdenesPendientes=async(req, res) => {
  const { id_usuario } = req.params;
  try {
    const [rows] = await pool.query(
      `
      SELECT ot.id_orden_trabajo AS orden_trabajo_id,
             ot.codigo_unico,
             ot.fecha,
             ot.estado,
             ot.observaciones,
             e.nombre AS edificio_nombre,
             p.piso AS piso_nombre,
             s.sector AS sector_nombre,
             ua.ubicacion AS ubicacion_nombre,
             a.tipo AS activo_tipo,
             a.tag_diminutivo AS activo_tag,
             t.tarea AS tarea_descripcion
      FROM orden_trabajo ot
      JOIN activo_tarea at ON ot.id_activo_tarea = at.id_activo_tarea
      JOIN activo a ON at.id_activo = a.id_activo
      JOIN tarea t ON at.id_tarea = t.id_tarea
      JOIN edificio e ON ot.id_edificio = e.id_edificio
      JOIN piso p ON ot.id_piso = p.id_piso
      JOIN sector s ON ot.id_sector = s.id_sector
      JOIN ubicacion_activo ua ON ot.id_ubicacion_activo = ua.id_ubicacion_activo
      WHERE ot.id_usuario = ? AND ot.estado =  1
      `,
      [id_usuario]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener órdenes pendientes:', error);
    res.status(500).json({ error: 'Error al obtener órdenes pendientes' });
  }
}

export const finalizarOrdenTrabajo = async (req, res) => {
  const { id_orden } = req.params;
  const { tiempoEmpleado } = req.body;
  try {
    await pool.query(
      'UPDATE orden_trabajo SET estado = 0, tiempo_empleado = ? WHERE id_orden_trabajo = ?',
      [tiempoEmpleado, id_orden]
    );
    res.json({ message: 'Orden finalizada con éxito' });
  } catch (error) {
    console.error('Error al finalizar la orden:', error);
    res.status(500).json({ error: 'Error al finalizar la orden' });
  }
}

export const obtenerOrdenesTrabajoFiltradas = async (req, res) => {
  const { activo, operario, fecha, estado } = req.query;

  let query = `
     SELECT 
        ot.id_orden_trabajo AS orden_trabajo_id, 
        ot.codigo_unico,
        ot.fecha,
        ot.estado,
        ot.observaciones,
        ot.tiempo_empleado,
        e.nombre AS edificio_nombre,
        p.piso AS piso_nombre,
        s.sector AS sector_nombre,
        ua.ubicacion AS ubicacion_nombre,
        a.tipo AS activo_tipo,
        a.tag_diminutivo AS activo_tag,
        t.tarea AS tarea_descripcion,
        t.tipo_tarea,
        u.nombre AS usuario_nombre
      FROM 
        orden_trabajo ot
      JOIN 
        activo_tarea at ON ot.id_activo_tarea = at.id_activo_tarea
      JOIN 
        activo a ON at.id_activo = a.id_activo
      JOIN 
        tarea t ON at.id_tarea = t.id_tarea
      JOIN 
        edificio e ON ot.id_edificio = e.id_edificio
      JOIN 
        piso p ON ot.id_piso = p.id_piso
      JOIN 
        sector s ON ot.id_sector = s.id_sector
      JOIN 
        ubicacion_activo ua ON ot.id_ubicacion_activo = ua.id_ubicacion_activo
      JOIN 
        usuario u ON ot.id_usuario = u.id_usuario 
    WHERE
     1=1
  `;

  if (activo) {
    query += ` AND at.id_activo IN (${activo.split(',').map(a => `'${a}'`).join(',')})`;
  }
  if (operario) {
    query += ` AND ot.id_usuario IN (${operario.split(',').map(o => `'${o}'`).join(',')})`;
  }
  if (fecha) {
    query += ` AND DATE(fecha) = ${pool.escape(fecha)}`;
  }
  if (estado) {
    query += ` AND estado = ${estado === 'pendiente' ? 1 : 0}`;
  }

  try {
    const [ordenes] = await pool.query(query);
    res.json(ordenes);
  } catch (error) {
    console.error('Error al filtrar órdenes de trabajo:', error);
    res.status(500).json({ error: 'Error al filtrar órdenes de trabajo' });
  }
};



