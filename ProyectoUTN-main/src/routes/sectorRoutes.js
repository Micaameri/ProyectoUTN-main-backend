import express from 'express';
import { Sectores, eliminarSector, crearSector} from '../controllers/sectorController.js'; 

const router = express.Router();

router.get('/sectores', Sectores); 
router.delete('/sectores/:id_sector', eliminarSector);
router.post('/sectores', crearSector);


export default router; 
