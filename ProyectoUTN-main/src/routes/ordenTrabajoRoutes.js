import express from 'express';
import {
  crearOrdenTrabajo,
  eliminarOrdenTrabajo,
  obtenerOrdenesTrabajoDetalladas,
  obtenerOrdenesPendientes,
finalizarOrdenTrabajo,
  obtenerOrdenesTrabajoFiltradas
} from '../controllers/ordenTrabajoController.js';

const router = express.Router();



router.post('/orden-trabajo', crearOrdenTrabajo); 
router.delete('/orden-trabajo/:orden_trabajo_id', eliminarOrdenTrabajo); 
router.get('/orden-trabajo-detallada', obtenerOrdenesTrabajoDetalladas);
router.get('/ordenes-pendientes/:id_usuario', obtenerOrdenesPendientes);
 router.put('/finalizar-orden/:id_orden', finalizarOrdenTrabajo);
router.get('/orden-trabajo-filtrada', obtenerOrdenesTrabajoFiltradas);
export default router;
