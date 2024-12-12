import express from 'express';
import { Pisos, eliminarPiso, crearPiso} from '../controllers/pisoController.js'; 

const router = express.Router();

router.get('/lista-pisos', Pisos); 
router.delete('/piso/:id', eliminarPiso);
router.post('/piso', crearPiso);
 

export default router; 
