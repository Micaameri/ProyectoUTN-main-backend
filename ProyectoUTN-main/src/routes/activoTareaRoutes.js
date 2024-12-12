import { Router } from 'express';
import { ActivoTareas, crearTareaYRelacion } from '../controllers/activoTareaController.js';

const router = Router();
router.get('/activoTareas/:id_activo/:tipo_tarea', ActivoTareas);
router.get('/activoTareas/:id_activo', ActivoTareas);
router.post('/activoTarea/crear-tarea-relacion', crearTareaYRelacion);


export default router;

