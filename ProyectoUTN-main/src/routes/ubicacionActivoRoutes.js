import { Router } from 'express';
import { UbicacionesActivos, eliminarUbicacionActivo, crearUbicacionActivo } from '../controllers/ubicacionActivoController.js';

const router = Router();

router.get('/lista-ubi-activos', UbicacionesActivos);
router.delete('/ubi-activo/:id', eliminarUbicacionActivo);
router.post('/ubi-activo', crearUbicacionActivo);


export default router;
