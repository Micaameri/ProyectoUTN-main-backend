import { Router } from 'express';
import { Activos, eliminarActivo, crearActivo } from '../controllers/activoController.js';

const router = Router();

router.get('/activos', Activos);                  
router.delete('/activos/:id', eliminarActivo); 
router.post('/activos', crearActivo);         
export default router;
